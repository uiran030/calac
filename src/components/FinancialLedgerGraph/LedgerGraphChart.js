import React, { useState } from 'react';
import { Box, Button,ButtonGroup,ToggleButtonGroup,ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const LedgerGraphChart = () => {

  const [tabValue, setTabValue] = useState('monthly');
  console.log('tabValue', tabValue);

  const handleTabValue = (event, value) => { 
    if (value !== null ) { setTabValue(value); }
  };
  
  const monthlyState = {
    series : [
      {
        name : '식비',
        data : [234600,98400,40000,50000,78000,100500,30000,230000,98000,23040,50450,324543]
      },
      {
        name : '통신비',
        data : [39900,39900,39900,39900,39900,39900,39900,39900,39900,39900,39900,39900]
      },
      {
        name : '쇼핑',
        data : [123000, 280000, 950000, 40000, 50000, 340800, 29000, 40000, 302800, 9000, 29800, 590000]
      },
      {
        name : '보험비',
        data : [213800,213800,213800,213800,213800,213800,213800,213800,213800,213800,213800,213800]
      },
      {
        name : '병원/약국',
        data : [4500, 5900, 0, 7400, 20000, 28000, 0, 4300, 25000, 8000, 93800, 0]
      },
      {
        name : '간식비',
        data : [45000,45000,45000,45000,45000,45000,45000,45000,45000,45000,45000,45000]
      },
      {
        name : '반료묘/견',
        data : [49500, 0, 79000, 0, 35000, 0, 238800, 0, 310000, 5000, 55000, 0]
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
        text: '월별 지출 정산',
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
        categories: ['1월', '2월', '3일', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      }
    }
  };
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
        text: '월별 지출 정산',
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

  return (
    <ChartWrap>
      <ToggleButtonGroup
        value={tabValue}
        exclusive
        onChange={handleTabValue}
        aria-label="text alignment"
        sx={{width:'100%'}}
      >
        <ToggleButton value="monthly" aria-label="left aligned" sx={{width:'50%'}}>
          월별
        </ToggleButton>
        <ToggleButton value="yearly" aria-label="centered" sx={{width:'50%'}}>
          년도별
        </ToggleButton>
      </ToggleButtonGroup>
      <ChartBox>
        {tabValue === 'monthly' ? (
          <ApexCharts
            options={monthlyState.options}
            series={monthlyState.series}
            typs='line'
            width={'100%'}
            height={'80%'}
          />
        ) : (
          <ApexCharts
            options={yearlyState.options}
            series={yearlyState.series}
            typs='line'
            width={'100%'}
            height={'80%'}
          />
        )}
      </ChartBox>
      <Link to='/financialledger'>
        <NextBtn variant="text">
          <KeyboardArrowLeftIcon/>이전 페이지
        </NextBtn>
      </Link>
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position:'relative',
  width:'100%',
  height:'calc(100% - 110px)'
});
const ChartChoice = styled(ButtonGroup)({
  paddingTop:'10px',
  paddingLeft : '10px'
});
const ChartBox = styled(Box)({
  width: '90%', 
  height: '90%', 
  margin: '0 auto',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center'
});
const NextBtn = styled(Button)({
  color:'#07553B',
  position:'absolute',
  bottom:'5%',
  left:'5%',
  fontSize:'20px'
});
//======================================================
export default LedgerGraphChart;