import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box } from "@mui/material";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <WholeBox>
      <MyGrid container>
        <Grid item xs={1.7} sx={{ display: "fixed" }}>
          <Nav />
        </Grid>
        <DashboardGrid item xs={10.2}>
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
  background: `#07553B`,
  display:`flex`,
  alignItems: `center`
});
const DashboardGrid = styled(Grid)({
  borderRadius: `80px`,
  background: `#fff`,
  // margin: `0px 10px 13px 0`,
  margin: `0`,
  height: `96%`,
  width: `95%`,
  boxSizing: `border-box`,
});
//======================================================
export default Home;
