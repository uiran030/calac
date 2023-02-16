import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider} from "@mui/material";
import DashboardChart from "./DashboardChart";
import DashboardCalendar from "./DashboardCalendar";
import DashboardUpper from "./DashboardUpper";
import DashboardTestCard from "./DashboardTestCard";
import DashboardTodoList from "./DashboardTodoList";

const DashboardSection = () => {
  return (
    <MyGird container>
      <Grid item xs={7.9}>
        <DashboardUpper />
        <MyDivider />
        <DashboardChart />
        <DashboardTestCard />
      </Grid>
      <Divider orientation='vertical' variant='middle' flexItem />
      <Grid item xs={4}>
        <CalandarBox>
          <DashboardCalendar />
        </CalandarBox>
        <Divider sx={{ marginBottom: "10px" }} />
        <DashboardTodoList />
      </Grid>
    </MyGird>
  );
};
//style=================================================
const MyGird = styled(Grid)({
  padding: `25px 25px`,
  height: `97vh`,
  boxSizing: `border-box`,
});
const MyDivider = styled(Divider)({
  padding: `0px`,
});
const CalandarBox = styled(Box)({
  height: `60vh`,
  width: `100%`,
});
//======================================================
export default DashboardSection;
