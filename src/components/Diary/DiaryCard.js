import React, {useState} from 'react';
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DiaryMoreButton from './DiaryMoreButton';
import DiaryDetail from './DiaryDetail';

const DiaryCard = () => {
  const [openBox, setOpenBox] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  //======================================================
  return (
    <Box>
      <CardList>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
        <CardListItem>
          <CardBox>
            <CardHeader
              action={
                <MyIconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
                  <MoreVertIcon />
                  {openBox &&(
                    <DiaryMoreButton/>
                  )}
                </MyIconButton>
              }
              title="타이틀 타이틀 타이틀"
              subheader="2023-02-19"
            />
            <Button onClick={()=>setOpenDetail(!openDetail)}>
              <CardMedia
                component="img"
                width="290"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              {openDetail && (
                <DiaryDetail 
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              )}
            </Button>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                오늘은 절약했뉘?
              </Typography>
            </CardContent>
          </CardBox>
        </CardListItem>
      </CardList>
    </Box>
  );
};
//style=================================================
const CardList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
});
const CardListItem = styled(ListItem)({
  width: `45vh`,
  border: `1px solid #ebebec`,
  margin: `20px auto`,
});
const CardBox = styled(Box)({
});
const MyIconButton = styled(IconButton)({
  marginRight: '-11px',
});
//======================================================
export default DiaryCard;