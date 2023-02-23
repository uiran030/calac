import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useState } from "react";

export default function Retry({ categoryFilter, test }) {
  // categoryFilter.map((item) => {
  //   console.log(item);
  // });

  console.log(categoryFilter.slice(1));

  return (
    <>
      <Scheduler
        view='month'
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6], // 요일을 뭐뭐 사용할지.
          weekStartOn: 0, // 어떤 요일로 시작할지 (0이 일요일이더라)
          startHour: 9, // 시작 시간 초기값 시간
          endHour: 17, // 끝 초기값 시간
          // cellRenderer: (props: CellProps) => JSX.Element,
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
            // Should provide options with type:"select"
            options: categoryFilter.slice(1),
            // [
            //   { id: 1, text: "John", value: 1 },
            //   { id: 2, text: "Mark", value: 2 },
            // ]
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
            default: "Default Value...",
            config: { label: "Details", multiline: true, rows: 4 },
          },
          {
            name: "remider",
            type: "select",
            // Should provide options with type:"select"
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
              label: "Remider",
              // required: true,
              // errMsg: "Plz Select User",
            },
          },
          {
            name: "remiderMethod",
            type: "select",
            // Should provide options with type:"select"
            options: [
              { id: 1, text: "팝업", value: "#c1c1c1" },
              { id: 2, text: "이메일", value: 2 },
              { id: 3, text: "카카오톡", value: 3 },
            ],
            config: {
              label: "Remider Method",
              // required: true,
              // errMsg: "Plz Select User",
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
        events={[
          {
            event_id: 1,
            title: "Event 1",
            start: new Date("2023/2/2 09:30"),
            end: new Date("2023/2/8 10:30"),
            color: "#4f953b",
            // allDay: true,
          },
          {
            event_id: 2,
            title: "Event 2",
            start: new Date("2023/2/10 13:00"),
            end: new Date("2023/2/10 18:00"),
            color: "#a7a7a2",
          },
          {
            event_id: 3,
            title: "Event 3",
            start: new Date("2023/2/15 10:00"),
            end: new Date("2023/2/27 11:00"),
            color: "#3a5134",
          },
          {
            event_id: 4,
            title: "Event 3",
            start: new Date("2023/2/15 10:00"),
            end: new Date("2023/2/15 19:00"),
            color: "#79a8a9",
          },
          {
            event_id: 5,
            title: "Event 3",
            start: new Date("2023/2/27 10:00"),
            end: new Date("2023/2/28 11:00"),
            color: "#aacfd0",
          },
        ]}
      />
    </>
  );
}
