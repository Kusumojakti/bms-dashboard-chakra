"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

interface TempProps {
  idEws: string;
}

function Temperature({ idEws }: TempProps) {
  const [state, setState] = useState({
    series: [
      {
        name: "Temperature",
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
        text: "Temperature",
        align: "left" as "left",
      },
      xaxis: {
        categories: [] as string[],
      },
    },
  });

  useEffect(() => {
    // Fetch data dari API menggunakan axios
    axios
      .get(`https://bms.zegion.site/api/iot/conditions/${idEws}`)
      .then((response) => {
        console.log("API Response:", response.data);
        const data = response.data.data;
        const tempData: number[] = [];
        const categories: string[] = [];

        data.forEach((item: any) => {
          if (item.id === idEws && item._field === "temp") {
            tempData.push(item._value);
            categories.push(item._time); // Misalnya jika ada timestamp di data
          }
        });

        setState((prevState) => ({
          ...prevState,
          series: [{ name: "Temperature", data: tempData }],
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
  }, [idEws]);

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

export default Temperature;
