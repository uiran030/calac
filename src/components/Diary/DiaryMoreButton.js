import React, {useState} from 'react'
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

const DiaryMoreButton = (posts) => {
  //======================================================
  const onDelete = (id) => {
    if(window.confirm(`정말 삭제하시겠습니까?`) === true) {
      axios.post('http://localhost:5000/dairy/delete' , {
        id : id
      })
      .then(()=>alert("삭제되었습니다 :)"))
    } else {
      alert("취소되었습니다 :)")
    }
  }
  //======================================================
  return (
    <TabBox>
      <List>
        <ListItem disablePadding>
          <ListItemButtonIcon>
            <AutoFixNormalIcon />
            <ListItemText primary="modify"/>
          </ListItemButtonIcon>
        </ListItem>
        <ListItem disablePadding onClick={()=>onDelete(posts.id)}>
          <ListItemButtonIcon>
            <DeleteOutlineIcon />
            <ListItemText primary="delete" />
          </ListItemButtonIcon>
        </ListItem>
      </List>
    </TabBox>
  )
};
//style=================================================
const TabBox = styled(Box)({
  maxWidth: 200, 
  position: 'absolute',
  top: -7,
  left: 35
});
const ListItemButtonIcon = styled(ListItemButton)({
  padding: 0
});
//======================================================

export default DiaryMoreButton