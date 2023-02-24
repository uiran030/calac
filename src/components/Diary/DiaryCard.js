import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DiaryMoreButton from './DiaryMoreButton';
import DiaryDetail from './DiaryDetail';
import axios from 'axios';

const DiaryCard = () => {
  const [openBox, setOpenBox] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [post, setPost] = useState([]);
  //======================================================
  const openDetailModal = (id,title,body) => {
    console.log(id);
    setId(id);
    setTitle(title);
    setBody(body);
    setOpenDetail(true);
    console.log(title)
    console.log(body)
  }
  const closeDetailModal = (id) => {
    setOpenDetail(false);
  }
  
  //======================================================
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res=>setPost(res.data));
    console.log(post)
  },[])
  //======================================================
  return (
    <Box>
      <CardList>
        {post.map(list=>{
          return(
          <CardListItem key={list.id}>
            <Box>
              <MyCardHeader
                action={
                  <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                    <MoreVertIcon />
                    {openBox &&(
                      <DiaryMoreButton/>
                    )}
                  </MyIconButton>
                }
                title={list.title}
                disableTypography
              />
              <DateTypography>2023-02-24</DateTypography>
              <Button onClick={()=>openDetailModal(list.id, list.title, list.body)}>
                <MyCardMedia
                  component="img"
                  width="40vh"
                  height="194"
                  image="../../assets/images/feed/img01.jpeg"
                  alt="이미지"
                />
                {/* {openDetail && (
                  <DiaryDetail 
                    openDetail={openDetail}
                    setOpenDetail={setOpenDetail}
                    openDetailModal={openDetailModal}
                  />
                )} */}
              </Button>
              <CardContent>
                <BodyTypography variant="body2" color="text.secondary">
                  {list.body}
                </BodyTypography>
              </CardContent>
            </Box>
          </CardListItem>
        )})}
      </CardList>
      {openDetail && (
      <DiaryDetail 
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        closeDetailModal={closeDetailModal}
        id={id}
        title={title}
        body={body}
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
  marginRight: '-11px',
});
const BodyTypography = styled(Typography)({
  width: '40vh',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'break-word',
});
//======================================================
export default DiaryCard;