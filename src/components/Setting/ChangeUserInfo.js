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
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const ChangeUserInfo = ({ login }) => {
  //
  const [sessionUserInfo, setSessionUserInfo] = useState();
  // 브라우저에 저장된 쿠키를 받아오는 함수  =========================
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  //=================================================================
  //서버 세션객체에 저장되어 있는 정보를 가져옴 ========================
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/user-info", {
        // 브라우저에 저장되어있는 쿠키를 참조해서 권한 획득
        headers: {
          Authorization: `Bearer ${getCookie("sid")}`,
        },
        // 서버와 포트가 달라 CORS를 사용했기 때문에 withCredentials 명시해야함.
        //이 속성을 true로 설정하면 브라우저는 쿠키를 포함한 인증 정보를 서버에게 전달
        withCredentials: true,
      })
      .then((response) => {
        const { success, userInfo } = response.data;
        if (success) {
          console.log("세션객체", userInfo); // 성공적으로 유저 정보를 받아온 경우 userInfo 출력
          setSessionUserInfo(userInfo);
        } else {
          console.log("세션객체 Unauthorized"); // 유저 정보가 없는 경우 Unauthorized 출력
        }
      })
      .catch((error) => {
        console.log(error); // 에러 발생 시 에러 메시지 출력
      });
  }, []);

  console.log("이상무!!!!", sessionUserInfo);

  // ==============================================================

  const [signUpInfo, setSignUpInfo] = useState({
    id: "",
    notDuplicated: false,
    pwd: "",
    pwdCheck: "",
    name: "",
    birth: "",
    gender: "남성",
    phone: "",
    quiz: "",
    answer: "",
    emailId: "",
    emailDomains: "",
  });
  //======================================================
  const selectQuiz = [
    {
      label: "어릴적 제일 친한 친구의 이름은?",
      value: "bestFriend",
    },
    {
      label: "나의 고향은?",
      value: "hometown",
    },
    {
      label: "아버지의 성함은?",
      value: "father",
    },
  ];
  //======================================================
  const emailDomains = [
    { label: "gmail.com", value: "@gmail.com" },
    { label: "naver.com", value: "@naver.com" },
    { label: "daum.net", value: "@daum.net" },
    { label: "hanmail.net", value: "@hanmail.net" },
    { label: "hotmail.com", value: "@hotmail.com" },
    { label: "yahoo.com", value: "@yahoo.com" },
    { label: "nate.com", value: "@nate.com" },
    { label: "kakao.com", value: "@kakao.com" },
    { label: "icloud.com", value: "@icloud.com" },
    { label: "outlook.com", value: "@outlook.com" },
  ];
  //======================================================
  // // const handleGender = (e) => {
  // //   setGenderValue(e.target.value);
  // // };

  const handleSignUpInfo = (e) => {
    // 중복확인 받고나서 다시 아이디 변경할 경우 대비한 조건문
    if (e.target.name === "id") {
      setSignUpInfo((prevSignUpInfo) => ({
        ...prevSignUpInfo,
        notDuplicated: false,
      }));
    }
    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [e.target.name]: e.target.value,
    }));
  };

  // 객체의 값중에 빈 문자열이 있는지 확인( boolean 자료형의 값이 할당 됨)
  const allValuesNotEmpty = Object.values(signUpInfo).every(
    (val) => val !== ""
  );

  const navigate = useNavigate();

  // 회원가입 정보 DB에 INSERT ======================================================
  const handleSubmit = () => {
    if (!signUpInfo.notDuplicated) {
      alert("아이디 중복을 확인해주세요.");
      return;
    }
    if (signUpInfo.pwd !== signUpInfo.pwdCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const {
      id,
      pwd,
      name,
      birth,
      gender,
      phone,
      quiz,
      answer,
      emailId,
      emailDomains,
    } = signUpInfo;
    axios
      .post("http://localhost:5000/users/insert", {
        id,
        pwd,
        name,
        birth,
        gender,
        phone,
        quiz,
        answer,
        emailId,
        emailDomains,
      })
      .then((response) => {
        if (
          window.confirm(
            `가입이 완료되었습니다. 로그인 창으로 이동하시겠습니까?`
          )
        ) {
          navigate("/login");
          setSignUpInfo({
            id: "",
            notDuplicated: false,
            pwd: "",
            pwdCheck: "",
            name: "",
            birth: "",
            gender: "남성",
            phone: "",
            quiz: "",
            answer: "",
            emailId: "",
            emailDomains: "",
          });
        }
      })
      .catch(() => {
        alert("가입 실패 관리자에게 문의하세요.");
      })
      .finally(() => {});
  };

  //============================================
  //아이디 중복확인 =============================
  const handleNotDuplicated = () => {
    axios
      .get(`http://localhost:5000/users/duplicatedId?inputId=${signUpInfo.id}`)
      .then((response) => {
        console.log("하아잇", response.data);
        if (response.data.length === 0) {
          alert("사용 가능한 아이디 입니다.");
          setSignUpInfo((prevSignUpInfo) => ({
            ...prevSignUpInfo,
            notDuplicated: true,
          }));
        } else {
          alert("이미 존재하는 아이디 입니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //============================================
  // 패스워드 UI 관련 ===========================
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // ==========================================
  // console.log(signUpInfo);
  return (
    <BoxWrap component='form' noValidate autoComplete='off'>
      <BoxInner>
        <Typography
          color='primary'
          fontWeight={700}
          fontSize='20px'
          marginBottom='30px'
        >
          회원 정보 수정
        </Typography>
        <TextField
          name='id'
          value={(sessionUserInfo && sessionUserInfo.id) || ""}
          onChange={handleSignUpInfo}
          id='outlined-basic'
          label='아이디'
          variant='outlined'
          fullWidth
          required
          size='small'
          disabled
        />
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          // marginBottom='40px'
        >
          <FormControl variant='outlined' fullWidth size='small'>
            <InputLabel htmlFor='outlined-adornment-password'>
              기존 비밀번호 *
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
              label='기존 비밀번호 *'
            />
          </FormControl>
          <Button
            variant='outlined'
            sx={{ width: "30px", marginLeft: "10px" }}
            onClick={handleNotDuplicated}
          >
            확인
          </Button>
        </Box>
        <FormControl variant='outlined' fullWidth size='small'>
          <InputLabel htmlFor='outlined-adornment-password'>
            새 비밀번호 *
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
            label='새 비밀번호 *'
          />
        </FormControl>
        <Box sx={{ width: "100%" }}>
          <FormControl
            sx={{ mb: "2px" }}
            variant='outlined'
            fullWidth
            size='small'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              새 비밀번호 확인 *
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
              label='새 비밀번호 확인 *'
            />
          </FormControl>

          <Typography
            fontSize='12px'
            width='100%'
            paddingLeft='10px'
            // marginBottom='40px'
            color={signUpInfo.pwd === signUpInfo.pwdCheck ? "green" : "red"}
          >
            {signUpInfo.pwd === signUpInfo.pwdCheck
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </Typography>
        </Box>
        <InnerInput
          name='name'
          onChange={handleSignUpInfo}
          value={(sessionUserInfo && sessionUserInfo.name) || ""}
          id='outlined-basic'
          label='성명'
          variant='outlined'
          required
          size='small'
        />
        <InnerInput
          name='birth'
          onChange={handleSignUpInfo}
          value={(sessionUserInfo && sessionUserInfo.birth) || ""}
          id='outlined-basic'
          label='생년월일'
          variant='outlined'
          required
          size='small'
        />
        <RadioBox>
          <Typography sx={{ width: "20%" }}>성별 *</Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='gender'
            value={(sessionUserInfo && signUpInfo.gender) || ""}
            onChange={handleSignUpInfo}
          >
            <FormControlLabel value='남성' control={<Radio />} label='남성' />
            <FormControlLabel value='여성' control={<Radio />} label='여성' />
          </RadioGroup>
        </RadioBox>
        <InnerInput
          name='phone'
          onChange={handleSignUpInfo}
          value={(sessionUserInfo && sessionUserInfo.phone) || ""}
          id='outlined-basic'
          label='전화번호'
          variant='outlined'
          required
          size='small'
        />
        {/*  */}
        <TextField
          id='outlined-select-currency'
          select
          label='질문'
          defaultValue=''
          value={(sessionUserInfo && sessionUserInfo.quiz) || ""}
          fullWidth
          required
          name='quiz'
          onChange={handleSignUpInfo}
          variant='outlined'
          size='small'
          // value={currentCategory && currentCategory} // 필요 없는듯,..?
          // sx={{ width: "200px" }}
        >
          {selectQuiz.map((option, index) => (
            <MenuItem key={index} value={option.value && option.value}>
              <Box display='flex' alignItems='center'>
                <Typography>{option.label}</Typography>
              </Box>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id='outlined-basic'
          label='답변'
          name='answer'
          onChange={handleSignUpInfo}
          value={(sessionUserInfo && sessionUserInfo.answer) || ""}
          variant='outlined'
          fullWidth
          required
          size='small'
        />
        <Box display='flex' alignItems='center' sx={{ width: "100%" }}>
          <TextField
            id='outlined-basic'
            label='이메일 아이디'
            name='emailId'
            onChange={handleSignUpInfo}
            value={
              (sessionUserInfo && sessionUserInfo.email.split("@")[0]) || ""
            }
            variant='outlined'
            fullWidth
            required
            size='small'
          />
          <Typography marginX='10px'>@</Typography>
          <TextField
            id='outlined-select-currency'
            select
            label='도메인'
            defaultValue=''
            value={
              (sessionUserInfo && "@" + sessionUserInfo.email.split("@")[1]) ||
              ""
            }
            fullWidth
            required
            name='emailDomains'
            onChange={handleSignUpInfo}
            variant='outlined'
            size='small'
            // value={currentCategory && currentCategory} // 필요 없는듯,..?
            // sx={{ width: "200px" }}
          >
            {emailDomains.map((option, index) => (
              <MenuItem key={index} value={option.value && option.value}>
                <Box display='flex' alignItems='center'>
                  <Typography>{option.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/*  */}
        <SignBtn
          variant='contained'
          disabled={!allValuesNotEmpty}
          onClick={handleSubmit}
        >
          가입하기
        </SignBtn>
        <Box display='flex' marginTop='10px'>
          <Typography color='grey'>
            Already registered?&nbsp;&nbsp;&nbsp;
          </Typography>
          <Link to='/login'>
            <Typography color='green' sx={{ cursor: "pointer" }}>
              login
            </Typography>
          </Link>
        </Box>
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
  gap: "10px",
});
const InnerInput = styled(TextField)({
  width: "100%",
  // marginBottom: "40px",
});
const RadioBox = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  // marginBottom: "40px",
});
const SignBtn = styled(Button)({
  width: "100%",
  height: "50px",
  fontSize: "20px",
});

//리덕스========

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(ChangeUserInfo);
