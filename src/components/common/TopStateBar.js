import React from 'react';
import { Box } from '@mui/material';
import { styled } from "@mui/material/styles";

const TopStateBar = () => {
  return (
    <TopStateBarWrap>
      <Box>
        <h4>이번달 지출 목표 금액</h4>
        <p>1,000,000원</p>
      </Box>
      <p>000님</p>
    </TopStateBarWrap>
  );
};
//style=================================================
const TopStateBarWrap = styled(Box)({
  height:'110px',
  borderBottom:'1px solid #ddd',
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  padding:'0 20px'
});
//======================================================
export default TopStateBar;