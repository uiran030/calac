import React from 'react';
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import TestCard from "./TestCard";
import tours from "../../data/testData.json";

const DashboardTestCard = () => {
  return (
    <>
    <Typography
      variant='h5'
      fontWeight={700}
      color='primary'
      paddingLeft={3}
      marginTop={5}
    >
      RECENT POST
    </Typography>
    <Grid container spacing={3} sx={{ paddingY: "10px", paddingX: "20px" }}>
      {tours.map((tour, index) => (
        <TestCard key={index} tour={tour} />
      ))}
    </Grid>
  </>
  );
};
//style=================================================
// 스타일 추후에 변경 예정
const RecentPostWrap = styled(Grid)({
  maxHeight:`250px`,
  border:`1px solid black`
});
const Card = styled(TestCard)({
  border:'1px solid red'
})
//======================================================
export default DashboardTestCard;