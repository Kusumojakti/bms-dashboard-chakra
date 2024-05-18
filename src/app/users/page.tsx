"use client";

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
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
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

import { useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";

import Navbar from "../navbar/page";

function tableUsers() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <Navbar />;
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={16}>
        <Heading fontFamily={"Nunito"} fontWeight={"800"} mb={"30px"}>
          Table Users
        </Heading>
        {/* modal */}
        <Flex justifyContent="flex-end">
          <Button onClick={onOpen}>Tambah User</Button>
        </Flex>

        <Modal
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
                <Input ref={initialRef} placeholder="User ID" />
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
        </Modal>
        {/* table content */}
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID User</Th>
                <Th>Nama</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>PUI001</Td>
                <Td>Admin</Td>
                <Td>Admin </Td>
                <Td>
                  {" "}
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Text>Edit</Text>
                      {/* <Avatar
                        size={"sm"}
                        src={
                          "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1714799444~exp=1714803044~hmac=acbcfdc447bf9d55fe1f485c876f6976d1c4e81fcff0863b4d43cc3d27309677&w=740"
                        }
                      /> */}
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Update Profile</MenuItem>
                      <MenuItem>Delete Profile</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default tableUsers;
