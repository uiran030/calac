import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Modal, Fade, Backdrop, Divider, TextField } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DiaryMoreButton from './DiaryMoreButton';
import DiaryDetail from './DiaryDetail';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";

const DiaryCard = () => {
  const [openMoreButton, setOpenMoreButton] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [countIndex, setCountIndex] = useState(0);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState ({comment: ''})
  //======================================================
  const handleOpenMoreButton = (e,idx) => {
    setCountIndex(idx);
    setOpenMoreButton(!openMoreButton);
  }
  //======================================================
  const openDetailModal = (id,title,content,createdAt) => {
    setIsDetailOpen(true);
    setId(id);
    setTitle(title);
    setContent(content);
    setCreatedAt(createdAt)
    axios.post('http://localhost:5000/comments', {
      dairy_no : id
    })
    .then(res=>setComments(res.data[0]));
  }
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
    .then(()=>{
      alert('댓글이 등록되었습니다 :)');
      setNewComment({comment: ''});
    })
  }
  //======================================================
  useEffect(()=>{
    axios.get('http://localhost:5000/dairy')
    .then(res=>setPosts(res.data));
  },[posts])
  //======================================================
  return (
    <Box>
      <CardList>
        {posts.map((list,idx)=>{
          return(
          <CardListItem key={idx}>
            <Box>
              <MyCardHeader
                action={
                  <MyIconButton aria-label="settings" onClick={(e)=>handleOpenMoreButton(e,list.dairy_no)}>
                    <MoreVertIcon />
                    {countIndex === list.dairy_no && (
                      openMoreButton && (
                        <DiaryMoreButton 
                          posts={posts} 
                          id={list.dairy_no}
                        />
                      )
                    )}
                  </MyIconButton>
                }
                title={list.title}
                disableTypography
              />
              <DateTypography>{list.createdAt.substring(0,10)}</DateTypography>
              <Button onClick={()=>openDetailModal(list.dairy_no,list.title, list.content,list.createdAt)}>
                <MyCardMedia
                  component="img"
                  width="40vh"
                  height="194"
                  src="/images/diary/img01.jpeg"
                  alt="이미지"
                />
              </Button>
              <CardContent>
                <BodyTypography variant="body2" color="text.secondary">
                  {ReactHtmlParser(list.content)}
                </BodyTypography>
                <CountCommentTypography>댓글 1개</CountCommentTypography>
              </CardContent>
            </Box>
          </CardListItem>
        )})}
      </CardList>
      {/* MUI Modal은 ref와 함께 자식 컴포넌트로 전달? 함수형 컴포넌트에서 사용불가..? */}
      {isDetailOpen && (
        <DiaryDetail
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          Backdrop={Backdrop}
          id={id}
          title={title}
          createdAt={createdAt}
          content={content}
          submitComment={submitComment}
          comments={comments}
          commentHandle={commentHandle}
        />
      )}
    </Box>
  );
};
//style=================================================
const CardList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});
const CardListItem = styled(ListItem)({
  width: `45vh`,
  border: `1px solid #ebebec`,
  margin: `20px 10px 15px 20px`,
});
const MyCardHeader = styled(CardHeader)({
  fontSize: 25,
  fontWeight: 'bold',
});
const DateTypography = styled(Typography)({
  display: 'flex',
  justifyContent: 'end',
  marginRight: 16
});
const MyCardMedia = styled(CardMedia)({
  width : '40vh'
});
const MyIconButton = styled(IconButton)({
  
});
const BodyTypography = styled(Typography)({
  width: '40vh',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'break-word',
});
const CountCommentTypography = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '0.875rem'
});
//======================================================
export default DiaryCard;