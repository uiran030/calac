import React, {useEffect, useState} from 'react';
import { Typography, Box, ListItem, IconButton, ListItemButton, ListItemText, ListItemIcon, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import CommentIcon from "@mui/icons-material/Comment";

const DashboardMonthGoal = () => {
  const [checked, setChecked] = useState([0]);
  const [goalList, setGoalList] = useState(false);
  
  const handleToggle = (list) => {
  };


  useEffect(() => {
    axios.get('http://localhost:5000/goal')
    .then((res) => {
      console.log('res', res.data);
      setGoalList(res.data);
    })
  }, []);

  return (
  <MonthGoalWrap>
    <Typography
      variant='h5'
      fontWeight={700}
      color='primary'
    >
      이번달 목표
    </Typography>
      {
        goalList && goalList.map((list) => {
          return(
            <ListItem
            key={list.goal_no}
            secondaryAction={
              <IconButton edge='end' aria-label='comments'>
                <CommentIcon />
              </IconButton>
            }
            disablePadding
            >
              <ListItemButton
              role={undefined}
              dense
              onClick={handleToggle(list)}
              >
                <ListItemIcon>
                    <Checkbox
                      edge='start'
                      // checked = {checked}
                      tabIndex={-1}
                      disableRipple
                      // inputProps={{ "aria-labelledby": list.goal_no }}
                    />
                </ListItemIcon>
                <ListItemText
                  id={list.goal_no}
                  primary={list.goal_title}
                  sx={{ marginLeft: "-20px" }}
                />
              </ListItemButton>
            </ListItem>
          )
        })
      }
  </MonthGoalWrap>
  );
};
//style=================================================
const MonthGoalWrap = styled(Box)({
  height:'100%',
  paddingLeft:'10px'
});
//======================================================
export default DashboardMonthGoal;