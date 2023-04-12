import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const LedgerTotalGraph = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [noData, setNoData] = useState(false);
  //======================================================
  useEffect(() => {
    axios.get(`http://localhost:5000/ledger/monthly/total`)
    .then((res) => {
      console.log('total_res_data', res.data)
      res.data.length === 0 ? ( setNoData(true) ) : ( setNoData(false) )
      if ( res.data.length === 1 && res.data[0]['ledger_type'] === 'income' ) {
        setTotalIncome(res.data[0]['sum_count'])
      } else if (res.data.length === 1 && res.data[0]['ledger_type'] === 'expense') {
        setTotalExpense(res.data[0]['sum_count'])
      } else if (res.data.length === 2) {
        setTotalExpense(res.data[0]['sum_count'])
        setTotalIncome(res.data[1]['sum_count'])
      }
    })
  }, []);
  //======================================================  
  const minusPercent = Math.round((totalExpense/totalIncome)*100);
  //======================================================
  const state = {
    series: [minusPercent],
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
      colors:['#164ef5'],
      labels: [`이번달 수입 : ${totalIncome.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`],
    },
  };
  //======================================================
  const noState = {
    series: [0],
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
      colors:['#164ef5'],
      labels: [`이번달 수입 : 0`],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <ChartTopTextBox>
        <Typography>수입 대비 지출 금액</Typography>
      </ChartTopTextBox>
      {noData ? (
        <ApexCharts
          options={noState.options}
          series={noState.series}
          type="radialBar"
          height="300px"
          width="100%"
        />
      ) : (
        <ApexCharts
        options={state.options}
        series={state.series}
        type="radialBar"
        height="300px"
        width="100%"
        />
      )}
      
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position:'relative',
  width:'30%',
  border:'1px solid #ddd',
  borderRadius:'10px',
  position:'relative'
});
const ChartTopTextBox = styled(Box)({
  height:'50px',
  display:'flex', 
  alignItems:'center', 
  justifyContent:'center'
});
//======================================================
export default LedgerTotalGraph;