import React from 'react';
import { Typography } from "@mui/material";
import TestTodoList from "./TestTodoList";

const DashboardTodoList = () => {
  return (
  <>
    <Typography
      variant='h5'
      fontWeight={700}
      color='primary'
      marginLeft={2}
    >
      이번달 목표
    </Typography>
    <TestTodoList />
  </>
  );
};

export default DashboardTodoList;