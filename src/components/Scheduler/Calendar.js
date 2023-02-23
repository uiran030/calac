import {
  Box,
  Button,
  Fab,
  Modal,
  Typography,
  TextField,
  Divider,
  StepContext,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Scheduler from "react-mui-scheduler";
import AddScheduleModal from "./AddScheduleModal";
import AddIcon from "@mui/icons-material/Add";
import TestNew from "./TestNew.tsx";
import Retry from "./Retry.jsx";
// import { Location } from "window";

export default function Calendar() {
  const [categoryFilter, setCategoryFilter] = useState([
    { id: 1, text: "전체", value: "" },
    { id: 2, text: "회사", value: "#4f953b" }, // 진녹
    { id: 3, text: "개인", value: "#a7a7a2" }, // 녹
    { id: 4, text: "가족", value: "#3a5134" }, // 회
    { id: 5, text: "친구", value: "#79a8a9" }, // 청록
    { id: 6, text: "생일", value: "#aacfd0" }, // 연청록
  ]);

  // setCategoryFilter([...categoryFilter]);

  // console.log(categoryFilter);

  const [test, setTest] = useState([]);

  let arr = [];

  // useEffect(() => {
  //   categoryFilter.map((item, index) =>
  //     arr.push({ id: index, text: item, value: index })
  //   );
  //   setTest(arr);
  //   console.log(arr);
  // }, [categoryFilter]);
  // console.log(test);

  useEffect(() => {
    categoryFilter.map((item, index) =>
      setTest((prev) => [
        ...categoryFilter,
        { id: index, text: item, value: index },
      ])
    );
    // setTest(arr);
    // console.log(arr);
  }, [categoryFilter]);
  console.log(test);

  const [inputCategory, setInputCategory] = useState(false);
  const toggleInputCategory = () => setInputCategory((prev) => !prev);

  const [text, setText] = useState("");
  const handleSave = () => {
    if (text !== "") {
      setCategoryFilter((prev) => [...prev, { id: 6, text: text, value: 6 }]);
      toggleInputCategory();
      setText("");
    } else {
      return;
    }
    // window.location.reload();
  };

  console.log(text);
  const [selected, setSelected] = useState("");
  return (
    <Box>
      <Box height='62px' paddingX='50px' paddingY='10px'>
        <Typography variant='h4' color='primary' fontWeight={700}>
          MY SCHEDULER
        </Typography>
      </Box>

      <Box sx={{ paddingX: "50px", height: "1000px" }}>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            paddingX: "10px",
            paddingY: "5px",
          }}
        >
          <Box sx={{ display: "flex" /* backgroundColor: "#000000" */ }}>
            <Box>
              {categoryFilter.map((item, index) => (
                <Button
                  key={index}
                  variant='text'
                  sx={{}} // item.text === selected ? : 흠 방법이 읎나
                  onClick={(e) => setSelected(e.target.textContent)}
                >
                  <Paper
                    sx={{
                      background: item.value,
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                    }}
                  >
                    　
                  </Paper>
                  {item.text}
                </Button>
              ))}
              <Divider width='100%' sx={{ marginLeft: "0px" }} />
            </Box>
          </Box>
          {inputCategory ? (
            <Box display='flex' alignItems='center'>
              <TextField
                id='outlined-basic'
                label='키워드 또는 주소를 입력하세요.'
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
        {/* <Divider width='80%' sx={{ marginLeft: "0px" }} /> */}
        {/* <TestNew /> */}
        <Retry categoryFilter={categoryFilter} test={test} />
      </Box>
    </Box>
  );
}
// 수ㄹ
// ReactDOM.render(<App />, document.querySelector('#yourComponentRootId'))
