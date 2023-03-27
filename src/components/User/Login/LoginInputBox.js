import React from "react";
import { Box, Input, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const ariaLabel = { "aria-label": "description" };

const LoginInputBox = () => {
  return (
    <InputBoxWrap
      component='form'
      noValidate
      autoComplete='off'
      sx={{ color: "secondary" }}
    >
      <TextField
        id='outlined-basic'
        label='아이디'
        variant='outlined'
        color='secondary'
        sx={{ color: "white" }}
      />
      <TextField
        id='outlined-basic'
        label='비밀번호'
        variant='outlined'
        color='secondary'
      />
      <LoginBtn>로그인</LoginBtn>
      <MoreBtn>
        <Link to='/login/signup' style={{ textDecoration: "none" }}>
          <Button variant='outlined' color='secondary'>
            회원가입
          </Button>
        </Link>
        <Link to='/login/findidpw' style={{ textDecoration: "none" }}>
          <Button variant='outlined' color='secondary'>
            ID / PW 찾기
          </Button>
        </Link>
      </MoreBtn>
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
  color: "white",
});
const LoginBtn = styled(Button)({
  background: "white",
  marginTop: "40px",
});
const MoreBtn = styled(Button)({
  marginTop: "20px",
});
//======================================================
export default LoginInputBox;
