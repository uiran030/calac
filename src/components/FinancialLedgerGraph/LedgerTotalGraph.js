import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const LedgerTotalGraph = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/ledger')
    .then((res) => {
      // console.log(res.data)
      setMonthlyData(res.data[1]);
    })
  }, []);
  console.log('monthlyData', monthlyData);
  //======================================================
  let today = new Date();
  let year = today.getFullYear();
  //======================================================
  const state = {
    series: [76],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: '22px'
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
      },
      labels: ['Average Results'],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ApexCharts
        options={state.options}
        series={state.series}
        type="radialBar"
        heigh='100%'
      />
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position:'relative',
  width:'30%',
  border:'1px solid #ddd',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
});
//======================================================
export default LedgerTotalGraph;