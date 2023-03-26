import React, { useState, useEffect, useRef } from "react";
// import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";
//mui===
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  Paper,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import MapSearch from "./MapSearch";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/css/App.css";
import SettingsIcon from "@mui/icons-material/Settings";
import AlarmIcon from "@mui/icons-material/Alarm";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import colorPicker from "../../assets/images/colorPicker.png";
import { SketchPicker } from "react-color";
import AlertModal from "./AlertModal";
//===

export default function DemoApp() {
  // 상태관리 변수 ===============================================================================
  const [currentEvents, setCurrentEvents] = useState([]); // 현재 모든 이벤트둘
  const [categoryList, setCategoryList] = useState([]); // 카테고리 목록
  const [currentCategory, setCurrentCategory] = useState(""); // 현재 선택된 카테고리
  const [colorPickerVisible, setColorPickerVisible] = useState([]); // 컬리픽커 보이기 토글 (수정용)
  const [addColorPickerVisible, setAddColorPickerVisible] = useState(false); // 컬리픽커 보이기 토글 (삽입용)
  const [alertEvents, setAlertEvents] = useState([]); // 알림이 설정되어 있는 이벤트들
  // [데이터 불러오기] #################################################################################

  // 카테고리 목록을 불러옴.
  useEffect(() => {
    axios
      .get("http://localhost:5000/scheduler/category")
      .then((response) => {
        setCategoryList(response.data);
        setCurrentCategory(response.data[0].value); // ok
        setColorPickerVisible(response.data.slice(1).map(() => false));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 이벤트 목록을 불러옴.
  useEffect(() => {
    axios
      .get("http://localhost:5000/scheduler")
      .then((response) => {
        // 알람이 설정된 이벤트들만 골라내기.
        const alertEvent = response.data; // 추후 filter돌릴 예정
        setAlertEvents(alertEvent);
        // 현재 카테고리와 일치하는 이벤트들만 골라내기.
        const filterdEvent = response.data.filter(
          (event) => event.color === currentCategory
        );
        if (categoryList[0] && currentCategory === categoryList[0].value) {
          setCurrentEvents(response.data);
        } else setCurrentEvents(filterdEvent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentCategory]);

  // [데이터 삽입] #################################################################################

  // 날짜 드래그 시 음영으로 선택됨.=============================================
  function handleDateSelect(selectInfo) {
    setNewEvent({
      // 선택된 기간의 시작과 끝 시간 저장
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    handleOpen(); // 새 이벤트 추가 모달 열기

    selectInfo.view.calendar.unselect(); // 선택된 기간 음영 해제
  }

  // 새 이벤트 저장 =============================================================
  function handleModalSubmit() {
    const { title, start, end, color, locale } = newEvent;
    // Send POST request to server to add new event
    // 필수 입력사항 미입력시 경고.
    if (!title && !color) {
      alert("일정 이름과 카테고리를 입력해주세요.");
      return;
    } else if (!title) {
      alert("일정 이름을 읿력해주세요.");
      return;
    } else if (!color) {
      alert("카테고리를 입력해주세요.");
      return;
    }

    // 새 이벤트 DB에 INSERT ======================================================
    axios
      .post("http://localhost:5000/scheduler/insert", {
        // (주의) id값 전송안함. DB 저장시 바로 생성
        title,
        start,
        end,
        color,
        locale,
      })
      .then((response) => {
        alert("등록성공!");
        // Add newly created event to calendar
        setCurrentEvents((currentEvents) => [
          // 성공시 UI에도 바로 반영
          ...currentEvents,
          {
            id: response.data.id,
            title: response.data.title,
            start: response.data.start,
            end: response.data.end,
            color: response.data.color,
            locale: response.data.locale,
            // allDay: false,
          },
        ]);
      })
      .catch(() => {
        alert("등록실패");
      })
      .finally(() => {
        handleClose(); // 새 이벤트 추가 모달 닫기
      });
  }
  // 중간에 나가면 데이터 지워지는 것도 잊지 말아야겠는걸?

  // [데이터 조회] #################################################################################
  // 이벤트를 클릭했을 때 동작 =================================================
  function handleEventClick(clickInfo) {
    /** 이벤트는 카테고리라는 키를 가지고 있지 않다. color라는 키에 색상코드를 저장하고 있을 뿐이다.
     * 이벤트를 클릭했을 때는 clickInfo.event.backgroundColor 로 접근하면 해당 color값을 받아올 수 있다.
     * UI 글씨를 보여주기 위해서는, 색상코드를 글씨로 파싱해주어야한다.
     */
    let parsingCategory; // 아 시바 수정요망 (색상 수정가능하니까 ㅠㅠ) 카테고리 객체에서 찾으면 될듯.
    switch (clickInfo.event.backgroundColor) {
      case "#9DC08B":
        parsingCategory = "개인";
        break;
      case "#40513B":
        parsingCategory = "직장";
        break;
      case "#609966":
        parsingCategory = "가족";
        break;
      case "#719192":
        parsingCategory = "생일 및 기념일";
        break;
      default:
        parsingCategory = "카테고리 정보 없음";
    }

    setDetailLocation({
      // 클릭한 부분의 좌표를 저장
      x: clickInfo.jsEvent.clientX,
      y: clickInfo.jsEvent.clientY,
    });

    setUpdatedEvent({
      // 클릭이벤트에서 받아온 정보들로, 동적으로 데이터 출력
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      color: clickInfo.event.backgroundColor,
      category: parsingCategory && parsingCategory,
      locale: clickInfo.event.extendedProps.locale,
    });
    handleOpenDetail(); // 이벤트 조회 모달 열기
  }

  // [데이터 수정] #################################################################################
  // 이벤트의 날짜가 수정되었을 때, 저장 =========================================
  function handleEventChange(changeInfo) {
    axios // 새 이벤트 DB에 UPDATE
      .put(`http://localhost:5000/scheduler/update/${changeInfo.event.id}`, {
        title: changeInfo.event.title,
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        color: changeInfo.event.backgroundColor,
        locale: changeInfo.event.extendedProps.locale,
      })
      .then((response) => {
        // 성공시 UI에도 바로 반영
        changeInfo.event.setDates(response.data.startStr, response.data.endStr);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 이벤트의 내용 편집 모달 열기 (연필버튼 눌리면 작동) ============================
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenDetail(false); // 조회 모달 닫기
    setOpenEdit(true); // 편집 모달 열기
  };

  // 입력되는 모든 변경사항 즉시 상태 관리 ============================================
  function handleEditChange(event) {
    // console.log(event);
    setUpdatedEvent({
      ...updatedEvent,
      [event.target.name]: event.target.value,
    });
  }

  // 변경된 이벤트 저장 ==============================================================
  function handleEditModalSubmit() {
    const { title, start, end, color, locale } = updatedEvent;
    // Send POST request to server to add new event
    // 필수 입력사항 미입력시 경고.
    if (!title && !color) {
      alert("일정 이름과 카테고리를 입력해주세요.");
      return;
    } else if (!title) {
      alert("일정 이름을 읿력해주세요.");
      return;
    } else if (!color) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    axios // 새 이벤트 DB에 UPDATE
      .put(`http://localhost:5000/scheduler/update/${updatedEvent.id}`, {
        title: title,
        start: start,
        end: end,
        color: color,
        locale: locale,
      })
      .then((response) => {
        // 성공시 UI에도 바로 반영
        setOpenEdit(false); // 일단 편집모달 닫기

        const test = currentEvents.filter(
          // 업데이트 하려하는 기존 데이터 삭제
          (item) => item.id !== parseInt(updatedEvent.id)
          // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
        );

        setCurrentEvents(() => [
          // 업데이트된 정보로 재생성
          ...test,
          {
            id: response.data.id,
            title: response.data.title,
            start: response.data.start,
            end: response.data.end,
            color: response.data.color,
            locale: response.data.locale,
            // allDay: false,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // 중간에 나가면 데이터 지워지는 것도 잊지 말아야겠는걸?

  // 편집모달 닫기
  const handleCloseEdit = () => {
    setOpenEdit(false); // 편진모달 닫기
    setUpdatedEvent({
      // 업데이트용 상태 데이터 초기화
      id: "",
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };

  // [데이터 삭제] =============================================================================

  // EDIT===============================================================================

  // 뭐지이거?
  const [calendarApi, setCalendarApi] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      setCalendarApi(calendar.getApi());
    }
  }, [calendarRef]);

  useEffect(() => {
    if (calendarApi) {
      calendarApi.on("eventChange", handleEventChange);
      return () => {
        calendarApi.off("eventChange", handleEventChange);
      };
    }
  }, [calendarApi]);

  // for modal ====
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    // focus 스타일 설정
    "&:focus": {
      border: "none",
      outline: "none",
    },
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };
  //
  // 나의 로직
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
    locale: "",
  });

  function handleChange(event) {
    // console.log(event);
    setNewEvent({ ...newEvent, [event.target.name]: event.target.value });
  }
  //

  // for detail ====
  const [detailLocation, setDetailLocation] = useState({
    x: 0,
    y: 0,
  });
  const [openDetail, setOpenDetail] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
    locale: "",
  });
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => {
    setOpenDetail(false);
    setUpdatedEvent({
      id: "",
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };
  const handleEventDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${updatedEvent.title}'`
      )
    ) {
      axios
        .delete(`http://localhost:5000/scheduler/delete/${updatedEvent.id}`)
        .then(() => {
          // Remove event from calendar

          const test = currentEvents.filter(
            (item) => item.id !== parseInt(updatedEvent.id)
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          // console.log("또 비동기냐 설마", test);
          setCurrentEvents(test);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          handleCloseDetail();
        });
    }
  };

  const handleAddCategory = () => {
    if (!categoryText) {
      alert("카테고리명을 입력해주세요.");
      return;
    }
    if (!pickedAddColor) {
      alert("색상을 선택해주세요.");
      return;
    }

    axios
      .post("http://localhost:5000/scheduler/category/insert", {
        value: pickedAddColor,
        label: categoryText,
      })
      .then((response) => {
        console.log("잠시 검문있겠슙니다", response);
        alert("등록성공!");
        // Add newly created event to calendar
        setCategoryList((prev) => [
          ...prev,
          {
            id: response.data.id,
            value: response.data.value,
            label: response.data.label,
          },
        ]);
      })
      .catch(() => {
        alert("등록실패");
      })
      .finally(() => {
        handleClose();
        setCategoryText("");
        setPickedAddColor("");
      });
  };

  //===============
  const handleDeleteCategory = (option) => {
    console.log("이건몰까", option);
    if (
      window.confirm(
        `Are you sure you want to delete the Category '${option.label}'`
      )
    ) {
      axios
        .delete(`http://localhost:5000/scheduler/category/delete/${option.id}`)
        .then(() => {
          // Remove event from calendar
          const test = categoryList.filter(
            (item) => item.id !== parseInt(option.id)
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          setCategoryList(test);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          handleCloseDetail();
        });

      const url = `http://localhost:5000/scheduler/event/color/delete/${encodeURIComponent(
        option.value
      )}`;

      axios
        .delete(url)
        .then(() => {
          // Remove event from calendar
          const test = currentEvents.filter(
            (item) => item.color !== option.value
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          setCurrentEvents(test);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          handleCloseDetail();
        });
    }
  };

  //category============================================
  const [categoryText, setCategoryText] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);

  const [tempColor, setTempColor] = useState("#fff");
  const [pickedColor, setPickedColor] = useState("");
  const [pickedAddColor, setPickedAddColor] = useState("");

  console.log("컬러드", pickedColor);
  console.log("컬러드애드", pickedAddColor);

  const updateColor = (option) => {
    axios
      .put(`http://localhost:5000/scheduler/category/update/${option.id}`, {
        value: pickedColor,
        label: option.label,
      })
      .then((response) => {
        const test = categoryList.filter(
          (item) => item.id !== parseInt(option.id)
          // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
        );
        //새로만드는 개념이므로 맨뒤로가버림. 새로 고침하면 돌아옴.
        setCategoryList(() => [
          ...test,
          {
            id: response.data.id,
            value: response.data.value,
            label: response.data.label,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });

    const url = `http://localhost:5000/scheduler/event/color/update/${encodeURIComponent(
      option.value
    )}`;
    axios
      .put(url, {
        color: pickedColor,
      })
      .then(() => {
        setCurrentEvents(
          currentEvents.map((event) => {
            if (event.color === option.value) {
              return { ...event, color: pickedColor };
            } else {
              return event;
            }
          })
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setPickedAddColor(""));
  };

  //category============================================
  return (
    <Box position='relative'>
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            height='90vh'
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              bootstrap5Plugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // locale={"ko"}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
            themeSystem='bootstrap5'
            buttonClassNames={{
              prev: "btn btn-primary",
              next: "btn btn-primary",
              today: "btn btn-primary",
              dayGridMonth: "btn btn-primary",
              dayGridWeek: "btn btn-primary",
              dayGridDay: "btn btn-primary",
            }}
            buttonText={{
              today: "TODAY",
              month: "MONTH",
              week: "WEEK",
              day: "DAY",
              list: "LIST",
            }}
            events={currentEvents}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
          />
        </div>
        {/* 이벤트 추가 모달 ========================================== */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography
              fontSize={10}
              id='modal-modal-title'
              variant='h6'
              component='h2'
              marginBottom={2}
              marginY={-0.5}
              marginLeft={0.5}
            >
              ADD EVNET
            </Typography>
            <Typography
              fontSize={25}
              id='modal-modal-title'
              variant='h6'
              component='h2'
              marginBottom={2}
              marginY={-1}
              color='primary'
            >
              일정 추가하기
            </Typography>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Title'
              name='title'
              onChange={handleChange}
              sx={{ mt: 1 }}
              error={!newEvent.title ? true : false}
              helperText={!newEvent.title ? '"Title" is required.' : "Great!"}
              required
              variant='standard'
            />
            <TextField
              id='outlined-select-currency'
              select
              label='Category'
              defaultValue='EUR'
              fullWidth
              required
              error={!newEvent.color ? true : false}
              helperText={
                !newEvent.color ? '"Category" is required.' : "Great!"
              }
              value={newEvent.color}
              name='color'
              onChange={handleChange}
              variant='standard'
            >
              {categoryList[0] ? (
                categoryList.slice(1).map((option, index) => (
                  <MenuItem key={index} value={option.value && option.value}>
                    {option.label && option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>카테고리 로딩 오류</MenuItem>
              )}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimeField
                value={newEvent.start && dayjs(newEvent.start)}
                fullWidth
                disabled
                name='start'
                label='start'
                helperText='Start time can only be modified on the calendar page.'
                variant='standard'
              />
              <DateTimeField
                value={newEvent.end && dayjs(newEvent.end)}
                fullWidth
                disabled
                name='end'
                label='end'
                helperText='End time can only be modified on the calendar page.'
                variant='standard'
              />
            </LocalizationProvider>
            <Box
              display='flex'
              alignItems='end'
              justifyContent='space-between'
              marginTop={1}
            >
              <TextField
                id='outlined-basic'
                label='Locale'
                name='locale'
                value={newEvent.locale}
                // value={newEvent.locale || ""}
                onChange={handleChange}
                variant='standard'
                sx={{ width: "230px" }}
              />
              <MapSearch setNewEvent={setNewEvent} />
            </Box>
            <Box sx={{ mt: 5 }}>
              <Button onClick={handleClose}>Close</Button>
              <Button type='submit' onClick={handleModalSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
        {/*========================================================== */}
        {/* 이벤트 보기 모달 ========================================= */}
        <Paper
          elevation={5}
          sx={
            openDetail
              ? {
                  position: "fixed",
                  top: detailLocation.y,
                  left: detailLocation.x,
                  width: "300px",
                  zIndex: 99,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "50px 10px 10px 10px",
                }
              : { display: "none" }
          }
        >
          <Box
            bgcolor={updatedEvent && updatedEvent.color}
            position='absolute'
            top={0}
            left={0}
            height='40px'
            width='100%'
            padding={1}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography color='secondary'>
              {updatedEvent.title && updatedEvent.title}
            </Typography>
            <Box color='#fff'>
              <DeleteIcon
                onClick={handleEventDelete}
                sx={{
                  marginRight: "5px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <EditIcon
                onClick={handleOpenEdit}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <CloseIcon
                onClick={handleCloseDetail}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Box>
          </Box>

          <Typography>
            시작일시 : &nbsp;
            {updatedEvent.start && updatedEvent.start.slice(0, 10)}&nbsp;&nbsp;
            {updatedEvent.start && updatedEvent.start.slice(11, 16)}
          </Typography>
          <Typography>
            종료일시 : &nbsp;
            {updatedEvent.end && updatedEvent.end.slice(0, 10)}&nbsp;&nbsp;
            {updatedEvent.end && updatedEvent.end.slice(11, 16)}
          </Typography>
          <Typography>
            카테고리 : &nbsp;
            {updatedEvent.category && updatedEvent.category}
          </Typography>
          <Typography>
            장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 : &nbsp;
            {updatedEvent.locale ? updatedEvent.locale : "장소 정보 없음"}
          </Typography>
        </Paper>
        {/*========================================================== */}
        {/* 이벤트 수정 모달 ========================================== */}
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography
              fontSize={10}
              id='modal-modal-title'
              variant='h6'
              component='h2'
              marginBottom={2}
              marginY={-0.5}
              marginLeft={0.5}
            >
              EDIT EVNET
            </Typography>
            <Typography
              fontSize={25}
              id='modal-modal-title'
              variant='h6'
              component='h2'
              marginBottom={2}
              marginY={-1}
              color='primary'
            >
              일정 수정하기
            </Typography>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Title'
              name='title'
              onChange={handleEditChange}
              sx={{ mt: 1 }}
              error={!updatedEvent.title ? true : false}
              helperText={
                !updatedEvent.title ? '"Title" is required.' : "Great!"
              }
              required
              variant='standard'
              value={updatedEvent.title && updatedEvent.title}
            />
            <TextField
              id='outlined-select-currency'
              select
              label='Category'
              defaultValue='EUR'
              fullWidth
              required
              error={!updatedEvent.color ? true : false} // 불안
              helperText={
                !newEvent.color ? '"Category" is required.' : "Great!"
              }
              name='color'
              onChange={handleEditChange}
              variant='standard'
              value={updatedEvent.color && updatedEvent.color} // 불안
            >
              {categoryList[0] ? (
                categoryList.slice(1).map((option, index) => (
                  <MenuItem key={index} value={option.value && option.value}>
                    {option.label && option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>카테고리 로딩 오류</MenuItem>
              )}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimeField
                value={updatedEvent.start && dayjs(updatedEvent.start)}
                name='start'
                fullWidth
                disabled
                label='start'
                helperText='Start time can only be modified on the calendar page.'
                variant='standard'
              />
              <DateTimeField
                value={updatedEvent.end && dayjs(updatedEvent.end)}
                name='end'
                fullWidth
                disabled
                label='end'
                helperText='End time can only be modified on the calendar page.'
                variant='standard'
              />
            </LocalizationProvider>
            <Box
              display='flex'
              alignItems='end'
              justifyContent='space-between'
              marginTop={1}
            >
              <TextField
                id='outlined-basic'
                label='Locale'
                name='locale'
                value={updatedEvent.locale && updatedEvent.locale}
                // value={newEvent.locale || ""}
                onChange={handleEditChange}
                variant='standard'
                sx={{ width: "230px" }}
              />
              <MapSearch setNewEvent={setUpdatedEvent} />
            </Box>
            <Box sx={{ mt: 5 }}>
              <Button onClick={handleCloseEdit}>Close</Button>
              <Button type='submit' onClick={handleEditModalSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
        {/*========================================================== */}
        {/* 카테고리 선택 및 추가,제거================================= */}
        <Box
          position='absolute'
          top={0}
          left='183px'
          display='flex'
          alignItems='center'
        >
          <TextField
            id='outlined-select-currency'
            select
            label='Category'
            defaultValue='EUR'
            fullWidth
            required
            // helperText={!newEvent.color ? '"Category" is required.' : "Great!"}
            name='color'
            onChange={(e) => setCurrentCategory(e.target.value)}
            // variant='standard'
            variant='outlined'
            size='small'
            value={currentCategory && currentCategory} // 필요 없는듯,..?
            sx={{ width: "200px" }}
          >
            {categoryList[0] ? (
              categoryList.map((option, index) => (
                <MenuItem key={index} value={option.value && option.value}>
                  <Box display='flex' alignItems='center'>
                    <Paper
                      sx={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: option.value && option.value,
                      }}
                    ></Paper>
                    <Typography>
                      &nbsp;&nbsp;{option.label && option.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem>카테고리 로딩 오류</MenuItem>
            )}
          </TextField>
          <SettingsIcon
            onClick={handleOpenCategory}
            sx={{
              marginLeft: "10px",
              cursor: "pointer",
              "&:hover": {
                transform: "rotate(20deg)",
                // outline: "none",
              },
            }}
          />
          {/* //========= */}
          <Modal
            open={openCategory}
            onClose={handleCloseCategory}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Box display='flex' justifyContent='space-between'>
                <Box>
                  <Typography
                    fontSize={10}
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    marginBottom={2}
                    marginY={-0.5}
                    marginLeft={0.5}
                  >
                    EDIT CATEGORY
                  </Typography>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    color='primary'
                    fontWeight={700}
                  >
                    카테고리 편집
                  </Typography>
                </Box>
                <CloseIcon
                  onClick={handleCloseCategory}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.1)",
                      // outline: "none",
                    },
                  }}
                />
              </Box>
              <Box
                display='flex'
                alignItems='center'
                color='#D10505'
                marginBottom={2}
              >
                <WarningAmberIcon fontSize='12px' />
                <Typography fontSize='12px'>
                  &nbsp;카테고리를 삭제 시, 포함된 이벤트들도 일괄 삭제됩니다.
                </Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                gap={2}
                width='95%'
                margin='auto'
              >
                {categoryList[0] &&
                  categoryList.slice(1).map((option, index) => (
                    <Box key={index} value={option.value && option.value}>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Paper
                          sx={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: option.value && option.value,
                          }}
                        ></Paper>
                        <Typography sx={{ flex: 1 }}>
                          &nbsp;&nbsp;{option.label && option.label}
                        </Typography>
                        <Box
                          position='relative'
                          display='flex'
                          alignItems='center'
                        >
                          <Avatar
                            alt='colorPicker'
                            src={colorPicker}
                            sx={{
                              height: "20px",
                              width: "20px",
                              cursor: "pointer",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                              // position: "absolute",
                              top: "0",
                              left: "0",
                            }}
                            onClick={() => {
                              const newVisible = [...colorPickerVisible];
                              newVisible[index] = !newVisible[index];
                              setColorPickerVisible(newVisible);
                            }}
                          />
                          <Box
                            className={
                              colorPickerVisible[index]
                                ? "colorPickerVisible"
                                : "colorPickerInvisible"
                            }
                          >
                            <CloseIcon
                              sx={{
                                position: "absolute",
                                right: "0",
                                top: "-30px",
                                cursor: "pointer",
                                "&:hover": {
                                  transform: "scale(1.2)",
                                  // outline: "none",
                                },
                              }}
                              onClick={() => {
                                const newVisible = [...colorPickerVisible];
                                newVisible[index] = !newVisible[index];
                                setColorPickerVisible(newVisible);
                                setPickedColor("");
                              }}
                            />
                            <SketchPicker
                              color={tempColor}
                              onChange={(e) => setTempColor(e.hex)}
                              onChangeComplete={(e) => setPickedColor(e.hex)}
                            />
                            <Paper
                              sx={{
                                position: "absolute",
                                bottom: "-40px",
                                right: 0,
                                width: "60px",
                                borderRadius: "20px",
                                textAlign: "center",
                                fontSize: "12px",
                                backgroundColor: "#07553B",
                                color: "#fff",
                                padding: "5px 10px",
                                cursor: "pointer",
                                "&:hover": {
                                  filter: "brightness(0.8)",
                                  // outline: "none",
                                },
                              }}
                              onClick={() => {
                                // console.log("컬아뒤", option);
                                updateColor(option);
                                const newVisible = [...colorPickerVisible];
                                newVisible[index] = !newVisible[index];
                                setColorPickerVisible(newVisible);
                              }}
                            >
                              확인
                            </Paper>
                          </Box>
                          <DeleteIcon
                            sx={{
                              color: "#5A5353",
                              marginLeft: "10px",
                              cursor: "pointer",
                              "&:hover": {
                                transform: "scale(1.2)",
                                // outline: "none",
                              },
                            }}
                            onClick={() => handleDeleteCategory(option)}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Box display='flex' alignItems='center' marginTop={2} gap={2}>
                <AddIcon marginRight='10px' color='#5A5353' />
                <Box>
                  <Paper
                    sx={{
                      width: "10px",
                      height: "10px",
                      // backgroundColor: "red",
                      backgroundColor: pickedAddColor ? pickedAddColor : "#fff",
                    }}
                  ></Paper>
                </Box>
                <TextField
                  fullWidth
                  variant='standard'
                  label='Category Name'
                  value={categoryText}
                  onChange={(e) => setCategoryText(e.target.value)}
                  size='small'
                  sx={{ marginBottom: "10px" }}
                ></TextField>
                {/* //===================================== */}
                <Box position='relative'>
                  <Avatar
                    alt='colorPicker'
                    src={colorPicker}
                    sx={{
                      height: "20px",
                      width: "20px",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                      // position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                    onClick={() => {
                      setAddColorPickerVisible((prev) => !prev);
                      setPickedAddColor("");
                    }}
                  />
                  <Box
                    className={
                      addColorPickerVisible
                        ? "colorPickerVisible"
                        : "colorPickerInvisible"
                    }
                  >
                    <CloseIcon
                      sx={{
                        position: "absolute",
                        right: "0",
                        top: "-30px",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.2)",
                          // outline: "none",
                        },
                      }}
                      onClick={() => {
                        setAddColorPickerVisible((prev) => !prev);
                        setPickedAddColor("");
                      }}
                    />
                    <SketchPicker
                      color={tempColor}
                      onChange={(e) => setTempColor(e.hex)}
                      onChangeComplete={(e) => setPickedAddColor(e.hex)}
                    />
                    <Paper
                      sx={{
                        position: "absolute",
                        bottom: "-40px",
                        right: 0,
                        width: "60px",
                        borderRadius: "20px",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#07553B",
                        color: "#fff",
                        padding: "5px 10px",
                        cursor: "pointer",
                        "&:hover": {
                          filter: "brightness(0.8)",
                          // outline: "none",
                        },
                      }}
                      onClick={() => {
                        setAddColorPickerVisible(false);
                      }}
                    >
                      확인
                    </Paper>
                  </Box>
                </Box>
                {/* //===================================== */}
                <Button variant='contained' onClick={handleAddCategory}>
                  추가
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        {/*========================================================== */}
      </div>
      <AlertModal alertEvents={alertEvents} />
    </Box>
  );
}
