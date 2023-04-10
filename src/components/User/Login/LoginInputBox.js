import React, { useState } from "react";
import {
  Box,
  Input,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { postData } from "../../../redux/index";
import { connect, useDispatch } from "react-redux";

const LoginInputBox = ({ postData }) => {
  // 리덕스 =========

  //================
  // 비밀번호 UI =====================================
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ===============================================
  // 아이디비번 찾기 새 창으로 띄우기 =================
  const handleFind = (e) => {
    window.open(
      `/login/find${e}`,
      "",
      "top=200, left=200, width=400, height=500"
    );
  };
  // ================================================
  // 입력값 상태관리 =================================
  const [loginInfo, setLoginInfo] = useState({ id: "", pwd: "" });
  const handleLoginInfo = (e) => {
    setLoginInfo((preLoginInfo) => ({
      ...preLoginInfo,
      [e.target.name]: e.target.value,
    }));
  };
  // ================================================
  // 로그인 ==========================================
  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:5000/users/login`,
        {
          id: loginInfo.id,
          pwd: loginInfo.pwd,
        },
        { withCredentials: true }
      )
      .then((response) => {
        postData(response.data);
        console.log("로그인 결과", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ================================================
  console.log(loginInfo);
  return (
    <InputBoxWrap>
      <InputInner>
        <Box>
          <TextField
            id='outlined-basic'
            label='아이디'
            variant='outlined'
            sx={{ width: "100%" }}
            name='id'
            onChange={handleLoginInfo}
          />
          <FormControl sx={{ width: "100%", mt: 2 }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              비밀번호
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? "text" : "password"}
              name='pwd'
              onChange={handleLoginInfo}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </Box>
        <BtnWrap>
          <Button onClick={handleSubmit} variant='contained'>
            로그인
          </Button>
          {/* test */}
          {/* <Typography>{newLogin && newLogin.name}</Typography> */}
          {/*  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant='text' aria-label='text button group'>
              <Link to='/login/signup'>
                <Button>회원가입</Button>
              </Link>
              <Button
                onClick={() => {
                  handleFind("id");
                }}
              >
                아이디 찾기
              </Button>
              <Button
                onClick={() => {
                  handleFind("pw");
                }}
              >
                비밀번호 찾기
              </Button>
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
  width: "30%",
  height: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
const BtnWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
// Redux ===============================================

const mapDispatchToProps = {
  postData: (data) => postData(data),
};

//======================================================
// export default LoginInputBox;
export default connect(null, mapDispatchToProps)(LoginInputBox);
