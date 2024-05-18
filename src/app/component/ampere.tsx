"use client";

import React from "react";
import { Container, Text, SimpleGrid } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

import Navbar from "../navbar/page";

function Ampere() {
  const [state, setState] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#F44336", "#E91E63", "#9C27B0"],
        },
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Ampere",
        align: "left",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "white"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
        fill: {
          colors: ["#F44336", "#E91E63", "#9C27B0"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
}
export default Ampere;
