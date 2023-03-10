import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import {
  EventActions,
  ProcessedEvent,
  ViewEvent,
} from "@aldabil/react-scheduler/types";
import axios from "axios";

export default function ReactScheduler({ categoryFilter, btnActive }) {
  const fetch = axios.get("http://localhost:5000/scheduler").then((res) => {
    const processedData = res.data.map((item) => ({
      ...item,
      start: new Date(item.start),
      end: new Date(item.end),
    }));
    return processedData;
  });

  const [eventData, setEventData] = useState(fetch);

  console.log(eventData);

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    /**Simulate fetchin remote data */

    return new Promise((res) => {
      setTimeout(() => {
        eventData && res(eventData);
      }, 3000);
    });
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    console.log("handleConfirm =", action, event.title);

    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
        ///======
        axios
          .post("http://localhost:5000/scheduler/edit", {
            event: event,
          })
          .then(() => {
            alert("등록성공!");
            console.log(event);
          })
          .catch(() => {
            alert("등록실패");
          });
        ///======
      } else if (action === "create") {
        /**POST event to remote DB */
        ///======
        axios
          .post("http://localhost:5000/scheduler/insert", {
            event: event,
          })
          .then(() => {
            alert("등록성공!");
            console.log(event);
          })
          .catch(() => {
            alert("등록실패");
          });
        ///======
      }

      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {
        if (isFail) {
          rej("Ops... Faild");
        } else {
          res({
            ...event,
            event_id: event.event_id || Math.random(),
          });
        }
      }, 100000);
    });
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    axios
      .post("http://localhost:5000/scheduler/delete", {
        deletedId: deletedId,
      })
      .then(() => {
        alert("삭제 성공!");
        console.log(deletedId);
      })
      .catch(() => {
        alert("삭제 실패ㅠ");
      });

    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });
  };
  return (
    <>
      <Scheduler
        view='month'
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6], // 요일을 뭐뭐 사용할지.
          weekStartOn: 0, // 어떤 요일로 시작할지 (0이 일요일이더라)
          startHour: 9, // 시작 시간 초기값 시간
          endHour: 17, // 끝 초기값 시간
          navigation: true, // ?
          disableGoToDay: false, // 월별달력 날짜 누르면해당 날 자세히 보기
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 9,
          endHour: 17,
          step: 60,
        }}
        height={700}
        fields={[
          {
            name: "color",
            type: "select",
            options: categoryFilter.slice(1),
            config: {
              label: "Category",
              required: true,
              errMsg: "Please Select Category",
            },
          },
          {
            name: "locale",
            type: "input",
            config: { label: "Locale" },
          },
          {
            name: "description",
            type: "input",
            config: { label: "Details", multiline: true, rows: 4 },
          },
          {
            name: "reminder",
            type: "select",
            options: [
              { id: 1, text: "사용안함", value: "" },
              { id: 2, text: "정시알림", value: 0 },
              { id: 3, text: "5분 전", value: 300 },
              { id: 4, text: "10분 전", value: 600 },
              { id: 5, text: "15분 전", value: 900 },
              { id: 6, text: "30분 전", value: 1800 },
              { id: 7, text: "1시간 전", value: 3600 },
              { id: 8, text: "2시간 전", value: 7200 },
              { id: 9, text: "3시간 전", value: 10800 },
              { id: 10, text: "12시간 전", value: 43200 },
              { id: 11, text: "1일(24시간) 전", value: 86400 },
              { id: 12, text: "2일(48시간) 전", value: 172800 },
              { id: 13, text: "1주일(168시간) 전", value: 604800 },
            ],
            config: {
              label: "reminder",
            },
          },
          {
            name: "reminderMethod",
            type: "select",
            options: [
              { id: 1, text: "팝업", value: "#c1c1c1" },
              { id: 2, text: "이메일", value: 2 },
              { id: 3, text: "카카오톡", value: 3 },
            ],
            config: {
              label: "reminder Method",
            },
          },
        ]}
        translations={{
          navigation: {
            month: "Month",
            week: "Week",
            day: "Day",
            today: "Go to Today",
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
        getRemoteEvents={fetchRemote}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />
    </>
  );
}
