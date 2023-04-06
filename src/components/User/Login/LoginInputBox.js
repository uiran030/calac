import React from "react";
import { Box, Input, TextField, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ariaLabel = { "aria-label": "description" };

const LoginInputBox = () => {
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFind = (e) => {
    console.log('e', e)
    window.open(`/login/find${e}`, '',  'top=200, left=200, width=400, height=400')
  }

  return (
    <InputBoxWrap>
      <InputInner>
        <Box>
          <TextField id="outlined-basic" label="아이디" variant="outlined" sx={{width:'100%'}}/>
          <FormControl sx={{ width: '100%', mt : 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <BtnWrap>
        <Button variant="contained">로그인</Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="text" aria-label="text button group">
              <Link to='/login/signup'><Button>회원가입</Button></Link>
              <Button onClick={()=>{handleFind('id')}}>아이디 찾기</Button>
              <Button onClick={()=>{handleFind('pw')}}>비밀번호 찾기</Button>
            </ButtonGroup>
          </Box>
        </BtnWrap>
      </InputInner>
    </InputBoxWrap>
  );
};

//style=================================================
const InputBoxWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});
const InputInner = styled(Box)({
  width:'30%',
  height:'30%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between'
});
const BtnWrap = styled(Box)({
  display:'flex',
  flexDirection:'column'
});
//======================================================
export default LoginInputBox;
