import React from 'react';
import { Box, Divider, TextField } from "@mui/material";
import Chart from "react-apexcharts";
import { styled } from "@mui/material/styles";

const FinalncialLedgerDonut = () => {
  const state = {
    series: [10, 20, 30, 20, 10, 5, 5],
    // 카테고리의 값 추가
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
              show : true,                    // 가운데 제목,부제목 존재여부
              total:{
                showAlways : false,           //true면 마우스로 챠트에 올리면 가운데가 해당 카테고리 보여주고 false면 그냥 test로 고정 (내가 정한 값)
                show: true,                   //true면 가운데 제목, 부제목 존재
                //22번째줄과 다른 부분은 22번은 false 시 가운데 글이 아예 사라지고 total에서 show: false의 경우에는 마우스 오버에는 해당 카테고리 보임
                label:"가운데",
                fontSize:'12px',
                color:'red'
              },
              value:{
                fontSize:'22px',
                show:true,
                color:'blue',
                // 그래프등 총 합 수
              }
            }
          }
        }
      },
      labels: ['외식비', '교통비', '쇼핑', '애완동물', '보험','추가1','추가2'],
      // 카테고리 추가
      // title:{
      //   text:'title 입력하는곳',
      //   align:'left'
      // }
    }
  };

  return (
    <DountWrap className="donut">
      <DountGraph>
        <Chart options={state.options} series={state.series} type="donut" width="600"/>
      </DountGraph>
      <AddInfoArea>
        <UpperText>
          <h2>지출</h2>
          <h2>수입</h2>
        </UpperText>
        <Divider />
        <Box>
          <h2>전액</h2>
          <p>225,463원</p>
        </Box>
        <Divider />
        <Box>
          1.최근순 결제내역
          2.최근순 결제내역
          3.최근순 결제내역
        </Box>
      </AddInfoArea>
    </DountWrap>
  );
};
//style=================================================
const DountWrap = styled(Box)({
  border:'1px solid black',
  display:'flex',
  height:'100vh',
  alignItems:'center',
});
const DountGraph = styled(Box)({
  border:'1px solid yellow',
  width:'60%'
})
const AddInfoArea = styled(Box)({
  border:'1px solid pink',
  width:'40%',
  height:'100%'
})
const UpperText = styled(Box)({
  display:'flex',
  justifyContent:'space-around',
})
//======================================================
export default FinalncialLedgerDonut;