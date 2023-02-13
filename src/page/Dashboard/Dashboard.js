import React from 'react';
import { styled } from '@mui/material/styles';
import {Box,Grid,Divider} from '@mui/material';
import AccountBookChart from './AccountBookChart'
import MiniCalendar from './MiniCalendar'

const Dashboard = () => {
  return (
    <MyGird container>
      <Grid xs={7}>
        today<br></br>
        2023.02.09
        <MyDivider/>
        <AccountBookChart/>
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem/>
      <Grid xs={2} style={{maxWidth: '40%'}}>
        <CalandarBox>
          <MiniCalendar/>
        </CalandarBox>
        <Divider/>
        Today or Week<br></br>
        Todo list
      </Grid>
    </MyGird>
  )
}
//style=================================================
const MyGird = styled(Grid)({
  padding: `30px`,
  height: `98vh`
});
const MyDivider = styled(Divider)({
  padding: `10px`,
});
// const VerticalDivider = styled(Divider)({
//   height: `80px`
// });
const CalandarBox = styled(Box)({
  height: `60vh`, width: `30vw`,
});
//======================================================
export default Dashboard