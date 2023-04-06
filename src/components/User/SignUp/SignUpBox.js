import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SignUpBox from "./SignUpBox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const SignUpSection = () => {
  // const [genderValue, setGenderValue] = useState("남성");
  const [signUpInfo, setSignUpInfo] = useState({
    id: "",
    notDuplicated: false,
    pwd: "",
    pwdCheck: "",
    name: "",
    birth: "",
    gender: "남성",
    phone: "",
  });
  //======================================================
  // const handleGender = (e) => {
  //   setGenderValue(e.target.value);
  // };

  const handleNotDuplicated = () => {
    setSignUpInfo({ ...signUpInfo, notDuplicated: true });
  };

  const handleSignUpInfo = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const allValuesNotEmpty = Object.values(signUpInfo).every(
    (val) => val !== ""
  );

  const handleSubmit = () => {
    if (!signUpInfo.notDuplicated) {
      alert("아이디 중복을 확인해주세요.");
      return;
    }
    if (signUpInfo.pwd !== signUpInfo.pwdCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 새 이벤트 DB에 INSERT ======================================================
    const { id, pwd, name, birth, gender, phone } = signUpInfo;
    axios
      .post("http://localhost:5000/users/insert", {
        id,
        pwd,
        name,
        birth,
        gender,
        phone,
      })
      .then((response) => {
        alert("등록성공!");
        // // Add newly created event to calendar
        // setCurrentEvents((currentEvents) => [
        //   // 성공시 UI에도 바로 반영
        //   ...currentEvents,
        //   {
        //     id: response.data.id,
        //     title: response.data.title,
        //     start: response.data.start,
        //     end: response.data.end,
        //     color: response.data.color,
        //     locale: response.data.locale,
        //     // allDay: false,
        //   },
        // ]);
      })
      .catch(() => {
        alert("등록실패");
      })
      .finally(() => {
        // handleClose(); // 새 이벤트 추가 모달 닫기
      });
  };

  //============================================

  // password관련 ===
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ===

  console.log(signUpInfo);
  // ======================================================
  return (
    <BoxWrap component='form' noValidate autoComplete='off'>
      <BoxInner>
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          marginBottom='40px'
        >
          <TextField
            name='id'
            onChange={handleSignUpInfo}
            id='outlined-basic'
            label='아이디'
            variant='outlined'
            fullWidth
            required
          />
          <Button
            variant='outlined'
            sx={{ width: "150px", marginLeft: "20px" }}
            onClick={handleNotDuplicated}
          >
            중복확인
          </Button>
        </Box>
        <FormControl sx={{ width: "100%", mb: "40px" }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            비밀번호 *
          </InputLabel>
          <OutlinedInput
            name='pwd'
            onChange={handleSignUpInfo}
            id='outlined-adornment-password'
            type={showPassword ? "text" : "password"}
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
            label='비밀번호 *'
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mb: "2px" }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            비밀번호 확인 *
          </InputLabel>
          <OutlinedInput
            name='pwdCheck'
            onChange={handleSignUpInfo}
            error={signUpInfo.pwd === signUpInfo.pwdCheck ? false : true}
            // helperText={
            //   signUpInfo.pwd === signUpInfo.pwdCheck
            //     ? "비밀번호 일치합니다."
            //     : "비밀번호 일치하지 않습니다."
            // }
            id='outlined-adornment-password'
            type={showPassword ? "text" : "password"}
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
            label='비밀번호 확인 *'
          />
        </FormControl>

        <Typography
          fontSize='12px'
          width='100%'
          paddingLeft='10px'
          marginBottom='40px'
          color={signUpInfo.pwd === signUpInfo.pwdCheck ? "green" : "red"}
        >
          {signUpInfo.pwd === signUpInfo.pwdCheck
            ? "비밀번호가 일치합니다."
            : "비밀번호가 일치하지 않습니다."}
        </Typography>

        {/* <InnerInput
          name='pwd'
          onChange={handleSignUpInfo}
          id='outlined-basic'
          label='비밀번호'
          variant='outlined'
        />
        <InnerInput
          name='pwdCheck'
          onChange={handleSignUpInfo}
          id='outlined-basic'
          label='비밀번호 확인'
          variant='outlined'
          error={signUpInfo.pwd === signUpInfo.pwdCheck ? false : true}
          helperText={
            signUpInfo.pwd === signUpInfo.pwdCheck
              ? "비밀번호 일치합니다."
              : "비밀번호 일치하지 않습니다."
          }
        /> */}
        <InnerInput
          name='name'
          onChange={handleSignUpInfo}
          id='outlined-basic'
          label='이름'
          variant='outlined'
          required
        />
        <InnerInput
          name='birth'
          onChange={handleSignUpInfo}
          id='outlined-basic'
          label='생년월일'
          variant='outlined'
          required
        />
        <RadioBox>
          <Typography sx={{ width: "20%" }}>성별 *</Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='gender'
            value={signUpInfo.gender}
            onChange={handleSignUpInfo}
          >
            <FormControlLabel value='남성' control={<Radio />} label='남성' />
            <FormControlLabel value='여성' control={<Radio />} label='여성' />
          </RadioGroup>
        </RadioBox>
        <InnerInput
          name='phone'
          onChange={handleSignUpInfo}
          id='outlined-basic'
          label='핸드폰번호'
          variant='outlined'
          required
        />
        <SignBtn
          variant='contained'
          disabled={allValuesNotEmpty ? false : true}
          onClick={handleSubmit}
        >
          가입하기
        </SignBtn>
      </BoxInner>
    </BoxWrap>
  );
};
//style=================================================
const BoxWrap = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});
const BoxInner = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "40%",
  alignItems: "center",
});
const InnerInput = styled(TextField)({
  width: "100%",
  marginBottom: "40px",
});
const RadioBox = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginBottom: "40px",
});
const SignBtn = styled(Button)({
  width: "100%",
  height: "50px",
  fontSize: "20px",
});
//======================================================
export default SignUpSection;
