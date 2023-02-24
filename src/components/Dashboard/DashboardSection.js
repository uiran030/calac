import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider } from "@mui/material";
import DashboardChart from "./DashboardChart";
import DashboardCalendar from "./DashboardCalendar";
import DashboardUpper from "./DashboardUpper";
import DashboardMonthGoal from "./DashboardMonthGoal";

const DashboardSection = () => {
  return (
    <SectionWrap container>
      <UpBox>
        <Grid item xs={12}>
          <DashboardUpper />
          <Divider />
          <DashboardChart />
        </Grid>
      </UpBox>
      <FlexBox>
        <Grid item xs={6.5}>
          <DashboardCalendar />
        </Grid>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Grid item xs={5.5}>
          <DashboardMonthGoal />
        </Grid>
      </FlexBox>
    </SectionWrap>
  );
};
//style=================================================
const SectionWrap = styled(Grid)({
  height:'100vh',
  width:'100%',
  display:'flex',
  justifyContent:'center'
});
const UpBox = styled(Box)({
  display:'flex',
  height:'55%',
  width:'100%',
  borderBottom:'1px solid #ddd',
  padding:'0 20px'
});
const FlexBox = styled(Box)({
  display:'flex',
  width:'100%',
  height:'45%',
  alignItems:'center'
});
//======================================================
export default DashboardSection;
