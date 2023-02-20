import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Scheduler from "react-mui-scheduler";
import AddScheduleModal from "./AddScheduleModal";
import AddIcon from "@mui/icons-material/Add";
import TestNew from "./TestNew.tsx";

export default function Calendar() {
  const [state] = useState({
    options: {
      transitionMode: "zoom", // zoom or fade
      startWeekOn: "sun", // mon or sun
      defaultMode: "month", //  month | week | day | timeline
      // minWidth: 540,
      // maxWidth: 1540,
      // minHeight: 540,
      // maxHeight: 1540,
    },
    alertProps: {
      open: true,
      color: "info", // info | success | warning | error
      severity: "info", // info | success | warning | error
      message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
      showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
    },
  });

  const events = [
    {
      id: "event-1",
      label: "Medical consultation",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "04:00 AM",
      endHour: "05:00 AM",
      date: "2022-05-05",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-2",
      label: "Medical consultation",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startHour: "09:00 AM",
      endHour: "10:00 AM",
      date: "2022-05-09",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-3",
      label: "Medical consultation",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startHour: "13 PM",
      endHour: "14 PM",
      date: "2022-05-10",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
    {
      id: "event-4",
      label: "Consultation prénatale",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "08:00 AM",
      endHour: "09:00 AM",
      date: "2022-05-11",
      createdAt: new Date(),
      createdBy: "Kristina Mayer",
    },
  ];

  const handleCellClick = (event, row, day) => {
    // Do something...
  };

  const handleEventClick = (event, item) => {
    // Do something...
  };

  const handleEventsChange = (item) => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = (item) => {
    // Do something...
  };

  // ============== Customazing =================
  const [categoryFilter, setCategoryFilter] = useState([
    "전체",
    "회사",
    "프로젝트",
    "개인",
    "가족",
    "친구",
    "생일",
  ]);

  const [openAddScheduleModal, setOpenAddScheduleModal] = useState(false);

  const toggleOpenAddScheduleModal = () => {
    setOpenAddScheduleModal((prev) => !prev);
  };

  return (
    <Box>
      <Box sx={{ paddingX: "50px", height: "1000px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: "10px",
            paddingY: "5px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {categoryFilter.map((item, index) => (
              <Button key={index} variant='text' sx={{ fontWeight: "700" }}>
                {item}
              </Button>
            ))}
          </Box>
          <Fab
            color='primary'
            aria-label='add'
            size='small'
            sx={{ zIndex: "0", marginLeft: "20px" }}
          >
            <AddIcon />
          </Fab>
          <Box
            sx={{
              display: "flex",
              flex: "1",
              justifyContent: "right",
              height: "35px",
            }}
          >
            <AddScheduleModal />
          </Box>
        </Box>
        {/* <Scheduler
          locale='en'
          events={events}
          legacyStyle={false}
          options={state?.options}
          // alertProps={state?.alertProps}
          toolbarProps={state?.toolbarProps}
          onEventsChange={handleEventsChange}
          onCellClick={handleCellClick}
          onTaskClick={handleEventClick}
          onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
        /> */}
        <TestNew />
      </Box>
    </Box>
  );
}
// 수ㄹ
// ReactDOM.render(<App />, document.querySelector('#yourComponentRootId'))
