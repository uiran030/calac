import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Divider, Typography } from "@mui/material";
import AccountBookChart from "../components/dashboard/FinancialLedger";
import MiniCalendar from "../components/dashboard/MiniCalendar";
import Weather from "../components/dashboard/Weather";
import TestCard from "../components/dashboard/TestCard";
import tours from "../data/testData.json";
import TestTodoList from "../components/dashboard/TestTodoList";

const Dashboard = () => {
  return (
    <MyGird container>
      <Grid item xs={7.9}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "10px",
            marginY: "0",
          }}
        >
          <Weather />
          <Box marginRight={3}>
            <Typography
              variant='body1'
              fontWeight={700}
              color='primary'
              textAlign='right'
            >
              로그인을 <br />
              진행해주세요
            </Typography>
          </Box>
        </Box>
        <MyDivider />
        <AccountBookChart />
        <Typography
          variant='h5'
          fontWeight={700}
          color='primary'
          paddingLeft={3}
          marginTop={5}
        >
          RECENT POST
        </Typography>
        {/* 프로토 타입용 FEED 완성시 삭제할 것임 */}
        <Grid container spacing={3} sx={{ paddingY: "10px", paddingX: "20px" }}>
          {tours.map((tour, index) => (
            <TestCard key={index} tour={tour} />
          ))}
        </Grid>
        {/* 여기까지 */}
      </Grid>
      <Divider orientation='vertical' variant='middle' flexItem />
      <Grid item xs={4}>
        <CalandarBox>
          <MiniCalendar />
        </CalandarBox>
        <Divider sx={{ marginBottom: "10px" }} />
        <Typography
          variant='h5'
          fontWeight={700}
          color='primary'
          marginLeft={2}
        >
          WEEKLY TO DO{" "}
        </Typography>
        <TestTodoList />
      </Grid>
    </MyGird>
  );
};
//style=================================================
const MyGird = styled(Grid)({
  padding: `25px 40px`,
  height: `97vh`,
  boxSizing: `border-box`,
});
const MyDivider = styled(Divider)({
  padding: `2px`,
});
const VerticalDivider = styled(Divider)({
  height: `80px`,
});
const CalandarBox = styled(Box)({
  height: `60vh`,
  width: `100%`,
});
//======================================================
export default Dashboard;
