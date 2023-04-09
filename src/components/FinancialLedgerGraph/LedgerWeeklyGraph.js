import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const LedgerWeeklyGraph = () => {
  //======================================================
  //======================================================
  // useEffect(() => {
  //   axios.get(`http://localhost:5000/ledger/monthly/total`)
  //   .then((res) => {
  //     res.data[0][0] !== null ? (
  //       setTotalExpense(res.data[0][0]['sum_count'])
  //     ):(
  //       setTotalExpense(0)
  //     );
  //     res.data[0][1] !== null ? (
  //       setTotalIncome(res.data[0][1]['sum_count'])
  //     ) : (
  //       setTotalIncome(0)
  //     )
  //   })
  // }, []);
  //======================================================
  const state = {
    series: [40],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          }
        },
      },
      colors:['#cd2ff5'],
      labels: [`이번주 수입 :`],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ChartTopTextBox>
        <Typography>이번주에 제일 많은 지출</Typography>
      </ChartTopTextBox>  
      <ApexCharts
        options={state.options}
        series={state.series}
        type="radialBar"
        height="300px"
        width="100%"
      />
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position:'relative',
  width:'30%',
  border:'1px solid #ddd',
  position:'relative'
});
const ChartTopTextBox = styled(Box)({
  height:'50px',
  display:'flex', 
  alignItems:'center', 
  justifyContent:'center'
});
//======================================================
export default LedgerWeeklyGraph;