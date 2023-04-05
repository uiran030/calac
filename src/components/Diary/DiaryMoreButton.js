import React, {useState,useEffect} from 'react'
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Modal, Fade, Typography, Backdrop, Divider, TextField, Hidden} from "@mui/material";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DiaryModify from './DiaryModify';

const DiaryMoreButton = (posts,id,openMoreButton,setOpenMoreButton) => {
  //======================================================
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    console.log(id)
    if(window.confirm(`게시글을 수정하시겠습니까??`) === true){
      setOpen(open);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  useEffect(()=>{
    console.log(open)
  },[])
  //======================================================
  return (
    <TabBox>
      <List>
        <ListItem disablePadding >
          <ListItemButtonIcon onClick={()=>handleClickOpen(posts.id)}> 
            <AutoFixNormalIcon />
            <ListItemText primary="modify"/>
          </ListItemButtonIcon>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButtonIcon  onClick={()=>onDelete(posts.id)}>
            <DeleteOutlineIcon />
            <ListItemText primary="delete" />
          </ListItemButtonIcon>
        </ListItem>
      </List>

      {open && (

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <ModalBox>
          <TitleTypography>Write Diary</TitleTypography>
          <Divider/>
          <TitleBox>
            <TextField
              id="standard success" 
              color="success"
              variant="standard" 
              fullWidth 
              label="제목" 
              multiline 
              name="title"
            />
          </TitleBox>

          <EditorBox>
            <CKEditor
              style={{paddingTop:'20px'}}
              editor={ClassicEditor}
              config={{
                placeholder: "내용을 입력하세요 :)",
              }}
              onReady={editor=>{
                // console.log('Editor is ready to use!', editor);
              }}
              onBlur={(event, editor) => {
                  // console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                  // console.log('Focus.', editor);
              }}
            />
          </EditorBox>

          <BtnBox>
            <SubmitButton fullWidth variant="outlined">Submit</SubmitButton>
          </BtnBox>
        </ModalBox>
      </Modal>
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
const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '57%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: '60vh',
  backgroundColor: '#fff',
  border: '3px solid #07553B',
  boxShadow: 24,
  padding: 37,
  overflowY: 'auto'
});
const TitleTypography = styled(Typography)({
  fontSize: 30,
  color: '#07553B',
});
const TitleBox = styled(Box)({
  padding: 20,
});
const EditorBox = styled(Box)({
  height: 290
});
const BtnBox = styled(Box)({
  padding: 20,
});
const SubmitButton = styled(Button)({
  border: '1px solid #07553B',
  "&:hover":{backgroundColor: '#07553B', color: '#fff'}
});
//======================================================
export default DiaryMoreButton