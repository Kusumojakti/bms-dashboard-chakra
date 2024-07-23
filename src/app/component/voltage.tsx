"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

interface VoltageProps {
  idEws: string;
}

function Voltage({ idEws }: VoltageProps) {
  const [state, setState] = useState({
    series: [
      {
        name: "Voltage",
        data: [] as number[],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line" as "line",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight" as "straight",
      },
      title: {
        text: "Voltage",
        align: "left" as "left",
      },
      xaxis: {
        categories: [] as string[],
      },
    },
  });

  useEffect(() => {
    axios
      .get(`https://bms.d2l.my.id/api/iot/conditions/${idEws}`)
      .then((response) => {
        const data = response.data.data;
        const voltageData: number[] = [];
        const categories: string[] = []; // Untuk menyimpan timestamp atau kategori lainnya

        data.forEach((item: any) => {
          if (item.id === idEws && item._field === "voltage") {
            voltageData.push(item._value);
            categories.push(item._time); // Misalnya jika ada timestamp di data
          }
        });

        setState((prevState) => ({
          ...prevState,
          series: [{ name: "Voltage", data: voltageData }],
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
        type="line"
        height={350}
      />
    </div>
  );
}

export default Voltage;
