import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemText, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Modal, Fade, Backdrop, Divider, TextField } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DiaryDetail from './DiaryDetail';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import DiaryModify from './DiaryModify';
import NoPermissionBlock from "../common/NoPermissionBlock";
import { connect } from "react-redux";

const DiaryCard = ({hasSidCookie}) => {
  const [openMoreButton, setOpenMoreButton] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [countIndex, setCountIndex] = useState(0);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentCnt, setCommentCnt] = useState([]);
  //======================================================
  const handleOpenMoreButton = (e,idx) => {
    setCountIndex(idx);
    setOpenMoreButton(!openMoreButton);
  }
  //======================================================
  const openDetailModal = (id,title,content,image,createdAt) => {
    setIsDetailOpen(true);
    setId(id);
    setTitle(title);
    setContent(content);
    setCreatedAt(new Date(createdAt).toLocaleString())
    setImage(image);
  }
  //======================================================
  useEffect(()=>{
    axios.get('http://localhost:5000/comments/count')
    .then(res=>{
      setCommentCnt(res.data)
    });
  },[commentCnt])
  //======================================================
  let offset = 0;
  const loadDiary = () => {
    axios.get(`http://localhost:5000/diary?limit=10&offset=${offset}`)
    .then(res=>{
      setPosts(oldPosts => [...oldPosts, ...res.data]);
    });
    offset += 10;
  }
  //======================================================
  const handleScroll = (e) => {
    if (window.innerHeight + document.getElementById("postList").scrollTop + 1 >= document.getElementById("postList").scrollHeight) {
      loadDiary();
    }
  }
  //======================================================
  const handleClickOpen = (id) => {
    setIsModify(true);
    console.log(isModify)
  }
  //======================================================
  const onDelete = (id) => {
    if (!hasSidCookie) {alert("삭제 권한이 없습니다. 로그인을 진행해주세요 :(")}
    else {
      if(window.confirm(`정말 삭제하시겠습니까?`) === true) {
        axios.post('http://localhost:5000/diary/delete' , {
          id : id
        })
        .then(()=>alert("삭제되었습니다 :)"))
      } else { 
        alert("취소되었습니다 :)")
      }
    }
  }
  //======================================================
  useEffect(()=>{
    loadDiary();
    let listRange = document.getElementById("postList");
    listRange.addEventListener("scroll", handleScroll);
  },[])
  //======================================================
  return (
    <CardBox>
      <CardList id="postList">
        {posts.map((list,idx)=>{
          return(
          <CardListItem key={idx}>
            <Box>
              <MyCardHeader
                action={
                  <MyIconButton aria-label="settings" onClick={(e)=>handleOpenMoreButton(e,list.diary_no)}>
                    <MoreVertIcon />
                    {countIndex === list.diary_no && (
                      openMoreButton && (
                        <MoreBox>
                          <List>
                            <ListItem disablePadding >
                              <ListItemButtonIcon onClick={()=>handleClickOpen(list.diary_no)}> 
                                <AutoFixNormalIcon />
                                <ListItemText primary="modify"/>
                              </ListItemButtonIcon>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButtonIcon  onClick={()=>onDelete(list.diary_no)}>
                                <DeleteOutlineIcon />
                                <ListItemText primary="delete" />
                              </ListItemButtonIcon>
                            </ListItem>
                          </List>
                        </MoreBox>
                      )
                    )}
                    {countIndex === list.diary_no && (
                      isModify && (
                        <DiaryModify
                          isModify={isModify}
                          setIsModify={setIsModify}
                          diary_no={list.diary_no}
                        />
                      )
                    )}
                  </MyIconButton>
                }
                title={list.title}
                disableTypography
              />
              <DateTypography>{new Date(list.createdAt).toLocaleString()}</DateTypography>
              <Button onClick={()=>openDetailModal(list.diary_no,list.title, list.content,list.image,list.createdAt)}>
                {list.image !== "NULL" ? (
                  <MyCardMedia
                    component="img"
                    width="40vh"
                    height="194"
                    src={`http://localhost:5000/images/diary/${list.image}`}
                    alt="이미지"
                  />
                  ):(
                    <MyCardMedia
                    component="img"
                    width="40vh"
                    height="194"
                    src="/images/logo.png"
                    alt="이미지"
                  />
                  )
                }
              </Button>
              
              <MyCardContent>
                <ContentBox variant="body2" color="text.secondary">
                  {ReactHtmlParser((list.content_parse).substring(0,list.content_parse.indexOf('</')))}
                </ContentBox>
              </MyCardContent>
              <CommentBox>
              {commentCnt.length !== 0 && (
                commentCnt.map((count,idx) => {
                  return(
                    list.diary_no === count.diary_no && (
                      <CountCommentTypography key={idx}>댓글 {count.cnt}개</CountCommentTypography>
                    )
                  )
                })
              )}
              </CommentBox>
            </Box>
          </CardListItem>
        )})}
      </CardList>
      {isDetailOpen && (
        <DiaryDetail
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          id={id}
          title={title}
          content={content}
          image={image}
          createdAt={createdAt}
        />
      )}
    </CardBox>
  );
};
// 리덕스 =================================================
const mapStateToProps = (state) => ({
  hasSidCookie: state.hasSidCookie,
});
//style=================================================
const CardBox = styled(Box)({
  height:'100%'
});
const CardList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  height:'100%',
  overflow:'auto'
});
const CardListItem = styled(ListItem)({
  width: `45vh`,
  border: `1px solid #ebebec`,
  margin: `20px 30px 37px 20px`
});
const MyCardHeader = styled(CardHeader)({
  fontSize: 25,
  fontWeight: 'bold',
});
const DateTypography = styled(Typography)({
  display: 'flex',
  justifyContent: 'end',
  marginRight: '3vh'
});
const MyCardMedia = styled(CardMedia)({
  width : '40vh',
  objectFit : 'contain'
});
const MyIconButton = styled(IconButton)({
});
const MyCardContent = styled(CardContent)({
  paddingTop: 16,
});
const ContentBox = styled(Box)({
  width: '40vh',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'break-word',
});
const CommentBox = styled(Box)({
});
const CountCommentTypography = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '0.875rem'
});
//======================================================
const MoreBox = styled(Box)({
  maxWidth: 200, 
  position: 'absolute',
  top: -7,
  left: 35
});
const ListItemButtonIcon = styled(ListItemButton)({
  padding: 0
});
//======================================================
export default connect(mapStateToProps)(DiaryCard);