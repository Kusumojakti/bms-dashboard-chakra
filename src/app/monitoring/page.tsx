"use client";

import React from "react";
import { Container, Text, SimpleGrid, Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import { Spinner } from "@chakra-ui/react";

import Navbar from "../navbar/page";
import dynamic from "next/dynamic";

function Monitoring() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/maps/page"), {
        loading: () => <Spinner mt={"100px"} ms={"100vh"} />,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <Navbar />

      <Map />
    </>
  );
}
export default Monitoring;
