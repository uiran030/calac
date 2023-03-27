import { Box } from "@mui/system";
import React from "react";
import FullCalendarLib from "./FullCalendarLib";

const SchedulerSection = () => {
  return (
    <Box height='100vh' padding={5}>
      <FullCalendarLib />
    </Box>
  );
};

export default SchedulerSection;
