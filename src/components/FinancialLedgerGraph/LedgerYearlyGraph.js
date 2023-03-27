import React, { useState, useEffect } from 'react';
import { Box, Button,ButtonGroup,ToggleButtonGroup,ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import axios from 'axios';

const LedgerGraphChart = () => {
  const [tabValue, setTabValue] = useState('monthly');
  const [monthlyData, setMonthlyData] = useState([]);
  console.log('tabValue', tabValue);
  //======================================================
  const handleTabValue = (event, value) => { 
    if (value !== null ) { setTabValue(value); }
  };
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/ledger')
    .then((res) => {
      console.log(res.data)
      setMonthlyData(res.data[1]);
    })
  }, []);
  console.log('monthlyData', monthlyData);
  //======================================================
  // let categoryDataList = {};
  // monthlyData.map(data =>{
  //   const category = data.ledger_category;
  //   const date = data.current_month;
  //   const sum = data.monthly_sum_count;
    
  //   if (categoryDataList[category] == null) {
  //     const categoryData = {
  //       name : category,
  //       data : []
  //     };
  //     categoryData.data.push({
  //       date : date,
  //       sum : sum
  //     });
  //     categoryDataList[category] = categoryData;
  //   } else {
  //     categoryDataList[category].data.push({
  //       date : date,
  //       sum : sum
  //     })
  //   }
  // });
  // console.log('categoryDataList', categoryDataList);
  //======================================================
  const yearlyState = {
    series : [
      {
        name : '식비',
        data : [2536800, 2840900]
      },
      {
        name : '통신비',
        data : [468000, 78000]
      },
      {
        name : '쇼핑',
        data : [1289200, 346000]
      },
      {
        name : '보험비',
        data : [2565600, 427600]
      },
      {
        name : '병원/약국',
        data : [90000, 13500]
      },
      {
        name : '간식비',
        data : [540000, 80000]
      },
      {
        name : '반료묘/견',
        data : [236500, 12300]
      }
    ],
    options: {  
      chart: {
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '년도별 지출 정산',
        align: 'left',
        style:{
          color:'red'           //컬러변경가능
          //fontSize, fontWeight도 되는데 적용안됨 (공식 홈페이지에서도 이렇게 적용)
        }
      },
      grid: {
        row: {
          colors: ['#f3f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['2022년', '2023년'],
      }
    }
  };
  //======================================================
  return (
    <ChartWrap>
      <ChartBox>
          <ApexCharts
            options={yearlyState.options}
            series={yearlyState.series}
            typs='line'
            width={'100%'}
            height={'80%'}
          />
      </ChartBox>
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position:'relative',
  width:'40%',
  height:'400px',
  border:'1px solid red'
});
const ChartBox = styled(Box)({
  width: '90%', 
  height: '90%', 
  margin: '0 auto',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center'
});
//======================================================
export default LedgerGraphChart;