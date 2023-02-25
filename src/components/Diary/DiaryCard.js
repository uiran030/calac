import React, {useState,useEffect} from 'react';
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button, Modal, Fade, Backdrop, Divider } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DiaryMoreButton from './DiaryMoreButton';
import DiaryDetail from './DiaryDetail';
import axios from 'axios';
const DiaryCard = () => {
  const [openMoreButton, setOpenMoreButton] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [post, setPost] = useState([]);
  //======================================================
  const openDetailModal = (id,title,body) => {
    setIsDetailOpen(true);
    setId(id);
    setTitle(title);
    setBody(body);
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
                  <MyIconButton aria-label="settings" onClick={()=>setOpenMoreButton(!openMoreButton)}>
                    <MoreVertIcon />
                    {openMoreButton &&(
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
                  src="/images/diary/img01.jpeg"
                  alt="이미지"
                />
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
      {/* MUI Modal은 ref와 함께 자식 컴포넌트로 전달? 함수형 컴포넌트에서 사용불가..? */}
      {isDetailOpen && (
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
            <TitleTypography>{title}</TitleTypography><br></br>
            <ModalDateTypography>2023-02-19</ModalDateTypography>
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
                {body}
              </ContentTypography>
            </DetailBox>
          </ModalBox>
        </Fade>
      </Modal>
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
//======================================================
export default DiaryCard;