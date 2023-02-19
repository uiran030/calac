import React, {useState} from 'react';
import { styled } from "@mui/material/styles";
import { Box, Card, CardHeader, IconButton, CardMedia, CardContent, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FeedMoreButton from './FeedMoreButton';

const FeedSection = () => {
  const [openBox, setOpenBox] = useState(false);
  //======================================================
  return (
    <MyBox>
      <MyCard>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={()=>setOpenBox(!openBox)}>
              <MoreVertIcon />
              {openBox &&(
                <FeedMoreButton/>
              )}
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘?
          </Typography>
        </CardContent>
      </MyCard>
      <MyCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘?
          </Typography>
        </CardContent>
      </MyCard>
      <MyCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘???
          </Typography>
        </CardContent>
      </MyCard>
      <MyCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘?
          </Typography>
        </CardContent>
      </MyCard>
      <MyCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘?
          </Typography>
        </CardContent>
      </MyCard>
      <MyCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘?
          </Typography>
        </CardContent>
      </MyCard>
      <MyCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="타이틀 타이틀 타이틀"
          subheader="2023-02-19"
        />
        <CardMedia
          component="img"
          height="194"
          image="../../assets/images/feed/img01.jpeg"
          alt="이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            오늘은 절약했뉘?
          </Typography>
        </CardContent>
      </MyCard>
    </MyBox>
  );
};
//style=================================================
const MyBox = styled(Box)({
  width: `100vh`,
  margin: `0 auto`,
  overflow:'scroll',
  display: `flex`,
  flexWrap: `wrap`
});
const MyCard = styled(Box)({
  width: `30vh`,
  border: `1px solid #ebebec`,
  margin: `60px auto`,
  overflow:'hidden',
});
//======================================================
export default FeedSection;