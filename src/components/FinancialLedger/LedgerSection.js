import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"; 
import TopStateBar from '../common/TopStateBar';
import LedgerDonut from './LedgerDonut';
import LedgerTotal from './LedgerTotal';

const FinancialLedger = () => {
  return (
    <LedgerWrap>
      <TopStateBar />
      <LedgerFlex>
        <LedgerDonut/>
        <LedgerTotal/>
      </LedgerFlex>
    </LedgerWrap>
  );
};
//style=================================================
const LedgerWrap = styled(Box)({
  height:'100vh',
  position:'relative'
});
const LedgerFlex = styled(Box)({
  display:'flex',
  height:'calc(100% - 110px)',
  position:'relative'
});
//======================================================
export default FinancialLedger;