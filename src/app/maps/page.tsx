"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDisclosure, Button, Text, Heading } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Temperature from "../component/temperaturechart";
import Voltage from "../component/voltage";
import Ampere from "../component/ampere";
import SOC from "../component/soc";
import SOH from "../component/soh";

interface Location {
  id: string;
  nama_ews: string;
  alamat: string;
  lat: number;
  long: number;
}

const Maps = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<
    number | null
  >(null);
  const [selectedLocationData, setSelectedLocationData] =
    useState<Location | null>(null);

  const getMaps = async () => {
    try {
      const response = await axios.get("https://bms.zegion.site/api/ews");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMaps();
  }, []);

  const handleOpenDrawer = (index: number, location: Location) => {
    setSelectedLocationIndex(index);
    setSelectedLocationData(location);
    onOpen();
  };

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="col">
            <MapContainer
              center={[-7.7889, 110.5012]}
              zoom={11}
              zoomControl={false}
              scrollWheelZoom={true}
              style={{ height: "100vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {data.map((location, index) => (
                <Marker key={index} position={[location.lat, location.long]}>
                  <Popup>
                    <Heading as="h4" size="md">
                      {location.nama_ews}
                    </Heading>
                    <br /> {location.alamat}
                    <br />
                    <br />
                    <Button
                      ref={btnRef}
                      colorScheme="teal"
                      onClick={() => handleOpenDrawer(index, location)}
                    >
                      Open
                    </Button>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontWeight={800}>Monitoring</DrawerHeader>

            <DrawerBody>
              {selectedLocationData ? (
                <>
                  <Heading as="h2" size="md" noOfLines={1} mb={"20px"}>
                    {selectedLocationData.nama_ews}
                  </Heading>
                  <Text mb={"30px"}>{selectedLocationData.alamat}</Text>
                  <SOC idEws={selectedLocationData.id} />
                  <SOH idEws={selectedLocationData.id} />
                  <Temperature idEws={selectedLocationData.id} />
                  <Voltage idEws={selectedLocationData.id} />
                  <Ampere idEws={selectedLocationData.id} />
                </>
              ) : (
                <Text>No location selected</Text>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default Maps;
