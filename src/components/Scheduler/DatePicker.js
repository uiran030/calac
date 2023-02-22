import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Grid, Typography } from "@mui/material";
import { previousDay } from "date-fns";

export default function DatePicker({ scheduler, onChange, doReset }) {
  const [startValue, setStartValue] = React.useState(
    scheduler.state.start.value
  );
  const [endValue, setEndValue] = React.useState(scheduler.state.end.value);

  React.useEffect(() => {
    setStartValue(scheduler.state.start.value);
    setEndValue(scheduler.state.end.value);
  }, [doReset]);

  React.useEffect(() => {
    onChange(startValue, "start");
  }, [startValue]);

  React.useEffect(() => {
    onChange(endValue, "end");
  }, [endValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DateTimePicker
        label='Start Date&Time'
        value={contents.startHour}
        onChange={handleStartChange}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label='DateTimePicker'
        value={startValue}
        onChange={(newValue) => {
          setStartValue(newValue);
          // onChange({ value: newValue }, "start");
        }}
      />
      <Typography
        variant='h6'
        component='h2'
        color='primary'
        fontWeight={700}
        paddingX={5}
      >
        ~
      </Typography>

      {/* <DateTimePicker
        label='End Date&Time'
        value={contents.endHour}
        onChange={handleEndChange}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label='DateTimePicker'
        value={endValue}
        onChange={(newValue) => {
          setEndValue(newValue);
          // onChange({ value: newValue }, "end");
        }}
      />
    </LocalizationProvider>
  );
}
