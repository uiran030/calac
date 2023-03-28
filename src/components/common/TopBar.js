import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import Weather from '../Dashboard/Weather';

const DashboardTopStateBar = () => {
  const pathname = window.location.pathname;
  console.log('pathname', pathname);
  //======================================================
  return (
    <TopStateBarWrap>
      { pathname === '/' && (
        <CommonTopState>
          <Weather />
          <Box>
            <Typography
              variant='body1'
              fontWeight={700}
              color='primary'
              textAlign='right'
            >
              로그인을<br/>
              진행해주세요
            </Typography>
          </Box>
        </CommonTopState>
      )}
      { pathname.includes('/financialledger') && (
        <CommonTopState>
          <Box>
            <Text>이번달 지출 목표 금액</Text>
            <Text>1,000,000원 <GoalCount>(+258,020)</GoalCount></Text>
          </Box>
        </CommonTopState>
      )}
    </TopStateBarWrap>
  );
};
//style=================================================
const TopStateBarWrap = styled(Box)({
  height:'110px',
  borderBottom:'1px solid #ddd',
  padding:'0 20px',
});
const CommonTopState = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center', 
  height:'100%',
})
const GoalCount = styled('span')({
  fontSize:'14px',
  color:'red'
})
const Text = styled('p')({
  fontSize:'16px'
})
//======================================================
export default DashboardTopStateBar;