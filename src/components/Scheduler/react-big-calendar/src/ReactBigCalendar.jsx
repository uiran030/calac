// import React, { Fragment, useMemo } from "react";
// import PropTypes from "prop-types";
// import moment from "moment";
// import {
//   Calendar,
//   Views,
//   DateLocalizer,
//   momentLocalizer,
// } from "react-big-calendar";
// import DemoLink from "./DemoLink.component";
// import events from "./events";
// import * as dates from "./dates";

// import "./test.scss";

// const mLocalizer = momentLocalizer(moment);

// const ColoredDateCellWrapper = ({ children }) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       // backgroundColor: "lightblue",
//     },
//   });

// /**
//  * We are defaulting the localizer here because we are using this same
//  * example on the main 'About' page in Storybook
//  */
// export default function Basic({
//   localizer = mLocalizer,
//   showDemoLink = true,
//   ...props
// }) {
//   const { components, defaultDate, max, views } = useMemo(
//     () => ({
//       components: {
//         timeSlotWrapper: ColoredDateCellWrapper,
//       },
//       defaultDate: new Date(2023, 3, 17),
//       max: dates.add(dates.endOf(new Date(2023, 17, 1), "day"), -1, "hours"),
//       views: Object.keys(Views).map((k) => Views[k]),
//     }),
//     []
//   );

//   return (
//     <Fragment>
//       {/* {showDemoLink ? <DemoLink fileName='basic' /> : null} */}
//       <div className='height600' {...props}>
//         <Calendar
//           components={components}
//           defaultDate={defaultDate}
//           events={events}
//           localizer={localizer}
//           max={max}
//           showMultiDayTimes
//           step={30} // 시간 간격
//           views={views}
//           style={{ height: "90vh" }}
//         />
//       </div>
//     </Fragment>
//   );
// }
// Basic.propTypes = {
//   localizer: PropTypes.instanceOf(DateLocalizer),
//   showDemoLink: PropTypes.bool,
// };

// ///
import React, {
  useCallback,
  useState,
  useMemo,
  Fragment,
  momentLocalizer,
} from "react";
import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import DemoLink from "./DemoLink.component";
import events from "./events";
import moment from "moment";

export default function CreateEventWithNoOverlap() {
  const localizer = momentLocalizer(moment);

  const [myEvents, setEvents] = useState(events);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
      formats: {
        // the 'date' on each day cell of the 'month' view
        dateFormat: "D",
        // the day of the week header in the 'month' view
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd", culture),
        // the day header in the 'week' and 'day' (Time Grid) views
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd MM/DD", culture),
        // the time in the gutter in the Time Grid views
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "hh:mm a", culture),
      },
    }),
    []
  );

  console.log(formats);

  return (
    <Fragment>
      <DemoLink fileName='createEventWithNoOverlap'>
        <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
          <br />
          The events are being arranged by `no-overlap` algorithm.
        </strong>
      </DemoLink>
      <div className='height600'>
        <Calendar
          dayLayoutAlgorithm={"no-overlap"}
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          formats={formats}
        />
      </div>
    </Fragment>
  );
}

CreateEventWithNoOverlap.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  dayLayoutAlgorithm: PropTypes.string,
};
