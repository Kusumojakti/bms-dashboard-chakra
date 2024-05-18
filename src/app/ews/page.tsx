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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
  Text,
} from "@chakra-ui/react";

import Navbar from "../navbar/page";

function tableUsers() {
  return (
    <>
      <Navbar />;
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={16}>
        <Heading fontFamily={"Nunito"} fontWeight={"800"} mb={"30px"}>
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
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>EWS001</Td>
                <Td>EWS - Ambarukmo Plaza</Td>
                <Td>Jalan Jogja - Solo </Td>
                <Td>-7.8055542 </Td>
                <Td> 110.3979941 </Td>
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
                      <MenuItem>Update EWS</MenuItem>
                      <MenuItem>Delete EWS</MenuItem>
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
