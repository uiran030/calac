import React, { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { configure } from "@testing-library/react";
import type {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import {
  TextField,
  Button,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import DatePicker from "./DatePicker";
import MapSeach from "./MapSeach";
import CloseIcon from "@mui/icons-material/Close";

// 커스텀 코드
interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    category: event?.category || "",
    title: event?.title || "",
    locale: event?.locale || "",
    description: event?.description || "",
    reminder: event?.reminder || "",
    reminderMethod: event?.reminderMethod || "",
  });
  const [error, setError] = useState("");

  console.log(state);

  const handleChange = (value: any, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    // Your own validation
    if (state.title.length < 3) {
      return setError("Min 3 letters");
    }

    try {
      scheduler.loading(true);

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */

        setTimeout(() => {
          res({
            event_id: event?.event_id || Math.random(),
            category: state.category,
            title: state.title,
            start: scheduler.state.start.value,
            end: scheduler.state.end.value,
            locale: state.locale,
            description: state.description,
            reminder: state.reminder,
            reminderMethod: state.reminderMethod,
          });
        }, 3000);
      })) as ProcessedEvent;

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  //내코드
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // let result = window.confirm(
    //   "아직 저장되지 않은 항목이 있습니다. 그래도 나가시겠습니까?"
    // );
    // if (result) {
    setOpen(false);
    // handleReset();
  };
  // };

  // const handleReset = () => {
  //   // text UI상에서 남아있는 문제 해결 요망
  //   setContents({
  //     id: "",
  //     createdAt: "",
  //     createdBy: "user1",
  //     color: "",
  //     //========
  //     groupLabel: "",
  //     label: "",
  //     locale: "",
  //     user: "",
  //     reminderTime: "",
  //     reminderMethod: "",
  //     description: "",
  //     startHour: "",
  //     endHour: "",
  //   });

  // window.location.reload();
  // };

  // const handleSaveProceed = () => {
  //   //save Function
  //   handleReset();
  //   // window.location.reload();
  // };

  // const handleSaveClose = () => {
  //   //save Function
  //   setOpen(false);
  //   handleReset();
  // };

  // change 실시간 반영
  // const [contents, setContents] = useState({
  //   id: "", // 버튼클릭시 uuid
  //   createdAt: "", // 버튼 클릭시 현재시간 부여
  //   createdBy: "user1", // 임시
  //   color: "",
  //   //========
  //   groupLabel: "",
  //   label: "",
  //   locale: "",
  //   user: "",
  //   reminderTime: "",
  //   reminderMethod: "",
  //   description: "",
  //   startHour: "",
  //   endHour: "",
  //   // date: "",
  // });

  // const handleContentsChange = (e) => {
  //   // console.log(e);
  //   const { name, value } = e.target;
  //   if (!name) {
  //     setContents((prev) => ({ ...prev, reminderMethod: value }));
  //   } else {
  //     setContents((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const [selectedMarker, setSelectedMaker] = React.useState("");

  // // console.log(selectedMarker);

  useEffect(() => {
    setState((prev) => ({ ...prev, locale: selectedMarker.content }));
  }, [selectedMarker]);

  // console.log(contents);

  // //
  return (
    <div>
      <div style={{ padding: "3rem" }}>
        <Grid container spacing={2}>
          {/* 상단제목 */}
          <Grid item xs={12} display='flex' justifyContent='space-between'>
            <Typography
              variant='h5'
              component='h2'
              color='primary'
              fontWeight={700}
            >
              Add New Event
            </Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Grid>
          {/* 상단각주 */}
          <Grid item xs={12} textAlign='right'>
            <Divider />
            <Typography variant='caption' color='primary'>
              * : 필수 입력 사항
            </Typography>
          </Grid>

          {/* 범주 제목 */}
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

          {/* 범주 내용 */}
          <Grid item xs={11}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={contents.groupLabel} // 원래 뭐였지 바꿔놔야할 것 같은데..
                // onChange={handleContentsChange}
                // onChange={(e) => console.log(e.target.value)}
                onChange={(e) => handleChange(e.target.value, "category")}
                name='groupLabel'
                required
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

          {/* 제목 제목 ㅋㅋ */}
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

          {/* 제목 내용 */}
          <Grid item xs={11}>
            <TextField
              id='outlined-basic'
              label='Title'
              variant='outlined'
              // value={contents.label}
              fullWidth
              // onChange={handleContentsChange}
              name='label'
              value={state.title}
              onChange={(e) => handleChange(e.target.value, "title")}
              error={!!error}
              helperText={error}
            />
          </Grid>

          {/* 일시 제목 */}
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

          {/* 일시 내용 추후 수정*/}
          <Grid
            item
            xs={11}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <DatePicker onChange={handleChange} state={state} />
          </Grid>

          {/* 장소 제목 */}
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

          {/* 장소 내용 */}
          <Grid item xs={9}>
            <TextField
              id='outlined-basic'
              label='Locale'
              variant='outlined'
              fullWidth
              value={state.locale}
              // onChange={handleContentsChange}
              onChange={(e) => handleChange(e.target.value, "locale")}
              name='locale'
              // readOnly
            />
          </Grid>
          <Grid item xs={2} margin='auto'>
            {/* 장소 버튼 */}
            <MapSeach
              selectedMarker={selectedMarker}
              setSelectedMaker={setSelectedMaker}
            />
          </Grid>

          {/* 설명 제목 */}
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

          {/* 설명 내용 */}
          <Grid item xs={11}>
            <TextField
              id='outlined-multiline-static'
              label='Decription'
              multiline
              rows={4}
              // defaultValue=""
              fullWidth
              name='description'
              // onChange={handleContentsChange}
              // value={contents.description}
              onChange={(e) => handleChange(e.target.value, "description")}
            />
          </Grid>

          {/* 알림 제목 */}
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

          {/* 알림 내용 */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Reminder</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={contents.reminderTime}
                label='Reminder Notification'
                // onChange={handleContentsChange}
                onChange={(e) => handleChange(e.target.value, "reminder")}
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

          {/* 알림 버튼 */}
          <Grid item xs={5} margin='auto'>
            <ToggleButtonGroup
              color='primary'
              value={state.reminderMethod}
              exclusive
              aria-label='Platform'
              // onChange={handleContentsChange}
              onChange={(e) => handleChange(e.target.value, "reminderMethod")}
            >
              <ToggleButton value='popup'>팝업</ToggleButton>
              <ToggleButton value='mail'>메일</ToggleButton>
              <ToggleButton value='kakao'>카카오톡 알림</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* 초기화 버튼 */}
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='center'
            marginTop='40px'
          >
            <Button
              variant='outlined'
              // onClick={handleReset}
            >
              초기화
            </Button>
          </Grid>

          {/* 저장후 계속 버튼*/}
          <Grid item xs={9} display='flex' marginTop='20px'>
            <Button
              variant='contained'
              // onClick={handleSaveProceed}
              sx={{ marginX: "10px" }}
              size='large'
              // disabled={
              //   contents.label === "" ||
              //   contents.groupLabel === "" ||
              //   contents.startHour === "" ||
              //   contents.endHour === ""
              //     ? true
              //     : false
              // }
              fullWidth
            >
              저장 후 계속
            </Button>
          </Grid>

          {/* 저장 후 닫기 버튼 */}
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
              // onClick={handleSaveClose}
              size='large'
              sx={{ marginX: "10px" }}
              // disabled={
              //   contents.label === "" ||
              //   contents.groupLabel === "" ||
              //   contents.startHour === "" ||
              //   contents.endHour === ""
              //     ? true
              //     : false
              // }
            >
              저장 후 닫기
            </Button>
          </Grid>

          {/* <TextField
            label='Title'
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            error={!!error}
            helperText={error}
            fullWidth
          />
          <TextField
            label='Description'
            value={state.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            fullWidth
          /> */}
        </Grid>
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};
// 커스텀 코드 여기까지

