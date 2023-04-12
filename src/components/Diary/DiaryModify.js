import React,{useState,useEffect} from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Divider, TextField, Dialog, DialogTitle, DialogContent, Avatar} from "@mui/material";
import axios from 'axios';

const DiaryModify = ({isModify,setIsModify,diary_no}) => {
  //======================================================
  const [getPost, setGetPost] = useState({
    title : '',
    content : '',
    image : ''
  });
  const [test,setTest] = useState('testtest')
  //======================================================
  useEffect(()=>{
    console.log("modify",diary_no);
    axios.post("http://localhost:5000/diary/onePost", {no:diary_no})
    .then(res=>{
      console.log(res.data[0])
      setGetPost({
        title : res.data[0].title,
        content : res.data[0].content_parse,
        image : res.data[0].image
      })
    });
  },[])
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isModify}
        onClose={()=>setIsModify(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogBox>
          <TitleBox>
            <Avatar alt="Remy Sharp" src="/images/avatar.png">
              <UserTypography>{}</UserTypography>
            </Avatar>
            <TitleTextField
                id="standard-helperText"
                defaultValue={getPost.title}
                helperText="update Title"
                variant="standard"
              />
          </TitleBox>
          <DateTypography>{}</DateTypography>
          <MyDialogContent dividers>
            <DetailBox>
              <ContentBox>
                {}
              </ContentBox>
            </DetailBox>
            <DetailDivider/>
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
const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '15px 15px 0',
})
const TitleTextField = styled(TextField)({

})
const UserTypography = styled(Typography)({
  padding: 0,
  marginLeft: 13,
})
const DateTypography = styled(Typography)({
  fontSize: 15,
  color: '#07553B',
  textAlign: 'right',
  marginBottom: 10,
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
//======================================================
export default DiaryModify