import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const FindPwBox = () => {
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
  //==============================================
  const [identification, setIdentification] = useState({
    id: "",
    quiz: "",
    answer: "",
  });

  const handleIdentification = (e) => {
    setIdentified({
      message: "본인확인을 진행해주세요.",
      boolean: false,
    });
    setNewPwd({ pwd: "", pwdCheck: "" });
    setIdentification((preIdentification) => ({
      ...preIdentification,
      [e.target.name]: e.target.value,
    }));
  };

  const allValuesNotEmpty = Object.values(identification).every(
    (val) => val !== ""
  );

  const [identified, setIdentified] = useState({ message: "", boolean: false });
  //==============================================
  const [newPwd, setNewPwd] = useState({ pwd: "", pwdCheck: "" });
  const handleNewPwd = (e) => {
    setNewPwd((preNewPwd) => ({
      ...preNewPwd,
      [e.target.name]: e.target.value,
    }));
  };
  // 패스워드 UI 관련 ===========================
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFindPw = () => {
    axios
      .get(
        `http://localhost:5000/users/findPw?inputId=${identification.id}&inputQuiz=${identification.quiz}&inputAnswer=${identification.answer}`
      )
      .then((response) => {
        // console.log("되겠지", response);
        if (response.data) {
          setIdentified({
            message: "본인 확인이 완료되었습니다.",
            boolean: response.data,
          });
        } else {
          setIdentified({
            message: "일치하는 정보가 없습니다.",
            boolean: response.data,
          });
        }
        // if (response.data.length === 0) {
        //   setFoundId(`일치하는 정보가 없습니다.`);
        // } else
        //   setFoundId(`귀하의 아이디는 ${response.data[0].user_id} 입니다.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // axios // 새 이벤트 DB에 UPDATE
  //   .put(`http://localhost:5000/scheduler/update/${updatedEvent.id}`, {
  //     title: title,
  //     start: start,
  //     end: end,
  //     color: color,
  //     locale: locale,
  //   })
  //   .then((response) => {
  //     // 성공시 UI에도 바로 반영
  //     setOpenEdit(false); // 일단 편집모달 닫기

  //     const test = currentEvents.filter(
  //       // 업데이트 하려하는 기존 데이터 삭제
  //       (item) => item.id !== parseInt(updatedEvent.id)
  //       // 주의! DB에서 나온 id 데이터들은 정수형이고, 브라우저에서 추가될떄...
  //     );

  //     setCurrentEvents(() => [
  //       // 업데이트된 정보로 재생성
  //       ...test,
  //       {
  //         id: response.data.id,
  //         title: response.data.title,
  //         start: response.data.start,
  //         end: response.data.end,
  //         color: response.data.color,
  //         locale: response.data.locale,
  //         // allDay: false,
  //       },
  //     ]);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // 비밀번호 변경 ==============================
  const changePw = () => {
    axios // 새 이벤트 DB에 UPDATE
      .put(`http://localhost:5000/users/findPw/changePw`, {
        id: identification.id,
        newPwd: newPwd.pwd,
      })
      .then((response) => {
        if (
          window.confirm(
            `비밀번호가 변경 되었습니다. 로그인 창으로 이동하시겠습니까?`
          )
        ) {
          setIdentified({
            message: "",
            boolean: false,
          });
          setIdentification({
            id: "",
            quiz: "",
            answer: "",
          });
          setNewPwd({
            pwd: "",
            pwdCheck: "",
          });
          window.close();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // ===========================================

  // ==========================================
  console.log(identification);
  console.log(newPwd);
  return (
    <PwBoxWrap>
      <Typography color='primary' fontWeight={700} fontSize='20px'>
        비밀번호 찾기
      </Typography>
      <Typography fontSize='12px' color='red'>
        정책상 기존의 비밀번호를 찾기는 불가능합니다. <br />
        본인확인 후 비밀번호 변경을 진행합니다.
      </Typography>
      <Box display='flex' flexDirection='column' gap={1}>
        <TextField
          id='outlined-basic'
          label='아이디'
          variant='outlined'
          fullWidth
          size='small'
          name='id'
          value={identification.id}
          onChange={handleIdentification}
          required
        />
        <TextField
          id='outlined-select-currency'
          select
          label='질문'
          defaultValue=''
          // value={identification.id}
          fullWidth
          required
          variant='outlined'
          size='small'
          name='quiz'
          onChange={handleIdentification}
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
          variant='outlined'
          value={identification.answer}
          fullWidth
          required
          size='small'
          name='answer'
          onChange={handleIdentification}
        />
      </Box>
      <Button
        disabled={!allValuesNotEmpty}
        onClick={handleFindPw}
        variant='contained'
        fullWidth
      >
        본인 확인
      </Button>
      <Typography textAlign='center'>
        {identified.message && identified.message}
      </Typography>
      <Box
        position='relative'
        display={identified.boolean ? "flex" : "none"}
        justifyContent='space-between'
      >
        <Box display='flex' flexDirection='column' gap={1}>
          <FormControl variant='outlined' fullWidth size='small'>
            <InputLabel htmlFor='outlined-adornment-password'>
              새 비밀번호 *
            </InputLabel>
            <OutlinedInput
              name='pwd'
              value={newPwd.pwd}
              onChange={handleNewPwd}
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
                onChange={handleNewPwd}
                value={newPwd.pwdCheck}
                error={newPwd.pwd === newPwd.pwdCheck ? false : true}
                // helperText={
                //   newPwd.pwd === newPwd.pwdCheck
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
              color={newPwd.pwd === newPwd.pwdCheck ? "green" : "red"}
            >
              {newPwd.pwd || newPwd.pwdCheck
                ? newPwd.pwd === newPwd.pwdCheck
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."
                : "새 비밀번호를 입력해주세요"}
            </Typography>
          </Box>
        </Box>
        <Button
          disabled={
            identified.boolean && (newPwd.pwd || newPwd.pwdCheck)
              ? newPwd.pwd === newPwd.pwdCheck
                ? false
                : true
              : true
          }
          variant='contained'
          sx={{ height: "87px", width: "100px" }}
          onClick={changePw}
        >
          변경
        </Button>
      </Box>
      {/* 현재는 스크롤이 존재하지만 위에서 한문장 제거하고나면 충분히 한 화면안에 들어옵니다! */}
      <Button
        onClick={() => {
          window.close();
        }}
        fullWidth
        // variant='contained'
        sx={{ position: "absolute", bottom: "20px", left: "0" }}
      >
        닫기
      </Button>
    </PwBoxWrap>
  );
};
//style=================================================
const PwBoxWrap = styled(Box)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "space-between",
  gap: "10px",
  height: "100%",
});
const FindValueBox = styled(Box)({
  // marginTop: "40px",
  textAlign: "center",
});
//======================================================
export default FindPwBox;
