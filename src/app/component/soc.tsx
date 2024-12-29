"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

interface SOCProps {
  idEws: string;
}

function SOC({ idEws }: SOCProps) {
  const [state, setState] = useState({
    series: [
      {
        name: "SOC",
        data: [] as number[],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area" as "area",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as "smooth",
      },
      title: {
        text: "SOC",
        align: "left" as "left",
      },
      xaxis: {
        categories: [] as string[],
      },
    },
  });

  useEffect(() => {
    axios
      .get(`https://bms.zegion.site/api/iot/conditions/${idEws}`)
      .then((response) => {
        const data = response.data.data;
        const socData: number[] = [];
        const categories: string[] = [];

        data.forEach((item: any) => {
          if (item.id === idEws && item._field === "soc") {
            socData.push(item._value);
            categories.push(item._time); // Misalnya jika ada timestamp di data
          }
        });

        setState((prevState) => ({
          ...prevState,
          series: [{ name: "SOC", data: socData }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
          },
        }));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [idEws]); // Menambahkan idEws sebagai dependency useEffect

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

export default SOC;