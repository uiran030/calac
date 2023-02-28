import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import Weather from '../Dashboard/Weather';

const TopStateBar = () => {
  const pathname = window.location.pathname;
  console.log('pathname', pathname);
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
            <h4>이번달 지출 목표 금액</h4>
            <p>1,000,000원 <GoalCount>(+258,020)</GoalCount></p>
          </Box>
          <Typography
              variant='body1'
              fontWeight={700}
              color='primary'
              textAlign='right'
            >
              로그인을<br/>
              진행해주세요
            </Typography>
        </CommonTopState>
      )}
    </TopStateBarWrap>
  );
};
//style=================================================
const TopStateBarWrap = styled(Box)({
  height:'110px',
  borderBottom:'1px solid #ddd',
  padding:'0 20px'
});
const CommonTopState = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center', 
  height:'100%'
})
const GoalCount = styled('span')({
  fontSize:'14px',
  color:'red'
})
//======================================================
export default TopStateBar;