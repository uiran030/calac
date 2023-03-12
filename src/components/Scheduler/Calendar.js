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

export default function Calendar() {
  const [categoryFilter, setCategoryFilter] = useState();
  const [detectedDataUpdate, setDetectedDataUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/scheduler/category") //
      .then((res) => {
        // console.log("res", res.data);
        setCategoryFilter(res.data);
      });
  }, [detectedDataUpdate]);

  // const [categoryFilter, setCategoryFilter] = useState([
  //   { id: 1, text: "전체", value: "" },
  //   { id: 2, text: "회사", value: "#4f953b" }, // 진녹
  //   { id: 3, text: "개인", value: "#a7a7a2" }, // 녹
  //   { id: 4, text: "가족", value: "#3a5134" }, // 회
  //   { id: 5, text: "친구", value: "#79a8a9" }, // 청록
  //   { id: 6, text: "생일", value: "#aacfd0" }, // 연청록
  // ])

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
          ///======
          axios
            .post("http://localhost:5000/scheduler/category/insert", {
              newCategory: {
                user_no: 1,
                text: text,
                value:
                  newCategoryColor[
                    Math.floor(Math.floor(Math.random() * 10) / 2)
                  ],
              },
            })
            .then(() => {
              alert("등록성공!");
              console.log(categoryFilter);
              setDetectedDataUpdate((prev) => !prev);
            })
            .catch(() => {
              alert("등록실패");
            });
          ///======
          // setCategoryFilter((prev) => [
          //   ...prev,
          //   {
          //     id: 6,
          //     text: text,
          //     value:
          //       newCategoryColor[
          //         Math.floor(Math.floor(Math.random() * 10) / 2)
          //       ], // 0~4중에서 임의로 출력됨. (미완성, 같은 색상이 나올 수 있음.)
          //   },
          // ]);
          toggleInputCategory();
          setText("");
        }
      }
    } else {
      return;
    }
  };

  const [btnActive, setBtnActive] = useState(0);
  const [editModeOn, setEditModeOn] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const handleEdit = () => {
    axios
      .post("http://localhost:5000/scheduler/category/edit", {
        editedCategoryObj: {
          ...categoryFilter[btnActive],
          text: editedCategory,
        },
      })
      .then(() => {
        alert("수정성공!");
        setDetectedDataUpdate((prev) => !prev);
        handleClose();
      })
      .catch(() => {
        alert("수정실패");
      });
  };
  const handleDelete = () => {
    axios
      .post("http://localhost:5000/scheduler/category/delete", {
        deletedId: categoryFilter[btnActive].id,
      })
      .then(() => {
        alert("삭제 성공!");
        setDetectedDataUpdate((prev) => !prev);
        handleClose();
      })
      .catch(() => {
        alert("삭제 실패ㅠ");
      });
  };

  //카테고리 수정 모달 =====================================
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "5px",
    overFlow: "hidden",
    boxShadow: 24,
    px: 4,
    pt: 4,
  };
  //===================================================

  console.log("test", editedCategory);

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
                      if (editModeOn) {
                        if (index === 0) return;
                        setBtnActive(index);
                        handleOpen();
                      } else {
                        setBtnActive(index);
                      }
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
                      <Box
                        display={editModeOn && index !== 0 ? "flex" : "none"}
                        position='absolute'
                        top='-10px'
                        right='-10px'
                      >
                        <RemoveCircleIcon fontSize='20px' color='primary' />
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style} position='relative'>
                <Box display='flex' alignItems='center'>
                  <EditIcon sx={{ marginX: "5px" }} />
                  <Typography>변경하고자 카테고리명을 입력해주세요.</Typography>
                </Box>
                <TextField
                  label='카테고리명 수정'
                  size='small'
                  defaultValue={
                    btnActive &&
                    categoryFilter[btnActive] &&
                    categoryFilter[btnActive].text
                  } // 왜 얘가먼저 렌더링되지
                  onChange={(e) => setEditedCategory(e.target.value)}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "80px",
                  }}
                />
                <ButtonGroup
                  variant='text'
                  aria-label='text button group'
                  sx={{
                    width: "100%",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <Button fullWidth onClick={handleDelete}>
                    삭제하기
                  </Button>
                  <Button fullWidth onClick={handleEdit}>
                    수정하기
                  </Button>
                  <Button fullWidth onClick={handleClose}>
                    닫기
                  </Button>
                </ButtonGroup>
              </Box>
            </Modal>
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
              <ButtonGroup
                variant='outlined'
                aria-label='outlined button group'
              >
                <Button variant='outlined' onClick={handleSave}>
                  확인
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => {
                    toggleInputCategory();
                    setText("");
                  }}
                >
                  닫기
                </Button>
              </ButtonGroup>
            </Box>
          ) : (
            <Box display='flex' alignItems='center'>
              <Button onClick={toggleInputCategory}>+</Button>
              <Typography
                color='#c1c1c1'
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setEditModeOn((prev) => !prev);
                }}
              >
                카테고리 편집
              </Typography>
            </Box>
          )}
        </Box>
        <ReactScheduler categoryFilter={categoryFilter} btnActive={btnActive} />
      </Box>
    </Box>
  );
}
