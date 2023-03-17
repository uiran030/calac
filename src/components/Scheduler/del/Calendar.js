import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
  Paper,
  Modal,
  ButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactScheduler from "./ReactScheduler.tsx";
import "../../assets/css/App.css";
import axios from "axios";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate } from "react-router-dom";
import ScheduleManager from "./ScheduleManager.tsx";

export default function Calendar() {
  const [btnActive, setBtnActive] = useState(0);

  const categoryFilter = [
    { id: 1, text: "전체", value: "" },
    { id: 2, text: "회사", value: "#4f953b" }, // 진녹
    { id: 3, text: "개인", value: "#a7a7a2" }, // 녹
    { id: 4, text: "가족", value: "#3a5134" }, // 회
    { id: 5, text: "친구", value: "#79a8a9" }, // 청록
    { id: 6, text: "생일", value: "#aacfd0" }, // 연청록
  ];

  return (
    <Box>
      <Box height='8vh' paddingX='50px' paddingY='15px'>
        <Typography variant='h4' color='primary' fontWeight={700}>
          일정 관리
        </Typography>
      </Box>
      <Box sx={{ paddingX: "50px", height: "92vh" }}>
        <Box
          sx={{
            display: "flex",
            paddingX: "10px",
            paddingY: "5px",
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", height: "30px", boxSize: "border-box" }}
            >
              {categoryFilter &&
                categoryFilter.map((item, index) => (
                  <Box
                    key={index}
                    variant='text'
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingX: "10px",
                      marginX: "5px",
                      cursor: "pointer",
                      borderRadius: "30px",
                    }}
                    onClick={() => {
                      setBtnActive(index);
                    }}
                    className={btnActive === index ? "active2" : ""}
                  >
                    <Paper // 페이퍼 클릭시 음영사라지는 것 수정 요망
                      sx={{
                        background: item.value,
                        width: "12px",
                        height: "12px",
                      }}
                    >
                      　
                    </Paper>
                    <Box position='relative'>
                      <Typography width='auto' paddingLeft='5px'>
                        {item && item.text && item.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Divider width='100%' sx={{ marginY: "5px" }} />
          </Box>
        </Box>
        {/* <ReactScheduler categoryFilter={categoryFilter} btnActive={btnActive} /> */}
        <ScheduleManager categoryFilter={categoryFilter} />
      </Box>
    </Box>
  );
}
