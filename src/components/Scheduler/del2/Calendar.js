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

  // const [doSubmit, setDoSubmit] = useState(false);
  // const handleSubmit = () => {
  //   setDoSubmit(true);
  //   setOpen(false);
  // };
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
  const [result, setResult] = useState({});
  const [save, setSave] = useState(false);
  // /여기부터 살려요
  const handleDateSelect = (selectInfo) => {
    setOpen(true);
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    console.log("중간점검", data);

    if (!save) {
      // result 변수가 모두 존재할 때만 이벤트를 추가합니다
      calendarApi.addEvent({
        id: createEventId(),
        title: result.title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        color: result.color || "red", // color와 locale은 기본값으로 설정됩니다
        locale: result.locale || "en",
      });
    }
  };
  // 여기까지 살려요

  // const handleDateSelect = async (selectInfo) => {
  //   setOpen(true);
  //   await setData((prevData) => ({
  //     ...prevData,
  //     title: "",
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //   }));

  //   let test = "간나쉑";
  //   let calendarApi = selectInfo.view.calendar;
  //   calendarApi.unselect(); // clear date selection

  //   console.log("중간점검", data);

  //   if (test) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title: test,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       color: "red",
  //     });
  //   }
  // };
  // useEffect(() => {}, [data]);

  // //지피티====
  // const handleDateSelect = async (selectInfo) => {
  //   setOpen(true);
  //   setData((prevData) => ({
  //     ...prevData,
  //     title: "",
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //   }));

  //   console.log({
  //     ...data,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //   });
  // };
  // //====

  // 여기도!!
  // const handleEventClick = (event) => {
  //   setDetailLocation({
  //     x: event.jsEvent.clientX,
  //     y: event.jsEvent.clientY,
  //   });
  //   setOpenDetail((prev) => !prev);

  //   setData(
  //     mock.filter((item) => item.id === parseInt(event.event._def.publicId))
  //   );

  // console.log(mock.filter((item) => item.id === data.id));
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

  //   setData(
  //     mock.filter((item) => item.id === parseInt(event.event._def.publicId))
  //   );

  // console.log(mock.filter((item) => item.id === data.id));
  // };

  const [openDetail, setOpenDetail] = useState(false);
  const [detailLocation, setDetailLocation] = useState({
    x: 0,
    y: 0,
  });
  // const [data, setData] = useState({
  //   id: "",
  //   title: "",
  //   start: "",
  //   end: "",
  //   // color: "",
  // });

  const handleEventClick = (clickInfo) => {
    console.log("hi", clickInfo);
    setDetailLocation({
      x: clickInfo.jsEvent.clientX,
      y: clickInfo.jsEvent.clientY,
    });
    setOpenDetail((prev) => !prev);

    setData(
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
        `Are you sure you want to delete the event '${data.event.title}'`
      )
    ) {
      axiosDelete(parseInt(data.event.id));
      data.event.remove();
      setOpenDetail((prev) => !prev);
    }
  };

  // console.log("?", data);

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

  // console.log("나좀보세", data);

  const [formData, setFormData] = useState({
    title: "",
    color: "",
    locale: "",
  });

  console.log("진행과정", formData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // form 데이터를 변수에 담는다
    const { title, color, locale } = formData;
    console.log(`title: ${title}, color: ${color}, locale: ${locale}`);
    // 결과를 result 변수에 저장한다
    setResult({
      title: title,
      color: color,
      locale: locale,
    });
    setSave(true);
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
          bgcolor={data && data.color}
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
          <Typography>일정 이름 : {data.event && data.event.title}</Typography>
          <Box>
            <DeleteIcon onClick={handleDelete} />
            <EditIcon />
            <CloseIcon onClick={() => setOpenDetail((prev) => !prev)} />
          </Box>
        </Box>

        <Typography>
          시작일:
          {data.event && data.event.start.toLocaleString("ko-KR")}
        </Typography>
        <Typography>
          종료일:
          {data.event && data.event.end.toLocaleString("ko-KR")}
        </Typography>
        <Typography>
          카테고리:
          {data.event && data.color}
        </Typography>
      </Paper>
      <React.Fragment>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='child-modal-title'
          aria-describedby='child-modal-description'
        >
          <form onSubmit={handleSubmit}>
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
                  name='title'
                  value={formData.title}
                  variant='outlined'
                  onChange={handleChange}
                />
                <Typography color='primary'>색상</Typography>
                <TextField
                  id='outlined-basic'
                  color='primary'
                  label='color'
                  name='color'
                  value={formData.color}
                  variant='outlined'
                  onChange={handleChange}
                />
                <Typography color='primary'>장소</Typography>
                <TextField
                  id='outlined-basic'
                  color='primary'
                  label='locale'
                  name='locale'
                  value={formData.locale}
                  variant='outlined'
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Button onClick={handleClose}>Close</Button>
                <Button type='submit' onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default Calendar;
