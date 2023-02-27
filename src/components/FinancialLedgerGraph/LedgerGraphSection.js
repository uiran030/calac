import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopBar from '../common/TopBar';
import LedgerGraphChart from './LedgerGraphChart';

const LedgerGraphSection = () => {
  return (
    <LedgerGraphWrap>
      <TopBar />
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