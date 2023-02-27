import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider } from "@mui/material";
import DashboardChart from "./DashboardChart";
import DashboardCalendar from "./DashboardCalendar";
import DashboardMonthGoal from "./DashboardMonthGoal";
import TopStateBar from "../common/TopBar";

const DashboardSection = () => {
  return (
    <SectionWrap container>
      <Grid item xs={12}>
        <TopStateBar />
        <DashboardChart />
      </Grid>
      <FlexBox>
        <Grid item xs={6.5}>
          <DashboardCalendar />
        </Grid>
        <Divider orientation='vertical' flexItem />
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
const FlexBox = styled(Box)({
  display:'flex',
  width:'100%',
  height:'45%',
  alignItems:'center'
});
//======================================================
export default DashboardSection;
