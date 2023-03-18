import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { EVENTSTEST } from "./EVENTSTEST";
import { createEventId } from "./event-utils";

function Calendar() {
  //========
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    outline: "none",
  };
  //========
  const [mock, setMock] = useState(EVENTSTEST);

  const handleSubmit = () => {
    setMock([
      ...mock,
      { id: 4, start: data.start, end: data.end, title: data.title },
    ]);
    // setData({ id: 4, start: "", end: "", title: "" });
  };

  //========

  const [openDetail, setOpenDetail] = useState(false);
  const [detailLocation, setDetailLocation] = useState({
    x: 0,
    y: 0,
  });
  const [detailContents, setDetailContents] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
  });

  // 여기도!!
  // const handleEventClick = (event) => {
  //   setDetailLocation({
  //     x: event.jsEvent.clientX,
  //     y: event.jsEvent.clientY,
  //   });
  //   setOpenDetail((prev) => !prev);

  //   setDetailContents(
  //     mock.filter((item) => item.id === parseInt(event.event._def.publicId))
  //   );

  // console.log(mock.filter((item) => item.id === detailContents.id));
  // };

  // const handleEventClick = (clickInfo) => {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // };

  const [data, setData] = useState({ start: "", end: "", title: "" });
  // const [modalOn, setModalOn] = useState(false);

  //========
  const state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  const handleDateClick = (info) => {
    // bind with an arrow function
    // alert(arg.dateStr);
    // alert("Clicked on: " + info.dateStr);
    // alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
    // alert("Current view: " + info.view.type);
    // change the day's background color just for fun
    // info.dayEl.style.backgroundColor = "red";
  };

  // 여기에요!!!
  // const handleDateSelect = (info) => {
  //   setOpen(true);
  //   // alert("selected " + info.startStr + " to " + info.endStr);
  //   setData((prev) => ({
  //     ...prev,
  //     start: info.startStr,
  //     end: info.endStr,
  //     allDay: selectInfo.allDay,
  //   }));
  // };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
    console.log(calendarApi.getEvents());
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
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
  };

  return (
    <div>
      <Fullcalendar
        height={"90vh"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        initialView={"dayGridMonth"}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={state.weekendsVisible}
        events={EVENTSTEST}
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        // eventClick={handleEventClick}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        // below different
        dateClick={handleDateClick}
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
      {/* <Paper
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
          bgcolor={detailContents[0] && detailContents[0].color}
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
            일정 이름 : {detailContents[0] && detailContents[0].title}
          </Typography>
          <Box>
            <DeleteIcon />
            <EditIcon />
            <CloseIcon onClick={() => setOpenDetail((prev) => !prev)} />
          </Box>
        </Box>

        <Typography>
          시작일:{detailContents[0] && detailContents[0].start}
        </Typography>
        <Typography>
          종료일:{detailContents[0] && detailContents[0].end}
        </Typography>
        <Typography>
          카테고리:
          {detailContents[0] && detailContents[0].color}
        </Typography>
      </Paper> */}
      {/* <React.Fragment>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='child-modal-title'
          aria-describedby='child-modal-description'
        >
          <Box
            sx={{ ...style, width: 500 }}
            display='flex'
            flexDirection='column'
            gap={3}
          >
            <Typography color='primary' fontSize={30}>
              일정 추가
            </Typography>
            <Box display='flex' flexDirection='column' gap={2}>
              <Typography color='primary'>선택한 날짜 및 시간</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label='Start Date&Time'
                  disabled
                  value={data && data.start && dayjs(data.start)}
                  // onChange={handleChange}
                  // renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label='End Date&Time'
                  disabled
                  value={data && data.end && dayjs(data.end)}
                  // onChange={handleChange}
                  // renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box display='flex' flexDirection='column' gap={2}>
              <Typography color='primary'>일정 제목 입력</Typography>
              <TextField
                id='outlined-basic'
                color='primary'
                label='title'
                variant='outlined'
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </Box>
            <Box>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>
        </Modal>
      </React.Fragment> */}
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({state.currentEvents.length})</h2>
        <ul>{state.currentEvents.map(renderSidebarEvent)}</ul>
      </div>
    </div>
  );
}

export default Calendar;
