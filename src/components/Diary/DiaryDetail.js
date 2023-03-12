import React from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Modal, Fade, Backdrop, Divider, TextField } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

const DiaryDetail = (isDetailOpen,setIsDetailOpen,Backdrop,id,title,createdAt,content,submitComment,comments,commentHandle) => {
  //======================================================
  return (
    <MyBox>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isDetailOpen}
            onClose={()=>setIsDetailOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
          <Fade in={isDetailOpen}>
            <ModalBox>
              <TitleTypography>{title}</TitleTypography>
              <ModalDateTypography>{createdAt}</ModalDateTypography>
              <Divider/>
              <DetailBox>
                  <CardMedia
                    component="img"
                    width="210"
                    height="194"
                    image="/images/diary/img01.jpeg"
                    alt="이미지"
                  />
                  <ContentTypography>
                    {ReactHtmlParser(content)}
                  </ContentTypography>
              </DetailBox>
              <DetailDivider/>
              <CommentBox>
                <CommentTextField 
                  id="outlined-basic" 
                  variant="outlined" 
                  label="댓글달기" 
                  size="small" 
                  onChange={commentHandle}
                  />
                <CommentButton onClick={()=>submitComment(id)}>등록</CommentButton>
                <List>
                  {comments.map(list => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={list.comment}
                        />
                      <CommentUpdate>수정</CommentUpdate>
                      <CommentDelete>삭제</CommentDelete>
                      </ListItem>
                    )
                  })}
                </List>
              </CommentBox>
            </ModalBox>
          </Fade>
        </Modal>
    </MyBox>
  )
};
//style=================================================
const MyBox = styled(Box)({
})
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
  padding: 20,
  overflowY: 'auto',
});
const DetailBox = styled(Box)({
  padding: 20,
});
const TitleTypography = styled(Typography)({
  fontSize: 30,
  color: '#07553B',
  textAlign: 'center'
});
const ModalDateTypography = styled(Typography)({
  fontSize: 15,
  color: '#07553B',
  textAlign: 'right'
});
const ContentTypography = styled(Typography)({
  fontSize: 20,
  textAlign: 'center',
  paddingTop: 30,
});
const DetailDivider = styled(Divider)({
});
const CommentBox = styled(Box)({
  paddingTop: 20,
  height:30
});
const CommentTextField = styled(TextField)({
  width: '80%',
});
const CommentButton = styled(Button)({
  left: 26,
});
const CommentUpdate = styled(Button)({
  left: 26,
});
const CommentDelete = styled(Button)({
  left: 26,
});
//======================================================

export default DiaryDetail