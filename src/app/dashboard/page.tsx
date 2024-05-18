"use client";

import React from "react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  Heading,
  Image,
  Link,
  HStack,
  Stack,
  Container,
  Flex,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import Navbar from "../navbar/page";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Maps from "../maps/page";

function dashboard() {
  return (
    <div>
      <Navbar />
      <div>
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={16}>
          <Heading fontFamily={"Nunito"} fontWeight={"800"} mb={"30px"}>
            Overview
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
          >
            <Stack
              direction="column"
              spacing={6}
              justifyContent="center"
              alignItems="center"
            >
              <SimpleGrid spacing={4} columns={[1, 2]} flexWrap="wrap">
                <Card>
                  <CardHeader>
                    <Heading size="md"> Total User</Heading>
                  </CardHeader>
                  <CardBody>
                    <Flex>
                      <Image src="user.svg" width="100px" mb={"10px"} />

                      <Text ms={"50px"} fontSize={"48px"} fontWeight={"800"}>
                        10
                      </Text>
                    </Flex>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <Heading size="md"> Total Early Warning System</Heading>
                  </CardHeader>
                  <CardBody>
                    <Flex>
                      <Image src="alarm-system.svg" width="100px" mb={"10px"} />

                      <Text ms={"50px"} fontSize={"48px"} fontWeight={"800"}>
                        10
                      </Text>
                    </Flex>
                  </CardBody>
                </Card>
              </SimpleGrid>
              <HStack
                as={Link}
                p={1}
                rounded="full"
                fontSize="sm"
                w="max-content"
                // bg={useColorModeValue("gray.100", "gray.700")}
              ></HStack>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

export default dashboard;
