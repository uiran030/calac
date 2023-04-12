import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const FindIdPwBox = () => {
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
  const [foundId, setFoundId] = useState("");

  const [findIdInfo, setFindIdInfo] = useState({
    name: "",
    emailId: "",
    emailDomains: "",
  });

  const handleFindIdInfo = (e) => {
    setFindIdInfo((prevFindIdInfo) => ({
      ...prevFindIdInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const allValuesNotEmpty = Object.values(findIdInfo).every(
    (val) => val !== ""
  );

  //=========================================
  const handleFindId = () => {
    axios
      .get(
        `http://localhost:5000/users/findId?name=${findIdInfo.name}&emailId=${findIdInfo.emailId}&emailDomains=${findIdInfo.emailDomains}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setFoundId(`일치하는 정보가 없습니다.`);
        } else
          setFoundId(`귀하의 아이디는"${response.data[0].user_id}" 입니다.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
<<<<<<< HEAD
  console.log(foundId);
  //======================================================
=======
  //====================================================
  //##########################################################################################
>>>>>>> parent of b783cc8 (Merge branch 'work/euiran' into develop)
  return (
    <IdBoxWrap>
      <Typography color='primary' fontWeight={700} fontSize='20px'>
        아이디 찾기
      </Typography>
      <TextField
        id='outlined-basic'
        label='성명'
        name='name'
        variant='outlined'
        fullWidth
        size='small'
        onChange={handleFindIdInfo}
        required
      />
      <Box display='flex' alignItems='center' sx={{ width: "100%" }}>
        <TextField
          id='outlined-basic'
          label='이메일 아이디'
          name='emailId'
          variant='outlined'
          fullWidth
          required
          size='small'
          onChange={handleFindIdInfo}
        />
        <Typography marginX='10px'>@</Typography>
        <TextField
          id='outlined-select-currency'
          select
          label='도메인'
          defaultValue=''
          fullWidth
          required
          name='emailDomains'
          variant='outlined'
          size='small'
          onChange={handleFindIdInfo}
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
      <Button
        disabled={!allValuesNotEmpty}
        onClick={handleFindId}
        variant='contained'
        fullWidth
        size='large'
      >
        아이디 찾기
      </Button>
      <FindValueBox>{foundId && foundId}</FindValueBox>
      <Button
        onClick={() => {
          window.close();
        }}
        fullWidth
        sx={{ position: "absolute", bottom: "20px", left: "0" }}
      >
        닫기
      </Button>
    </IdBoxWrap>
  );
};
//style=================================================
const IdBoxWrap = styled(Box)({
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "100%",
});
const FindValueBox = styled(Box)({
  margin: "40px 0",
  textAlign: "center",
});
//======================================================
export default FindIdPwBox;
