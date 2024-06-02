"use client";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

interface AmpereProps {
  idEws: string;
}

function Ampere({ idEws }: AmpereProps) {
  const [state, setState] = useState({
    series: [
      {
        name: "Ampere",
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
        text: "Ampere",
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
      .get(`https://bms.d2l.my.id/api/iot/conditions`)
      .then((response) => {
        const data = response.data.data;
        const ampereData: number[] = [];
        const categories: string[] = []; // Untuk menyimpan timestamp atau kategori lainnya

        data.forEach((item: any) => {
          if (item.id === idEws && item._field === "ampere") {
            ampereData.push(item._value);
            categories.push(item._time); // Misalnya jika ada timestamp di data
          }
        });

        setState((prevState) => ({
          ...prevState,
          series: [{ name: "Ampere", data: ampereData }],
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

export default Ampere;
