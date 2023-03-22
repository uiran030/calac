import React, { useState, useEffect, useRef } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import MapSearch from "./MapSearch";
//===

export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/scheduler")
      .then((response) => {
        setCurrentEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    setNewEvent({
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    handleOpen();
    // let title = prompt("Please enter a new title for your event");
    selectInfo.view.calendar.unselect(); // clear date selection

    // if (title) {
    //   // Send POST request to server to add new event
    //   axios
    //     .post("http://localhost:5000/scheduler/insert", {
    //       title,
    //       start: selectInfo.startStr,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       alert("등록성공!");
    //       // Add newly created event to calendar
    //       calendarApi.addEvent({
    //         id: response.data.id,
    //         title,
    //         start: response.data.start,
    //         end: response.data.end,
    //         allDay: response.data.allDay,
    //       });
    //     })
    //     .catch(() => {
    //       alert("등록실패");
    //     });
    // }
  }

  function handleEventClick(clickInfo) {
    console.log(clickInfo);
    let parsingCategory;
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
        parsingCategory = "카테고리가 없습니다.";
    }
    console.log("파싱맨", parsingCategory);
    {
      /* <MenuItem value={"#9DC08B"}>개인</MenuItem>
              <MenuItem value={"#40513B"}>직장</MenuItem>
              <MenuItem value={"#609966"}>가족</MenuItem>
              <MenuItem value={"#719192"}>생일 및 기념일</MenuItem> */
    }

    setDetailLocation({
      x: clickInfo.jsEvent.clientX,
      y: clickInfo.jsEvent.clientY,
    });
    setUpdatedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      color: clickInfo.event.backgroundColor,
      category: parsingCategory && parsingCategory,
      locale: clickInfo.event.extendedProps.locale,
    });
    handleOpenDetail();
  }

  function handleModalSubmit() {
    setOpen(false);
    const { title, start, end, color, locale } = newEvent;
    // Send POST request to server to add new event
    axios
      .post("http://localhost:5000/scheduler/insert", {
        title,
        start,
        end,
        color,
        locale,
        // allDay: false,
      })
      .then((response) => {
        console.log("잠시 검문있겠슙니다", response.data);
        alert("등록성공!");
        // Add newly created event to calendar
        setCurrentEvents((currentEvents) => [
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
        setNewEvent({
          title: "",
          start: "",
          end: "",
          color: "",
          locale: "",
        });
      });
  }
  // 중간에 나가면 데이터 지워지는 것도 잊지 말아야겠는걸?

  console.log("id가 비어있을 것이다.", currentEvents);

  // 추가하자마자 수정했을 때, DB에 저장은 안되는 버그 있음.
  const [calendarApi, setCalendarApi] = useState(null);
  const calendarRef = useRef(null);

  function handleEventChange(changeInfo) {
    console.log(changeInfo);
    // axios
    //   .put(`http://localhost:5000/scheduler/edit/${changeInfo.event.id}`, {
    //     title: "아직 미구현1",
    //     start: changeInfo.event.startStr,
    //     end: changeInfo.event.endStr,
    //     color: "이직 미구현3",
    //     locale: "아직 미구현2",
    //     // allDay: changeInfo.event.allDay,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     changeInfo.event.setDates(response.data.start, response.data.end);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

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

  function handleEvents(events) {
    // setCurrentEvents(events);
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  // for modal ====
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
      title: "",
      start: "",
      end: "",
      color: "",
      locale: "",
    });
  };
  const handleEventDelete = () => {
    console.log("니가 삭제하게될 아이디다!!", updatedEvent.id);
    if (
      window.confirm(
        `Are you sure you want to delete the event '${updatedEvent.title}'`
      )
    ) {
      // let calendarApi = clickInfo.view.calendar;

      // Send DELETE request to server to remove event
      axios
        .delete(`http://localhost:5000/scheduler/delete/${updatedEvent.id}`)
        .then(() => {
          // Remove event from calendar

          const test = currentEvents.filter(
            (item) => item.id !== parseInt(updatedEvent.id)
            // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
          );
          console.log("또 비동기냐 설마", test);
          setCurrentEvents(test);
          // setCurrentEvents((currentEvents) => [
          //   ...currentEvents,
          //   {
          //     id: response.data.id,
          //     title: response.data.title,
          //     start: response.data.start,
          //     end: response.data.end,
          //     color: response.data.color,
          //     locale: response.data.locale,
          //     allDay: false,
          //   },
          // ]);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setUpdatedEvent({
            title: "",
            start: "",
            end: "",
            color: "",
            locale: "",
          });
        });
    }
  };
  // for

  console.log(newEvent);

  return (
    <div className='demo-app'>
      {/* <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div> */}
      <div className='demo-app-main'>
        <FullCalendar
          height='90vh'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
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
            fontSize={30}
            id='modal-modal-title'
            variant='h6'
            component='h2'
            marginBottom={2}
          >
            ADD EVENT
          </Typography>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Title
          </Typography>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Title'
            variant='outlined'
            name='title'
            onChange={handleChange}
            sx={{ mt: 1 }}
          />
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Category
          </Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id='demo-multiple-name-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              // input={<OutlinedInput label='category' />} ? 넌 뭐냐그럼
              value={newEvent.color}
              label='Category'
              name='color'
              onChange={handleChange}
            >
              <MenuItem value={"#9DC08B"}>개인</MenuItem>
              <MenuItem value={"#40513B"}>직장</MenuItem>
              <MenuItem value={"#609966"}>가족</MenuItem>
              <MenuItem value={"#719192"}>생일 및 기념일</MenuItem>
            </Select>
          </FormControl>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2, fontSize: "21px" }}
          >
            Start
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              value={newEvent.start && dayjs(newEvent.start)}
              fullWidth
              disabled
            />
            <Typography
              id='modal-modal-description'
              sx={{ mt: 2, fontSize: "21px" }}
            >
              End
            </Typography>
            <DateTimeField
              value={newEvent.end && dayjs(newEvent.end)}
              fullWidth
              disabled
            />
          </LocalizationProvider>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ mt: 2 }}
          >
            Locale
          </Typography>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            marginTop={1}
          >
            <TextField
              id='outlined-basic'
              label='Locale'
              variant='outlined'
              name='locale'
              onChange={handleChange}
            />
            <MapSearch />
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
      {/* 이벤트 추가 모달 ========================================= */}
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
          <Typography>
            일정 이름 : {updatedEvent.title && updatedEvent.title}
          </Typography>
          <Box>
            <DeleteIcon onClick={handleEventDelete} id='ttt' />
            <EditIcon />
            <CloseIcon onClick={handleCloseDetail} />
          </Box>
        </Box>

        <Typography>
          시작일:
          {updatedEvent.start && updatedEvent.start.toLocaleString("ko-KR")}
        </Typography>
        <Typography>
          종료일:
          {updatedEvent.end && updatedEvent.end.toLocaleString("ko-KR")}
        </Typography>
        <Typography>
          카테고리:
          {updatedEvent.category && updatedEvent.category}
        </Typography>
        <Typography>
          장소:
          {updatedEvent.locale && updatedEvent.locale}
        </Typography>
      </Paper>
      {/*========================================================== */}
    </div>
  );
}
