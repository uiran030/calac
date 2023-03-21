import React, { useState, useEffect, useRef } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import axios from "axios";

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
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // Send POST request to server to add new event
      axios
        .post("http://localhost:5000/scheduler/insert", {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        })
        .then((response) => {
          console.log(response);
          alert("등록성공!");
          // Add newly created event to calendar
          calendarApi.addEvent({
            id: response.data.id,
            title,
            start: response.data.start,
            end: response.data.end,
            allDay: response.data.allDay,
          });
        })
        .catch(() => {
          alert("등록실패");
        });
    }
  }

  function handleEventClick(clickInfo) {
    // console.log("일단확인", clickInfo.event.id);
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      let calendarApi = clickInfo.view.calendar;

      // Send DELETE request to server to remove event
      axios
        .delete(`http://localhost:5000/scheduler/delete/${clickInfo.event.id}`)
        .then(() => {
          // Remove event from calendar
          clickInfo.event.remove();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // function handleEventChange(changeInfo) {
  //   // let calendarApi = changeInfo.view.calendar;
  //   console.log("일단확인", changeInfo.event.id); // 문자열의 id를 출력하네
  //   console.log("다음확인", changeInfo);
  //   // Send PUT request to server to update event
  //   axios
  //     .put(`http://localhost:5000/scheduler/edit/${changeInfo.event.id}`, {
  //       title: changeInfo.event.title,
  //       start: changeInfo.event.startStr,
  //       end: changeInfo.event.endStr,
  //       allDay: changeInfo.event.allDay,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       // Update event in calendar
  //       changeInfo.event.setDates(response.data.start, response.data.end);
  //       // calendarApi
  //       //   .getEventById(response.data.id)
  //       //   .setDates(response.data.start, response.data.end);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // 추가하자마자 수정했을 때, DB에 저장은 안되는 버그 있음.
  const [calendarApi, setCalendarApi] = useState(null);
  const calendarRef = useRef(null);

  function handleEventChange(changeInfo) {
    axios
      .put(`http://localhost:5000/scheduler/edit/${changeInfo.event.id}`, {
        title: changeInfo.event.title,
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        allDay: changeInfo.event.allDay,
      })
      .then((response) => {
        console.log(response);
        changeInfo.event.setDates(response.data.start, response.data.end);
      })
      .catch((error) => {
        console.error(error);
      });
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
    </div>
  );
}
