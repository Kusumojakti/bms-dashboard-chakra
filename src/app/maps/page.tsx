"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDisclosure, Button, Text, Heading } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import useHistory from "react-router-dom";
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

interface Location {
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
      const response = await axios.get("http://localhost:5000/api/ews");
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
              center={[-7.8032485, 110.333645]}
              zoom={15}
              zoomControl={false}
              scrollWheelZoom={true}
              style={{ height: "100vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {data.map((location, index) => (
                <Marker
                  key={index}
                  position={[location.lat, location.long]}
                  // eventHandlers={{
                  //   click: () => handleOpenDrawer(index, location),
                  // }}
                >
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
                  <Temperature />
                  <Voltage />
                  <Ampere />
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
