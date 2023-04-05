import React, {useState} from 'react';
import { Box, Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SignUpBox from './SignUpBox';
import { style } from 'd3';

const SignUpSection = () => {
  const [genderValue, setGenderValue] = useState('남성');
  //======================================================
  const handleGender = (e) => {
    setGenderValue(e.target.value)
  };
  //======================================================
  return (
    <BoxWrap
      component="form"
      noValidate
      autoComplete="off"
    >
      <BoxInner>
        <InnerInput id="outlined-basic" label="아이디" variant="outlined"/>
        <InnerInput id="outlined-basic" label="비밀번호" variant="outlined"/>
        <InnerInput id="outlined-basic" label="이름" variant="outlined"/>
        <InnerInput id="outlined-basic" label="생년월일" variant="outlined"/>
        <RadioBox>
          <Typography sx={{width:'20%'}}>성별</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={genderValue}
            onChange={handleGender}
          >
            <FormControlLabel value="남성" control={<Radio />} label="남성" />
            <FormControlLabel value="여성" control={<Radio />} label="여성" />
          </RadioGroup>
        </RadioBox>
        <InnerInput id="outlined-basic" label="핸드폰번호" variant="outlined" />
        <SignBtn variant="contained">가입하기</SignBtn>
      </BoxInner>
    </BoxWrap>
  );
};
//style=================================================
const BoxWrap = styled(Box)({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  height:'100%'
});
const BoxInner = styled(Box)({
  display:'flex',
  flexDirection:'column', 
  width:'40%', 
  alignItems:'center'
});
const InnerInput = styled(TextField)({
  width:'100%',
  marginBottom:'40px'
});
const RadioBox = styled(Box)({
  width:'100%',
  display:'flex',
  alignItems:'center',
  marginBottom:'40px'
});
const SignBtn = styled(Button)({
  width:'100%',
  height:'50px',
  fontSize:'20px'
});
//======================================================
export default SignUpSection;