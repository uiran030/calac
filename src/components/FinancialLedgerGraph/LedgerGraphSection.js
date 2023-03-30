import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LedgerMonthlyGraph from './LedgerMonthlyGraph';
import LedgerGraphChart from './LedgerGraphChart';
import LedgerYearlyGraph from './LedgerYearlyGraph';

const LedgerGraphSection = () => {
  return (
    <LedgerGraphWrap>
      {/* <LedgerGraphChart/> */}
      <LedgerMonthlyGraph/>
      {/* <LedgerYearlyGraph/> */}
    </LedgerGraphWrap>
  );
};
//style=================================================
const LedgerGraphWrap = styled(Box)({
  display:'flex',
  width:'100%',
  border:'1px solid black',
  justifyContent:'space-between'
})
//======================================================
export default LedgerGraphSection;