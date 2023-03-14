import React,{useState,useEffect} from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, CardMedia, Typography, Button, Divider, TextField, Dialog, DialogTitle, DialogContent, Avatar} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';

const DiaryDetail = ({isDetailOpen,setIsDetailOpen,id,title,createdAt,content}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState ({comment: ''})
  //======================================================
  const commentHandle = (e) => {
    const data = e.target.value;
    setNewComment({
      ...newComment,
      comment : data
    })
  }
  //======================================================
  const submitComment = (id) => {
    axios.post('http://localhost:5000/comments/insert',{
      dairy_no : id,
      comment : newComment.comment
    })
    .then(()=>alert('댓글이 등록되었습니다 :)'))
    .catch(err=>console.log("err",err))
    setNewComment({comment:''})
  }
  //======================================================
  const commentDelete = (id) => {
    if(window.confirm(`정말 삭제하시겠습니까?`) === true) {
      axios.post('http://localhost:5000/comments/delete' , {
        comment_no : id
      })
      .then(()=>alert("삭제되었습니다 :)"))
      .catch(err=>console.log("err",err))
    } else {
      alert("취소되었습니다 :)")
    }
  }
  //======================================================
  useEffect(()=>{
    axios.post('http://localhost:5000/comments', {
      dairy_no : id
    })
    .then(res=>setComments(res.data[0]));
  },[comments])
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isDetailOpen}
        onClose={()=>setIsDetailOpen(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogBox>
          <Avatar alt="Remy Sharp" src="/images/diary/avatar.png">
            <UserTypography>{id}</UserTypography>
          </Avatar>
          <DialogTitle>{title}</DialogTitle>
          <DateTypography>{createdAt.substring(0,10)}</DateTypography>
          <MyDialogContent dividers>
            <DetailBox>
              <CardMedia
                component="img"
                width="210"
                height="194"
                image="/images/diary/img01.jpeg"
                alt="이미지"
              />
              <ContentBox>
                {ReactHtmlParser(content)}
              </ContentBox>
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
                    <ListItem key={list.comment_no}>
                      <ListItemText
                        primary={`${list.comment} (${list.user_id} ${(list.createdAt).substring(0,10)})`}
                      />
                    <CommentUpdate>수정</CommentUpdate>
                    <CommentDelete onClick={()=>commentDelete(list.comment_no)}>삭제</CommentDelete>
                    </ListItem>
                  )
                })}
              </List>
            </CommentBox>
          </MyDialogContent>
        </DialogBox>
      </MyDialog>
    </Box>
  )
};
//style=================================================
const MyDialog = styled(Dialog)({
})
const DialogBox = styled(Box)({
  width: 600,
  height: '70vh',
  backgroundColor: '#fff',
  border: '3px solid #07553B',
  boxShadow: 24,
  padding: 20,
  overflowY :'hidden',
})
const UserTypography = styled(Typography)({
})
const DateTypography = styled(Typography)({
  fontSize: 15,
  color: '#07553B',
  textAlign: 'right'
})
const MyDialogContent = styled(DialogContent)({
  height: '50vh',
});
const DetailBox = styled(Box)({
  padding: 20,
});
const ContentBox = styled(Box)({
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