import React, {useState} from 'react';
import { Box, Button } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const FinalncialLedgerDonut = () => {
  return (
    <DountWrap className="donut">
      <DountGraph>
        <Test>이번달 지출 현황</Test>
        <Box style={{ width: '100%', height: '600px', margin: '0 auto' }}>
        {/* nivo로 만든 도넛차트 */}
          <ResponsivePie
            data={[
                { id: '식비', value: 234800 },
                { id: '통신비', value: 49000 },
                { id: '쇼핑', value: 346000 },
                { id: '보험비', value: 159800 },
                { id: '병원/약국', value: 6000 },
                { id: '간식비', value: 8500 },
                { id: '반료묘/견', value: 156200 },
                { id: '추가 카테고리', value: 123456 },
            ]}
            margin={{ top: 40, right: 80, bottom: 80, left: 0 }}
            innerRadius={0.65}
            padAngle={1}
            cornerRadius={3}
            sortByValue={true}             // 큰순서대로 정리
            activeOuterRadiusOffset={8}
            colors={{scheme : 'paired'}}
            borderWidth={1}  
            borderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  '0.3'
                ]
              ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsOffset={24}
            arcLinkLabelsDiagonalLength = {10}
            arcLinkLabelsStraightLength={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  '5'
                ]
              ]
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            // fill을 통해 표 안에 디자인 줄 수 있음.
            fill={[
              {
                match: {
                  id: '쇼핑'
                },
                id: 'dots'
              },
              {
                match: {
                  id: '반료묘/견'
                },
                id: 'dots'
              },
              {
                match: {
                  id: '통신비'
                },
                id: 'lines'
              }
            ]}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,        // 우측 리스트 목록 (화면 사이즈보고 조절하면 될 듯)
                translateY: 0,
                itemWidth: 100,
                itemHeight: 40,
                itemsSpacing: 10,
                symbolSize: 25,
                itemDirection: 'left-to-right',
              },
            ]}
          />
        </Box>
      </DountGraph>
      
      <Link to='/financialledger/graph'>
        <NextBtn variant="text">
          그래프 보기<KeyboardArrowRightIcon/>
        </NextBtn>
      </Link>
    </DountWrap>
  );
};
//style=================================================
const DountWrap = styled(Box)({
  display:'flex',
  alignItems:'center',
  width:'100%',
  position:'relative'
});
const Test = styled('p')({
  textAlign:'center',
  marginBottom:'70px'
})
const DountGraph = styled(Box)({
  width:'100%'
});
const NextBtn = styled(Button)({
  color:'#07553B',
  position:'absolute',
  bottom:'5%',
  right:'5%',
  fontSize:'20px'
});
//======================================================
export default FinalncialLedgerDonut;