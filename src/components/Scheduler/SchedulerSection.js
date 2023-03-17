import { Box, Container } from "@mui/system";
import React from "react";
import ReactBigCalendar from "./ReactBigCalendar";

const SchedulerSection = () => {
  return (
    <Box height='100vh' padding={5}>
      <ReactBigCalendar />
    </Box>
  );
};

export default SchedulerSection;
