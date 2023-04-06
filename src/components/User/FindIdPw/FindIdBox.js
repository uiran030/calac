import React from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FindIdPwBox = () => {
  //======================================================
  return (
    <IdBoxWrap>
      <TextField id="outlined-basic" label="이름" variant="outlined" fullWidth />
      <EmailBox>
        <TextField id="outlined-basic" variant="outlined"  size="small"/>
        @
        <TextField id="outlined-basic" variant="outlined"  size="small"/>
      </EmailBox>
      <Button variant="contained" fullWidth>아이디 찾기</Button>
      <FindValueBox>
        <Typography> 해당 값이 있을 때 회원님의 아이디는 ??? 입니다</Typography>
        <Typography> 해당 값이 없을 때 등록되지않은 회원입니다.</Typography>
      </FindValueBox>
      <Button onClick={()=>{window.close()}}>닫기</Button>
    </IdBoxWrap>
  );
};
//style=================================================
const IdBoxWrap = styled(Box)({
  padding:'40px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  height:'100%'
});
const EmailBox = styled(Box)({
  display:'flex',
  alignItems:'center',
  margin:'20px 0'
});
const FindValueBox = styled(Box)({
  marginTop:'40px', 
  textAlign:'center'
});
//======================================================
export default FindIdPwBox;