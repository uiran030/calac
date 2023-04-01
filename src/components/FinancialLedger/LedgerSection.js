import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"; 
import TopBar from '../common/TopBar';
import LedgerDonut from './LedgerDonut';
import LedgerTopThree from './LedgerTopThree';
import LedgerGraphSection from '../FinancialLedgerGraph/LedgerGraphSection';
import OpenModalBtn from '../common/OpenModalBtn';

const FinancialLedger = () => {
  return (
    <LedgerWrap>
      <TopBarWrap>
        <TopBar />
      </TopBarWrap>
      <LedgerWrapBox>
        <LedgerBox>
          <LedgerDonut/>
          <LedgerTopThree/>
        </LedgerBox>
        <LedgerBox>
          <LedgerGraphSection/>
        </LedgerBox>
      </LedgerWrapBox>
    <OpenModalBtn />
    </LedgerWrap>
  );
};
//style=================================================
const LedgerWrap = styled(Box)({
  position:'relative',
  width:'100%',
  height:'100vh',
});
const TopBarWrap = styled(Box)({
  width:'100%',
  height:'110px'
});
const LedgerWrapBox = styled(Box)({
  position:'relative',
  padding:'0 50px',
  height:'calc(100% - 110px)',
  overflowY:'scroll'
});
const LedgerBox = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  margin:'50px 0'
});
//======================================================
export default FinancialLedger;