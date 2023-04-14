import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const LedgerWeeklyGraph = () => {
  //======================================================
  // const today = new Date();
  // console.log('ddd', today)
  // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  // console.log('fir', firstDayOfMonth)
  // // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // // console.log('weeeek1', firstDayOfMonth);
  // // console.log('weeeek2', lastDayOfMonth);
  // //======================================================
  
  // let todayYear = today.getFullYear();
  // let todayMonth = ("0" + ( today.getMonth() + 1 )).slice(-2);
  // let todayDay = ('0' + today.getDate()).slice(-2);
  // console.log('aaa', todayDay)
  // let todayDate = todayYear+'-'+todayMonth+'-'+todayDay;
  // console.log('ddd', todayDate)
  // //======================================================
  // const weeks = [];
  // let lastWeekDay = '';
  // let todayDayOfWeek = today.getDay();
  // if (todayDayOfWeek === 0) {
  // }
  // const test = new Date(today.getFullYear(), today.getMonth()+1, today.getDay()-7);
  // console.log('444', todayDayOfWeek)
  // console.log('mmmm', test)
  // let currentWeekStart = firstDayOfMonth;
  // let currentWeekEnd = new Date(currentWeekStart);
  // currentWeekEnd.setDate(currentWeekEnd.getDate() + (7 - firstDayOfMonth.getDay()) % 7);

  // while (currentWeekEnd.getMonth() === firstDayOfMonth.getMonth()) {
  //   weeks.push({start: currentWeekStart, end: currentWeekEnd});

  //   currentWeekStart = new Date(currentWeekEnd);
  //   currentWeekStart.setDate(currentWeekStart.getDate() + 1);

  //   currentWeekEnd = new Date(currentWeekStart);
  //   currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
  // }

  // console.log('weeeek3', weeks);
  // for (const week of weeks) {
  //   console.log(`${week.start.toLocaleDateString()} - ${week.end.toLocaleDateString()}`);
  // }
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