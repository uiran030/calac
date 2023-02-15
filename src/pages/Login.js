import { Button, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container
      sx={{ width: "100vw", height: "100%", backgroundColor: "black" }}
    >
      로그인 페이지입니다. 음
      <Link to='/login/signup' style={{ textDecoration: "none" }}>
        <Button variant='outlined'> 회원가입</Button>
      </Link>
      <Link to='/login/findidpw' style={{ textDecoration: "none" }}>
        <Button variant='outlined'> ID / PW 찾기</Button>
      </Link>
    </Container>
  );
}
