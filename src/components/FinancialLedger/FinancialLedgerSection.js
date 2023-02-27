import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import FinalncialLedgerDonut from './FinalncialLedgerDonut';
import FinalncialLedgerInfo from './FinalncialLedgerInfo';

const FinancialLedger = () => {
  return (
    <FinalncialLedgerWrap>
      <FinalncialLedgerDonut/>
      <FinalncialLedgerInfo/>
    </FinalncialLedgerWrap>
  );
};
//style=================================================
const FinalncialLedgerWrap = styled(Box)({
  border:'3px solid black',
  display:'flex',
  height:'100vh',
  alignItems:'center',
});
//======================================================
export default FinancialLedger;