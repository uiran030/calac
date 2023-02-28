import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import MapSeach from "./MapSeach";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "90%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "5px",
  boxShadow: 24,
  p: 6,
};

export default function AddScheduleModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    let result = window.confirm(
      "아직 저장되지 않은 항목이 있습니다. 그래도 나가시겠습니까?"
    );
    if (result) {
      setOpen(false);
      handleReset();
    }
  };

  const handleReset = () => {
    // text UI상에서 남아있는 문제 해결 요망
    setContents({
      id: "",
      createdAt: "",
      createdBy: "user1",
      color: "",
      //========
      groupLabel: "",
      label: "",
      locale: "",
      user: "",
      reminderTime: "",
      reminderMethod: "",
      description: "",
      startHour: "",
      endHour: "",
    });

    // window.location.reload();
  };

  const handleSaveProceed = () => {
    //save Function
    handleReset();
    // window.location.reload();
  };

  const handleSaveClose = () => {
    //save Function
    setOpen(false);
    handleReset();
  };

  // change 실시간 반영
  const [contents, setContents] = useState({
    id: "", // 버튼클릭시 uuid
    createdAt: "", // 버튼 클릭시 현재시간 부여
    createdBy: "user1", // 임시
    color: "",
    //========
    groupLabel: "",
    label: "",
    locale: "",
    user: "",
    reminderTime: "",
    reminderMethod: "",
    description: "",
    startHour: "",
    endHour: "",
    // date: "",
  });

  const handleContentsChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    if (!name) {
      setContents((prev) => ({ ...prev, reminderMethod: value }));
    } else {
      setContents((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [selectedMarker, setSelectedMaker] = React.useState("");

  // console.log(selectedMarker);

  useEffect(() => {
    setContents((prev) => ({ ...prev, locale: selectedMarker.content }));
  }, [selectedMarker]);

  // console.log(contents);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Add New Schedule
      </Button>
      <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='space-between'>
              <Typography
                variant='h5'
                component='h2'
                color='primary'
                fontWeight={700}
              >
                Add New Schedule
              </Typography>
              <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Grid>

            <Grid item xs={12} textAlign='right'>
              <Divider />
              <Typography variant='caption' color='primary'>
                * : 필수 입력 사항
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <Typography
                id='groupLabel'
                variant='subtitle1'
                component='h2'
                color='primary'
                fontWeight={700}
                textAlign='right'
              >
                *범주
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={contents.groupLabel} // 원래 뭐였지 바꿔놔야할 것 같은데..
                  onChange={handleContentsChange}
                  name='groupLabel'
                >
                  {/* 추후 맵으로 리팩토링 예정 */}
                  <MenuItem value={"회사"}>회사</MenuItem>
                  <MenuItem value={"프로젝트"}>프로젝트</MenuItem>
                  <MenuItem value={"개인"}>개인</MenuItem>
                  <MenuItem value={"가족"}>가족</MenuItem>
                  <MenuItem value={"친구"}>친구</MenuItem>
                  <MenuItem value={"생일"}>생일</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={1}>
              <Typography
                id='modal-modal-title'
                variant='subtitle1'
                component='h2'
                color='primary'
                fontWeight={700}
                textAlign='right'
              >
                *제목
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <TextField
                id='outlined-basic'
                label='Title'
                variant='outlined'
                value={contents.label}
                fullWidth
                onChange={handleContentsChange}
                name='label'
              />
            </Grid>

            <Grid item xs={1}>
              <Typography
                id='modal-modal-title'
                variant='subtitle1'
                component='h2'
                color='primary'
                fontWeight={700}
                textAlign='right'
              >
                *일시
              </Typography>
            </Grid>
            <Grid
              item
              xs={11}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <DatePicker
                onHandleContentsChange={handleContentsChange}
                contents={contents}
              />
            </Grid>

            <Grid item xs={1}>
              <Typography
                id='modal-modal-title'
                variant='subtitle1'
                component='h2'
                color='primary'
                fontWeight={700}
                textAlign='right'
              >
                장소
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id='outlined-basic'
                label='Locale'
                variant='outlined'
                fullWidth
                value={contents.locale}
                onChange={handleContentsChange}
                name='locale'
                // readOnly
              />
            </Grid>
            <Grid item xs={2} margin='auto'>
              <MapSeach
                selectedMarker={selectedMarker}
                setSelectedMaker={setSelectedMaker}
              />
            </Grid>

            <Grid item xs={1}>
              <Typography
                id='modal-modal-title'
                variant='subtitle1'
                component='h2'
                color='primary'
                fontWeight={700}
                textAlign='right'
              >
                설명
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <TextField
                id='outlined-multiline-static'
                label='Decription'
                multiline
                rows={4}
                // defaultValue=""
                fullWidth
                name='description'
                onChange={handleContentsChange}
                value={contents.description}
              />
            </Grid>

            <Grid item xs={1}>
              <Typography
                id='modal-modal-title'
                variant='subtitle1'
                component='h2'
                color='primary'
                fontWeight={700}
                textAlign='right'
              >
                알림
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Reminder Notification
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={contents.reminderTime}
                  label='Reminder Notification'
                  onChange={handleContentsChange}
                  name='reminderTime'
                >
                  {/* 추후 맵으로 리팩토링 예정 */}
                  {/* <MenuItem value={10}>직접 입력</MenuItem> */}
                  <MenuItem value=''>사용안함</MenuItem>
                  <MenuItem value={0}>정시</MenuItem>
                  <MenuItem value={300}>5분 전</MenuItem>
                  <MenuItem value={600}>10분 전</MenuItem>
                  <MenuItem value={900}>15분 전</MenuItem>
                  <MenuItem value={1800}>30분 전</MenuItem>
                  <MenuItem value={3600}>1시간 전</MenuItem>
                  <MenuItem value={7200}>2시간 전</MenuItem>
                  <MenuItem value={10800}>3시간 전</MenuItem>
                  <MenuItem value={43200}>12시간 전</MenuItem>
                  <MenuItem value={86400}>1일(24시간) 전</MenuItem>
                  <MenuItem value={172800}>2일(48시간) 전</MenuItem>
                  <MenuItem value={604800}>1주일(168시간) 전</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5} margin='auto'>
              <ToggleButtonGroup
                color='primary'
                value={contents.reminderMethod}
                exclusive
                aria-label='Platform'
                onChange={handleContentsChange}
              >
                <ToggleButton value='popup'>팝업</ToggleButton>
                <ToggleButton value='mail'>메일</ToggleButton>
                <ToggleButton value='kakao'>카카오톡 알림</ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='center'
              marginTop='40px'
            >
              <Button variant='outlined' onClick={handleReset}>
                초기화
              </Button>
            </Grid>

            <Grid item xs={9} display='flex' marginTop='20px'>
              <Button
                variant='contained'
                onClick={handleSaveProceed}
                sx={{ marginX: "10px" }}
                size='large'
                disabled={
                  contents.label === "" ||
                  contents.groupLabel === "" ||
                  contents.startHour === "" ||
                  contents.endHour === ""
                    ? true
                    : false
                }
                fullWidth
              >
                저장 후 계속
              </Button>
            </Grid>
            <Grid
              item
              xs={3}
              // display='flex'
              // justifyContent='center'
              marginTop='20px'
            >
              <Button
                variant='contained'
                fullWidth
                onClick={handleSaveClose}
                size='large'
                sx={{ marginX: "10px" }}
                disabled={
                  contents.label === "" ||
                  contents.groupLabel === "" ||
                  contents.startHour === "" ||
                  contents.endHour === ""
                    ? true
                    : false
                }
              >
                저장 후 닫기
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
