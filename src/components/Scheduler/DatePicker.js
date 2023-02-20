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

export default function DatePicker({ state, onChange }) {
  const [value, setValue] = React.useState(dayjs(new Date()));

  // const handleStartChange = (newValue) => {
  //   setValue({ target: { name: "startHour", value: newValue } });
  //   value && onHandleContentsChange(value);
  // };

  // const handleEndChange = (newValue) => {
  //   setValue({ target: { name: "endHour", value: newValue } });
  //   value && onHandleContentsChange(value);
  // };

  console.log(value);

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
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
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
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
