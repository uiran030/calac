import { Box, Container } from "@mui/system";
import React from "react";
import FullCalendarLib from "./FullCalendarLib";
// import ReactBigCalendar from "./ReactBigCalendar";
// import FullCalendar from "@fullcalendar/react";

const SchedulerSection = () => {
  return (
    <Box height='100vh' padding={5}>
      <FullCalendarLib />
    </Box>
  );
};

export default SchedulerSection;
