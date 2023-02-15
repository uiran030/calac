import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <WholeBox>
      <MyGrid container>
        <Grid item xs={1.7}>
          <Nav />
        </Grid>
        <DashboardGrid item xs={10.3}>
          <Outlet />
        </DashboardGrid>
      </MyGrid>
    </WholeBox>
  );
};
//style=================================================
const WholeBox = styled(Box)({
  backgroundColor: `#07553B`,
  height: `100vh`,
});
const MyGrid = styled(Grid)({
  height: `100%`,
});
const DashboardGrid = styled(Grid)({
  border: `1px solid #fff`,
  borderRadius: `80px`,
  background: `#fff`,
  margin: `10px -15px`,
  padding: `0, 10px`,
  width: `100%`,
});
//======================================================
export default Home;
