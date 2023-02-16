import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider, Typography, List, ListItem} from "@mui/material";
import DashboardChart from "./DashboardChart";
import DashboardCalendar from "./DashboardCalendar";
import DashboardUpper from "./DashboardUpper";
import DashboardTodoList from "./DashboardTodoList";

const DashboardSection = () => {
  return (
    <MyGird container>
      <Grid item xs={12}>
        <DashboardUpper />
        <MyDivider />
        <DashboardChart />
        <MyDivider />
      </Grid>
      <Grid item xs={6}>
        <Grid container>
        <Grid item xs={6}>
          <DashboardCalendar />
          </Grid>  
          <Grid item xs={6}>  
          <CalandarBox>
            <Typography color="primary" fontWeight={700}>2023.02.16</Typography>
            <List>
              <ListItem>05:00 수강신청</ListItem>
              <ListItem>12:00 점심 약속</ListItem>
              <ListItem>17:00 미용실 예약</ListItem>
              <ListItem>17:00 미용실 예약</ListItem>
              <ListItem>17:00 미용실 예약</ListItem>
              <ListItem>17:00 미용실 예약</ListItem>
              <ListItem>17:00 미용실 예약</ListItem>
            </List>
          </CalandarBox>
          </Grid>  
        </Grid>
      </Grid>
      <Divider orientation='vertical' variant='middle' flexItem />
        <Grid item xs={5.9}>
        <DashboardTodoList />
        </Grid>
    </MyGird>
  );
};
//style=================================================
const MyGird = styled(Grid)({
  padding: `20px`,
  height: `97vh`,
  boxSizing: `border-box`,
});
const MyDivider = styled(Divider)({
  marginBottom: `20px`,
});
const CalandarBox = styled(Box)({
  height: `60%`,
  marginTop: `10px`,
  boxSizing: `border-box`,
  padding: `30px`,
});
//======================================================
export default DashboardSection;
