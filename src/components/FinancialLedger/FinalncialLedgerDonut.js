import React from 'react';
import { Box, Divider, TextField } from "@mui/material";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";

const FinalncialLedgerDonut = () => {
  const state = {
    series: [10, 20, 30, 20, 10, 5, 5],
    options:{
      chart:{
        type:'donut',
      },
      legend:{
        position:'right'
      },
      responsive:[{
        breakpoint:480
      }],
      plotOptions:{
        pie:{
          donut:{
            labels:{
              show : true,
              total:{
                showAlways : false,
                show: true,
                label:"가운데",
                fontSize:'12px',
                color:'red'
              },
              value:{
                fontSize:'22px',
                show:true,
                color:'blue',
              }
            }
          }
        }
      },
      labels: ['외식비', '교통비', '쇼핑', '애완동물', '보험','추가1','추가2'],
    }
  };

  return (
    <DountWrap className="donut">
      <DountGraph>
        <Test options={state.options} series={state.series} type="donut" width="600"/>
      </DountGraph>
    </DountWrap>
  );
};
//style=================================================
const DountWrap = styled(Box)({
  border:'3px solid yellow',
  display:'flex',
  height:'100vh',
  alignItems:'center',
  justifyContent:'center',
  width:'60%'
});
const DountGraph = styled(Box)({
  border:'1px solid yellow',
  width:'100%'
})
const Test = styled(Chart)({
  border:'1px solid blue',
  display:'flex',
  alignItems:'center'
})
//======================================================
export default FinalncialLedgerDonut;