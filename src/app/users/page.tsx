"use client";

import {
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
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
  useToast,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import Navbar from "../navbar/page";
import axios from "axios";

interface users {
  id: string;
  name: string;
  id_roles: string;
}

function tableUsers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookie] = useCookies(["token"]);
  const [editUser, setEditUser] = useState<users | null>(null);
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [data, setData] = useState<users[]>([]);
  const [selectedLocationData, setSelectedLocationData] =
    useState<users | null>(null);

  const getDataEWS = async () => {
    try {
      const response = await axios.get("https://bms.d2l.my.id/api/user", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [user_id, setUser_id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    getDataEWS();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post(
      "https://bms.d2l.my.id/api/auth/register",
      {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
      }
    );

    const data = response.data;
    if (data.success == false) {
      toast({
        title: data.message,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
      setLoading(false);
      return false;
    }

    toast({
      title: data.message,
      position: "bottom",
      status: "success",
      isClosable: true,
    });

    // redirect ke halaman home
    router.push("/users");
    setLoading(false);
  }

  async function handleDelete(id: string) {
    try {
      await axios.delete(`https://bms.d2l.my.id/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      // Update UI setelah penghapusan data
      setData(data.filter((user) => user.id !== id));

      toast({
        title: "User deleted successfully",
        position: "bottom",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete user",
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  }

  async function handleEdit(id: string) {
    const userToEdit = data.find((user) => user.id === id);
    if (userToEdit) {
      setEditUser(userToEdit);
      onEditModalOpen();
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `https://bms.d2l.my.id/api/user/${editUser?.id}`,
        {
          name: editUser?.name,
          id_roles: editUser?.id_roles,
          // tambahkan field lain yang perlu diupdate
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      const updatedUser = response.data;
      const updatedData = data.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setData(updatedData);

      toast({
        title: "User updated successfully",
        position: "bottom",
        status: "success",
        isClosable: true,
      });

      onEditModalClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update user",
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

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
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader>Create new account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={4}>
                  <FormLabel>Nama</FormLabel>
                  <Input
                    placeholder="Nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    placeholder="Confirm_Password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  isLoading={loading}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>

        {/* modal edit */}
        <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>User ID</FormLabel>
                <Input value={editUser?.id || ""} isReadOnly />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nama</FormLabel>
                <Input
                  value={editUser?.name || ""}
                  onChange={(e) =>
                    setEditUser((prevUser) =>
                      prevUser ? { ...prevUser, name: e.target.value } : null
                    )
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                <Input
                  value={editUser?.id_roles || ""}
                  onChange={(e) =>
                    setEditUser((prevUser) =>
                      prevUser
                        ? { ...prevUser, id_roles: e.target.value }
                        : null
                    )
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleUpdate}
                isLoading={loading}
              >
                Save
              </Button>
              <Button onClick={onEditModalClose}>Cancel</Button>
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
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((location, index) => (
                <Tr key={index}>
                  <Td>{location.id}</Td>
                  <Td>{location.name}</Td>
                  <Td>{location.id_roles}</Td>
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
                        <MenuItem onClick={() => handleEdit(location.id)}>
                          Update Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(location.id)}>
                          Delete Profile
                        </MenuItem>
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

export default tableUsers;
