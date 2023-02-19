import React, {useState} from 'react';
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import DiaryCard from './DiaryCard';
import WriteDiary from './WriteDiary';
import { PaddingTwoTone } from '@mui/icons-material';

const FeedSection = () => {
  return (
    <MyBox>
      <MyTypography>Diary</MyTypography>
      <WriteBox>
        <WriteDiary/>
      </WriteBox>
      <DiaryBox>
        <DiaryCard/>
      </DiaryBox>
    </MyBox>
  );
};
//style=================================================
const MyBox = styled(Box)({
  width: '100vh',
  margin: '0 auto',
});
const MyTypography = styled(Box)({
  fontSize: 30,
  color: '#07553B',
  padding: '20px 0 0 20px',
});
const DiaryBox = styled(Box)({
  width: '100vh',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap'
});
const WriteBox = styled(Box)({
  display: 'flex',
  justifyContent: 'end',
  paddingRight: 25,
});
//======================================================
export default FeedSection;