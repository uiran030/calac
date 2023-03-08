import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import DiaryCard from './DiaryCard';
import WriteDiary from './WriteDiary';
import axios from 'axios';

const FeedSection = () => {
  useEffect(()=>{
    axios.get('http://localhost:5000/ledger')
    .then(res=>console.log("ledger",res.data))
    axios.get('http://localhost:5000/scheduler')
    .then(res=>console.log("scheduler",res.data))
    axios.get('http://localhost:5000/users')
    .then(res=>console.log("users",res.data))
    axios.get('http://localhost:5000/dairy')
    .then(res=>console.log("dairy",res.data))
  },[])
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
  height: '100vh',
  margin: '0 auto',
});
const MyTypography = styled(Box)({
  fontSize: 30,
  color: '#07553B',
  paddingTop: 20,
  paddingLeft: '13vh',
});
const DiaryBox = styled(Box)({
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap'
});
const WriteBox = styled(Box)({
  display: 'flex',
  justifyContent: 'end',
  paddingRight: '13vh',
});
//======================================================
export default FeedSection;