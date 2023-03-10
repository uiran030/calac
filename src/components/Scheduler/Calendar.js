import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactScheduler from "./ReactScheduler.tsx";
import "../../assets/css/App.css";
import axios from "axios";

export default function Calendar() {
  // useEffect(() => {
  //   axios.get("http://localhost:5000/scheduler").then((res) => {
  //     console.log("res", res.data);
  //     // setLedgerData(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .all([
  //       axios.get("http://localhost:5000/scheduler"),
  //       axios.get("http://localhost:5000/scheduler/event"),
  //     ])
  //     .then(
  //       axios.spread((res1, res2) => {
  //         console.log(res1, res2);
  //       })
  //       // setLedgerData(res.data);
  //     )
  //     .catch((err) => console.log(err));
  // }, []);

  const [categoryFilter, setCategoryFilter] = useState([
    { id: 1, text: "전체", value: "" },
    { id: 2, text: "회사", value: "#4f953b" }, // 진녹
    { id: 3, text: "개인", value: "#a7a7a2" }, // 녹
    { id: 4, text: "가족", value: "#3a5134" }, // 회
    { id: 5, text: "친구", value: "#79a8a9" }, // 청록
    { id: 6, text: "생일", value: "#aacfd0" }, // 연청록
  ]);

  const newCategoryColor = [
    "#ef9e9f",
    "#cb7575",
    "#8283a7",
    "#AF4034",
    "#D09E88",
  ];

  const [inputCategory, setInputCategory] = useState(false);
  const toggleInputCategory = () => setInputCategory((prev) => !prev);

  const [text, setText] = useState("");
  const handleSave = () => {
    if (text !== "") {
      if (categoryFilter.find((item) => item.text === text)) {
        window.alert("이미 존재하는 카테고리 입니다.");
      } else {
        if (categoryFilter.length > 8) {
          window.alert("카테고리는 최대 3개까지 추가가 가능합니다.");
        } else {
          setCategoryFilter((prev) => [
            ...prev,
            {
              id: 6,
              text: text,
              value:
                newCategoryColor[
                  Math.floor(Math.floor(Math.random() * 10) / 2)
                ], // 0~4중에서 임의로 출력됨. (미완성, 같은 색상이 나올 수 있음.)
            },
          ]);
          toggleInputCategory();
          setText("");
        }
      }
    } else {
      return;
    }
  };

  const [btnActive, setBtnActive] = useState("전체");

  console.log(btnActive);

  return (
    <Box>
      <Box height='70px' paddingX='50px' paddingY='15px'>
        <Typography variant='h4' color='primary' fontWeight={700}>
          일정 관리
        </Typography>
      </Box>

      <Box sx={{ paddingX: "50px", height: "1000px" }}>
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
              {categoryFilter.map((item, index) => (
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
                  onClick={(e) => {
                    setBtnActive(e.target.textContent);
                  }}
                  className={btnActive === item.text ? "active2" : ""}
                >
                  <Paper // 페이퍼 클릭시 음영사라지는 것 수정 요망
                    sx={{
                      background: item.value,
                      width: "12px",
                      height: "12px",
                    }}
                  >
                    　
                  </Paper>
                  <Typography width='auto' paddingLeft='5px'>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider width='100%' sx={{ marginY: "5px" }} />
          </Box>
          {inputCategory ? (
            <Box display='flex' alignItems='center'>
              <TextField
                id='outlined-basic'
                label='카테고리를 입력하세요.'
                variant='outlined'
                size='small'
                sx={{ marginX: "5px" }}
                onChange={(e) => setText(e.target.value)}
              />
              <Button variant='outlined' onClick={handleSave}>
                확인
              </Button>
            </Box>
          ) : (
            <Button onClick={toggleInputCategory}>+</Button>
          )}
        </Box>
        <ReactScheduler categoryFilter={categoryFilter} btnActive={btnActive} />
      </Box>
    </Box>
  );
}
