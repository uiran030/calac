import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Details } from "@mui/icons-material";

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
  // const [mock, setMock] = useState(EVENTSTEST);

  const [doSubmit, setDoSubmit] = useState(false);
  const handleSubmit = () => {
    setDoSubmit(true);
    setOpen(false);
  };
  //========

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
  const [data, setData] = useState({ title: "", start: "", end: "" });

  const handleDateSelect = (selectInfo) => {
    setOpen(true);
    setData({ title: "", start: selectInfo.startStr, end: selectInfo.endStr });
    // let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (data.title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: data.title,
        start: data.start,
        end: data.end,
        // allDay: selectInfo.allDay,
      });
    }
    // setDoSubmit(false);
  };

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
  const [updatedData, setUpdatedData] = useState([]);

  const [originData, setOriginData] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/scheduler").then((res) => {
      // console.log("res", res.data);
      setOriginData(res.data);
    });
  }, []);

  let already = []; // 삭제금지 handleEvents 함수에서 사용한다. 좋은 방식은 아닌듯 하다
  // 이벤트의 변경이 감지될 때마다 실행되는 함수.
  // events 인자는 모든 이벤트의 정보를 JSON형식으로 뱉어냄.
  const handleEvents = async (events) => {
    console.log("origin", originData); // DB에서 받아온 데이터
    console.log("event", events); // 변경사항이 적용된 데이터

    // DB에서 받아온 데이터를 생성날짜를 삭제한 형태로 파싱한 데이터
    let parsingOrigin =
      originData &&
      originData
        .map((item) => ({
          id: String(item.id),
          title: item.title,
          start: item.start,
          end: item.end,
        }))
        .sort();

    console.log("here", parsingOrigin);

    // EventImpl객체의 나열로 뱉어지는 events 데이터를 필요한 정보만 골라 파싱
    let parsingEvents =
      events &&
      events
        .map((item) => ({
          id: item.id,
          title: item.title,
          start: item.start.toISOString(),
          end: item.end.toISOString(),
        }))
        .sort();

    console.log("here2", parsingEvents);

    // 여기까지 수정할 것 없음

    /////////////////
    // console.log(JSON.stringify(parsingOrigin) === JSON.stringify(parsingEvents));
    ///////////////////

    //할 수 있어

    /**
     * 이벤트는 추가되거나, 삭제되거나, 변경되거나 한다.
     * origin의 개수 보다 events의 개수가 많다면 => 추가된 것이고,
     * origin의 개수 보다 events의 개수가 적다면 => 삭제된 것이고,
     * origin의 개수 보다 events의 개수가 같다면 => 어떤 이벤트의 내용이 수정되었거나, 네비게이션을 이동했을 것이다.
     */

    // origin 요소들의 id값만 모든 배열
    let originIdList = parsingOrigin && parsingOrigin.map((item) => item.id);

    // event 요소들의 id값만 모든 배열
    let eventsIdList = parsingEvents.map((item) => item.id);

    // 이벤트 추가가 감지된 경우
    if (parsingOrigin && parsingOrigin.length < parsingEvents.length) {
      // console.log("추가됐을겨");
      let addedEventId = eventsIdList.filter(
        (item) => !originIdList.includes(item)
      );
      // console.log("추가된 모든 놈 아이디", addedEventId);
      // console.log("already1", already);
      let newDataId = addedEventId.filter((a) => {
        return already.indexOf(a) === -1;
      });
      console.log("최종", newDataId);
      newDataId.map((i) => already.push(i));
      // console.log("already2", already);

      // console.log("test", parsingEvents.id === "3");
      // console.log(parsingEvents);
      console.log(newDataId);
      let newEventIndex = parsingEvents.findIndex((item) => {
        return item.id === newDataId[0];
      });
      // console.log("findIndex", newDataIndex);
      // console.log(parsingEvents[newDataIndex]);
      // axiosInsert(parsingEvents[newEventIndex]); /////핵심핵심핵심.

      // console.log(parsingEvents[parsingEvents.findIndex(addedEventId)]);
      // originIdList = eventsIdList;

      // 이벤트 삭제가 감지된 경우
    } else if (parsingOrigin && parsingOrigin.length > parsingEvents.length) {
      // // console.log("삭제됐을겨");
      // // console.log(
      // //   "삭제된 놈 아이디",
      // //   originIdList.filter((item) => !eventsIdList.includes(item))
      // // );
      // let deletedEventId = originIdList.filter(
      //   (item) => !eventsIdList.includes(item)
      // );
      // // console.log(parseInt(deletedEventId));
      // axiosDelete(parseInt(deletedEventId));
      // 이벤트 수정이 감지된 경우
    } else {
      console.log("변함없거나 수정됐을겨");
      console.log(
        "하이"
        // origin.filter((i) => parsingOrigin.map((item) => item.id === i))
      );
    }

    // console.log(
    //     "re",
    //     events.filter(
    //       (item) => !originData.map((i) => i.id).includes(parseInt(item.id))
    //     )
    //   );

    // if (result.length > 0) {
    // await axios
    //   .post("http://localhost:5000/scheduler/insert", {
    //     event: parsingEvents,
    //   })
    //   .then(() => {
    //     alert("등록성공!");
    //   })
    //   .catch(() => {
    //     alert("등록실패");
    //   });
    // } else {
    // await axios
    //   .post("http://localhost:5000/scheduler/edit", {
    //     event: parsingEvents,
    //   })
    //   .then(() => {
    //     alert("수정성공!");
    //   })
    //   .catch(() => {
    //     alert("수정실패");
    //   });
    // }
    // /======

    // /======

    // /======
  };

  const axiosInsert = (newData) => {
    axios
      .post("http://localhost:5000/scheduler/insert", {
        event: newData,
      })
      .then(() => {
        alert("등록성공!");
      })
      .catch(() => {
        alert("등록실패");
      });
  };

  const axiosDelete = (deletedEventId) => {
    axios
      .post("http://localhost:5000/scheduler/delete", {
        deletedEventId: deletedEventId,
      })
      .then(() => {
        alert("삭제성공!");
      })
      .catch(() => {
        alert("삭제실패");
      });
  };

  // console.log("updated", updatedData);

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
    // color: "",
  });

  const handleEventClick = (clickInfo) => {
    console.log("hi", clickInfo);
    setDetailLocation({
      x: clickInfo.jsEvent.clientX,
      y: clickInfo.jsEvent.clientY,
    });
    setOpenDetail((prev) => !prev);

    setDetailContents(
      clickInfo /* {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start.toLocaleString("ko-KR"),
      end: clickInfo.event.end.toLocaleString("ko-KR"),
    } */
    );

    // let deletedEventId = clickInfo.event.id;
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   axiosDelete(parseInt(deletedEventId));
    //   clickInfo.event.remove();
    // }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${detailContents.event.title}'`
      )
    ) {
      axiosDelete(parseInt(detailContents.event.id));
      detailContents.event.remove();
      setOpenDetail((prev) => !prev);
    }
  };

  console.log("?", detailContents);

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
    // console.log("here", event);
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

  // console.log("나좀보세", detailContents);

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
        events={originData}
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        // below different
        dateClick={handleDateClick}
        //  you can update a remote database when these fire:
        // eventAdd={console.log("add")}
        // eventChange={console.log("change")}
        // eventRemove={console.log("remove")}
      />

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
          bgcolor={detailContents && detailContents.color}
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
            일정 이름 : {detailContents.event && detailContents.event.title}
          </Typography>
          <Box>
            <DeleteIcon onClick={handleDelete} />
            <EditIcon />
            <CloseIcon onClick={() => setOpenDetail((prev) => !prev)} />
          </Box>
        </Box>

        <Typography>
          시작일:
          {detailContents.event &&
            detailContents.event.start.toLocaleString("ko-KR")}
        </Typography>
        <Typography>
          종료일:
          {detailContents.event &&
            detailContents.event.end.toLocaleString("ko-KR")}
        </Typography>
        <Typography>
          카테고리:
          {detailContents.event && detailContents.color}
        </Typography>
      </Paper>
      <React.Fragment>
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
      </React.Fragment>
    </div>
  );
}

export default Calendar;
