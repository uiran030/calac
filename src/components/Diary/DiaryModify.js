import React,{useState,useEffect} from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Divider, TextField, Dialog, DialogTitle, DialogContent, Avatar} from "@mui/material";
import axios from 'axios';


const DiaryModify = ({isModifyOpen,setIsModifyOpen,id,posts}) => {
  //======================================================
  console.log("1",isModifyOpen)
  useEffect(()=>{
  },[])
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isModifyOpen}
        onClose={()=>setIsModifyOpen(!isModifyOpen)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogBox>
          <TitleBox>
            <Avatar alt="Remy Sharp" src="/images/avatar.png">
              <UserTypography>{}</UserTypography>
            </Avatar>
            <DialogTitle>{}</DialogTitle>
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