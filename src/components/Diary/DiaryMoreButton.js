import React, {useState,useEffect} from 'react'
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import DiaryModify from './DiaryModify';

const DiaryMoreButton = (posts) => {
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [postId, setPostId] = useState('');
  //======================================================
  const onModify = (id) => {
    console.log("id",id)
    setIsModifyOpen(true);
    setPostId(id);
  }
  console.log("isModifyOpen",isModifyOpen)
  console.log("postId",postId)
  //======================================================
  const onDelete = (id) => {
    if(window.confirm(`정말 삭제하시겠습니까?`) === true) {
      axios.post('http://localhost:5000/diary/delete' , {
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
        <ListItem disablePadding onClick={()=>onModify(posts.id)}>
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
      {isModifyOpen && (
        <DiaryModify
          isModifyOpen={isModifyOpen}
          setIsModifyOpen={setIsModifyOpen}
          postId={postId}
        />
      )}
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