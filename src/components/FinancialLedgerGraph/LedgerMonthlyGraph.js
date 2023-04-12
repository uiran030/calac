import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const LedgerGraphChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/ledger/monthly/data')
    .then((res) => {
      setMonthlyData(res.data);
    })
  }, []);
  //======================================================
  const result = monthlyData.reduce((a, b) => {
    const categoryIndex = a.findIndex(item => item.name === b.ledger_category);
    if (categoryIndex === -1) {
      a.push({name: b.ledger_category, data: [b.monthly_sum_count]});
    } else {
      a[categoryIndex].data.push(b.monthly_sum_count);
    }
    return a;
  }, []);
  //======================================================
  let today = new Date();
  let year = today.getFullYear();
  //======================================================
  const monthlyState = {
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
        text: `${year}년도 월별 정산`,
        align: 'left',
        style:{
          color:'black'           //컬러변경가능
          //fontSize, fontWeight도 되는데 적용안됨 (공식 홈페이지에서도 이렇게 적용)
        }
      },
      grid: {
        row: {
          colors: ['#f3f3f3f3', 'transparent'],
          opacity: 0.3
        },
      },
      xaxis: {
        categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      }
    }
  };
  //======================================================
  return (
    <ChartWrap>
      <ApexCharts
        options={monthlyState.options}
        series={result}
        typs='line'
        width={'100%'}
        height={'100%'}
      />
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  width:'100%',
  border:'1px solid #ddd',
  padding:'10px',
  height:'450px'
});
//======================================================
export default LedgerGraphChart;