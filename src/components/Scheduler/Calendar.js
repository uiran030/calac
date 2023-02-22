import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Scheduler from "react-mui-scheduler";
import AddScheduleModal from "./AddScheduleModal";
import AddIcon from "@mui/icons-material/Add";
import TestNew from "./TestNew.tsx";

export default function Calendar() {
  const [categoryFilter, setCategoryFilter] = useState([
    "전체",
    "회사",
    "프로젝트",
    "개인",
    "가족",
    "친구",
    "생일",
  ]);

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