export default function TestNew() {
  return (
    <Scheduler
      // 후 커스텀 개자식
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      viewerExtraComponent={(fields, event) => {
        return (
          <div>
            <p>범주 : {event.category || "Nothing"}</p>
            <p>장소 : {event.locale || "Nothing"}</p>
            <p>설명 : {event.description || "Nothing"}</p>
            <p>알림 : {event.reminder || "Nothing"}</p>
            <p>알림방법: {event.reminderMethod || "Nothing"}</p>
          </div>
        );
      }}
      // 여까지 커스텀
      height={800}
      view='month'
      month={{
        weekDays: [0, 1, 2, 3, 4, 5, 6], // 요일을 뭐뭐 사용할지.
        weekStartOn: 0, // 어떤 요일로 시작할지 (0이 일요일이더라)
        startHour: 9, // 시작 시간 초기값 시간
        endHour: 17, // 끝 초기값 시간
        // cellRenderer?:(props: CellProps) => JSX.Element,
        navigation: true, // ?
        disableGoToDay: false, // ?
      }}
      events={[
        {
          event_id: 1,
          title: "Event 1",
          start: new Date("2021/5/2 09:30"),
          end: new Date("2021/5/2 10:30"),
          // allDay: true,
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2021/5/4 10:00"),
          end: new Date("2021/5/4 11:00"),
        },
      ]}
      // fields={[
      //   // 핵심!!!!!!
      //   {
      //     name: "category",
      //     type: "select",
      //     options: [
      //       //추후 map합수로 리팩토링 예정
      //       { id: 1, text: "회사", value: 1 },
      //       { id: 2, text: "개인", value: 2 },
      //       { id: 3, text: "가족", value: 3 },
      //       { id: 4, text: "친구", value: 4 },
      //       { id: 5, text: "생일", value: 5 },
      //       { id: 6, text: "프로젝트", value: 6 },
      //     ],
      //     config: {
      //       label: "Category",
      //       required: true,
      //       errMsg: "Please Select Category",
      //     },
      //   },
      //   {
      //     name: "locale",
      //     type: "input",
      //     config: {
      //       label: "Locale",
      //       // required: true,
      //       // min: 3,
      //       // email: true,
      //       variant: "outlined",
      //     },
      //   },
      //   {
      //     name: "description",
      //     type: "input",
      //     // default: "Default Value...",
      //     config: {
      //       label: "Description",
      //       multiline: true,
      //       rows: 4,
      //       // required: true,
      //       // min: 3,
      //       // email: true,
      //       // variant: "outlined",
      //     },
      //   },
      //   {
      //     name: "reminder",
      //     type: "select",
      //     options: [
      //       //추후 map합수로 리팩토링 예정
      //       { id: 1, text: "사용안함", value: 1 },
      //       { id: 2, text: "정시", value: 2 },
      //       { id: 3, text: "5분 전", value: 300 },
      //       { id: 4, text: "10분 전", value: 600 },
      //       { id: 5, text: "15분 전", value: 900 },
      //       { id: 6, text: "30분 전", value: 1800 },
      //       { id: 7, text: "1시간 전", value: 3600 },
      //       { id: 8, text: "2시간 전", value: 7200 },
      //       { id: 9, text: "3시간 전", value: 10800 },
      //       { id: 10, text: "12시간 전", value: 43200 },
      //       { id: 11, text: "1일(24시간) 전", value: 86400 },
      //       { id: 12, text: "2일(24시간) 전", value: 172800 },
      //       { id: 13, text: "1주일(168시간) 전", value: 604800 },
      //     ],
      //     config: {
      //       label: "Reminder",
      //       required: false,
      //       // errMsg: "Please Select Category",
      //     },
      //   },
      //   {
      //     name: "reminderMethod",
      //     type: "select",
      //     options: [
      //       //추후 map합수로 리팩토링 예정
      //       { id: 1, text: "팝업", value: 1 },
      //       { id: 2, text: "메일", value: 2 },
      //       { id: 3, text: "카카오 메시지", value: 300 },
      //     ],
      //     config: {
      //       label: "Reminder Method",
      //       required: false,
      //       // errMsg: "Please Select Category",
      //     },
      //   },
      // ]}
      translations={{
        // 각종 글자들 변경 시켜줌
        navigation: {
          month: "Month",
          week: "Week",
          day: "Day",
          today: "Today",
        },
        form: {
          addTitle: "Add Event",
          editTitle: "Edit Event",
          confirm: "Confirm",
          delete: "Delete",
          cancel: "Cancel",
        },
        event: {
          title: "Title",
          start: "Start",
          end: "End",
          allDay: "All Day",
        },
        moreEvents: "More...",
        loading: "Loading...",
      }}
    />
  );
}
