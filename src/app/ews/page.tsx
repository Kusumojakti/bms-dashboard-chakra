"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import {
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

import Navbar from "../navbar/page";

interface EWS {
  id: string;
  nama_ews: string;
  alamat: string;
  lat: number;
  long: number;
}

function TableUsers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [data, setData] = useState<EWS[]>([]);
  const [selectedLocationData, setSelectedLocationData] = useState<EWS | null>(
    null
  );

  const getDataEWS = async () => {
    try {
      const response = await axios.get("https://bms.d2l.my.id/api/ews");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataEWS();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={16}>
        <Heading
          fontFamily={"Nunito"}
          fontWeight={"800"}
          mb={"30px"}
          mt={"40px"}
        >
          Table Early Warning System
        </Heading>
        {/* table content */}
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID EWS</Th>
                <Th>Nama</Th>
                <Th>Alamat</Th>
                <Th>Lat</Th>
                <Th>Long</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((location, index) => (
                <Tr key={index}>
                  <Td>{location.id}</Td>
                  <Td>{location.nama_ews}</Td>
                  <Td>{location.alamat}</Td>
                  <Td>{location.lat}</Td>
                  <Td>{location.long}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Text>Edit</Text>
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={onOpen}>
                          Update EWS
                          {/* <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpen}
                            onClose={onClose}
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Create new account</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                                <FormControl>
                                  <FormLabel>User ID</FormLabel>
                                  <Input
                                    ref={initialRef}
                                    placeholder="User ID"
                                  />
                                </FormControl>

                                <FormControl mt={4}>
                                  <FormLabel>Nama</FormLabel>
                                  <Input placeholder="Nama" />
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel>Email</FormLabel>
                                  <Input placeholder="Email" />
                                </FormControl>
                                <FormControl mt={4}>
                                  <FormLabel>Password</FormLabel>
                                  <Input placeholder="Password" />
                                </FormControl>
                              </ModalBody>

                              <ModalFooter>
                                <Button colorScheme="blue" mr={3}>
                                  Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal> */}
                        </MenuItem>
                        <MenuItem>Delete EWS</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default TableUsers;
