import React from 'react';
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const FinalncialLedgerInfo = () => {
  return (
    <Box>
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
    </Box>
  );
};
//style=================================================
const AddInfoArea = styled(Box)({
  border:'1px solid pink',
  height:'100%',
});
const UpperText = styled(Box)({
  display:'flex',
  justifyContent:'space-around',
});
//======================================================
export default FinalncialLedgerInfo;