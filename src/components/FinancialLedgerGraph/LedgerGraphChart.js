import React from 'react';
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const LedgerGraphChart = () => {
  
  const state = {
    series : [
      {
        name : '외식비',
        data : [234600,98400,40,50,78,100,300,200,90,2304,5045,324543]
      },
      {
        name : 'low',
        data : [1,2,3,4,34,65,30,120,100,300,200,90]
      },
      {
        name : 'test',
        data : [2,7,5,8,34,65,80,120,3,4,34,65]
      },
      {
        name : 'test2',
        data : [2,7,5,8,34,65,80,120,7,5,8,34]
      },
      {
        name : 'test3',
        data : [2,7,5,8,34,65,80,120,7,5,8,34]
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
  }

  return (
    <ChartWrap>
      <p>월별 / 년도별 초이스 버튼 만들 곳</p>
      <ChartBox>
        <ApexCharts
          options={state.options}
          series={state.series}
          typs='line'
          width={'100%'}
          height={'90%'}
        />
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
})
const ChartBox = styled(Box)({
  width: '90%', 
  height: '90%', 
  margin: '0 auto',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center'
})
const NextBtn = styled(Button)({
  color:'#07553B',
  position:'absolute',
  bottom:'5%',
  left:'5%',
  fontSize:'20px'
});
//======================================================
export default LedgerGraphChart;