import React, { useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import {
  EventActions,
  ProcessedEvent,
  ViewEvent,
} from "@aldabil/react-scheduler/types";
import { EVENTS } from "./events.tsx";

export default function ScheduleManager({ categoryFilter }) {
  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    console.log({ query });
    /**Simulate fetchin remote data */
    return new Promise((res) => {
      setTimeout(() => {
        res(EVENTS);
      }, 3000);
    });
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    console.log("handleConfirm =", action, event.title);

    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
      } else if (action === "create") {
        /**POST event to remote DB */
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
      }, 30000);
    });
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });
  };

  return (
    <Scheduler
      fields={[
        {
          name: "color",
          type: "select",
          // options: changedFilter && changedFilter.slice(1),
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
            { id: 1, text: "팝업", value: "1" },
            { id: 2, text: "이메일", value: "2" },
            { id: 3, text: "카카오톡", value: "3" },
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
          addTitle: "일정 추가하기",
          editTitle: "일정 수정하기",
          confirm: "확인",
          delete: "삭제",
          cancel: "취소",
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
  );
}

// fields={[
//   {
//     name: "color",
//     type: "select",
//     // options: changedFilter && changedFilter.slice(1),
//     options: categoryFilter.slice(1),
//     config: {
//       label: "Category",
//       required: true,
//       errMsg: "Please Select Category",
//     },
//   },
//   {
//     name: "locale",
//     type: "input",
//     config: { label: "Locale" },
//   },
//   {
//     name: "description",
//     type: "input",
//     config: { label: "Details", multiline: true, rows: 4 },
//   },
//   {
//     name: "reminder",
//     type: "select",
//     options: [
//       { id: 1, text: "사용안함", value: "" },
//       { id: 2, text: "정시알림", value: 0 },
//       { id: 3, text: "5분 전", value: 300 },
//       { id: 4, text: "10분 전", value: 600 },
//       { id: 5, text: "15분 전", value: 900 },
//       { id: 6, text: "30분 전", value: 1800 },
//       { id: 7, text: "1시간 전", value: 3600 },
//       { id: 8, text: "2시간 전", value: 7200 },
//       { id: 9, text: "3시간 전", value: 10800 },
//       { id: 10, text: "12시간 전", value: 43200 },
//       { id: 11, text: "1일(24시간) 전", value: 86400 },
//       { id: 12, text: "2일(48시간) 전", value: 172800 },
//       { id: 13, text: "1주일(168시간) 전", value: 604800 },
//     ],
//     config: {
//       label: "reminder",
//     },
//   },
//   {
//     name: "reminderMethod",
//     type: "select",
//     options: [
//       { id: 1, text: "팝업", value: "1" },
//       { id: 2, text: "이메일", value: "2" },
//       { id: 3, text: "카카오톡", value: "3" },
//     ],
//     config: {
//       label: "reminder Method",
//     },
//   },
// ]}
