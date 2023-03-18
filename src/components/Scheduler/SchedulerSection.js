import { Box, Container } from "@mui/system";
import React from "react";
import Calendar from "./Calendar";
// import ReactBigCalendar from "./ReactBigCalendar";
// import FullCalendar from "@fullcalendar/react";

const SchedulerSection = () => {
  return (
    <Box height='100vh' padding={5}>
      <Calendar />
    </Box>
  );
};

export default SchedulerSection;
