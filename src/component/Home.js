import React from 'react'
import { styled } from '@mui/material/styles';
import {Grid,Box} from '@mui/material';
import Nav from './Nav';
import Dashboard from '../page/Dashboard/Dashboard'

const Home = () => {
  
  return (
    <WholeBox>
      <MyGrid container>
        <Grid xs={3}>
          <Nav/>
        </Grid>
        <DashboardGrid xs={9}>
          <Dashboard/>
        </DashboardGrid>
      </MyGrid>
    </WholeBox>
  )
}
//style=================================================
const WholeBox = styled(Box)({
  backgroundColor: `#07553B`,
  
  height: `100vh`
});
const MyGrid = styled(Grid)({
  height: `100%`
});
const DashboardGrid = styled(Grid)({
  border: `1px solid #fff`,
  borderRadius: `70px`,
  background: `#fff`,
  margin: `8px -8px` 
});
//======================================================
export default Home