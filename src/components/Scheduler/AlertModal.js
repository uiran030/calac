import React, { useState } from "react";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AlarmIcon from "@mui/icons-material/Alarm";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RefreshIcon from "@mui/icons-material/Refresh";
import OutputIcon from "@mui/icons-material/Output";
import { transition } from "d3";
import { Translate } from "@mui/icons-material";

export default function AlertModal({ alertEvents }) {
  const actions = [
    { icon: <AlarmIcon />, name: "알림", value: "alert" },
    { icon: <QuestionMarkIcon />, name: "도움말", value: "help" },
  ];

  const [openHelp, setOpenHelp] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChoiceModal = (event) => {
    setOpenAlert((prev) => !prev);
    // setCount(false);
    // setDescription("");
    // setChoiceModal(event);
  };

  return (
    <Box>
      <Box
        zIndex={99}
        padding={2}
        position='fixed'
        top='100px'
        right='-350px'
        bgcolor='rgba(193, 193, 193, .25)'
        boxShadow='0 6px 20px -15px #000'
        borderRadius='30px'
        width='350px'
        height='75%'
        borderColor='#fff'
        display='flex'
        flexDirection='column'
        gap='10px'
        sx={
          openAlert
            ? {
                backdropFilter: "blur(2px)",
                borderWidth: "1px 1px 0 0",
                borderStyle: "solid",
                transform: "translate(-370px, 0)",
                transitionDuration: "0.5s",
                transitionProperty: "all",
              }
            : {
                backdropFilter: "blur(2px)",
                borderWidth: "1px 1px 0 0",
                borderStyle: "solid",
                transitionDuration: "0.5s",
                transitionProperty: "all",
              }
        }
      >
        <Box display='flex' justifyContent='space-between'>
          <Typography fontSize='20px' color='primary' fontWeight={700}>
            알림 On & Off
          </Typography>
          <Box flex={1} paddingX={1}>
            <RefreshIcon />
          </Box>
          <OutputIcon
            onClick={() => {
              setOpenAlert(false);
            }}
          />
        </Box>
        {alertEvents.map((item) => (
          <Box
            key={item.id}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            bgcolor='rgba(255, 255, 255, .5)'
            borderRadius='10px'
            padding='5px'
          >
            <Typography>{item.title}</Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        ))}
      </Box>
      <SpeedDial
        ariaLabel='Add count'
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<ArrowUpwardIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleChoiceModal(action.value);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
