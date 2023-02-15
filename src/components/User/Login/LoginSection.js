import React from 'react';
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const LoginSection = () => {
  return (
    <Container
      sx={{ width: "100vw", height: "100%", backgroundColor: "black" }}
    >
      <Link to='/login/signup' style={{ textDecoration: "none" }}>
        <Button variant='outlined'> 회원가입</Button>
      </Link>
      <Link to='/login/findidpw' style={{ textDecoration: "none" }}>
        <Button variant='outlined'> ID / PW 찾기</Button>
      </Link>
    </Container>
  );
};

export default LoginSection;