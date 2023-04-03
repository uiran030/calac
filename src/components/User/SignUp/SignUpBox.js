import React, {useState} from 'react';
import { Box, Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
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
        <FormControl sx={{width:'40%'}}>
          <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
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
        </FormControl>
        <InnerInput id="outlined-basic" label="핸드폰번호" variant="outlined" />
        <Button variant="contained" sx={{width:'40%', height:'50px'}}>가입하기</Button>
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
  width:'100%', 
  alignItems:'center'
});
const InnerInput = styled(TextField)({
  width:'40%',
  marginBottom:'20px'
});
//======================================================
export default SignUpSection;