import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopStateBar from '../common/TopStateBar';
import LedgerGraphChart from './LedgerGraphChart';

const LedgerGraphSection = () => {
  return (
    <LedgerGraphWrap>
      <TopStateBar />
      <LedgerGraphChart/>
    </LedgerGraphWrap>
  );
};
//style=================================================
const LedgerGraphWrap = styled(Box)({
  height:'100vh'
})
//======================================================
export default LedgerGraphSection;