import React,{useState} from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

const FindPwBox = () => {
  const [quiz, setQuiz] = useState('');
  //======================================================
  const handleChange = (event) => {
    setQuiz(event.target.value);
  };
  //======================================================
  const selectQuiz = [
    {
      korean : '어릴적 제일 친한 친구의 이름은?',
      value : 'bestFriend'
    },
    {
      korean : '나의 고향은?',
      value : 'hometown'
    },
    {
      korean : '아버지의 성함은?',
      value : 'father'
    }
  ]
  //======================================================
  return (
    <PwBoxWrap>
      <TextField id="outlined-basic" label="아이디" variant="outlined" fullWidth size='small'/>
      <Box sx={{margin:'20px 0'}}>
        <FormControl fullWidth sx={{marginBottom:'10px'}}>
          <InputLabel id="demo-simple-select-label" size='small'>quiz</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quiz}
            label="Quiz"
            onChange={handleChange}
            size='small'
          >
            {selectQuiz.map(list => {
              return(
                <MenuItem value={list.value}>
                  {list.korean}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <TextField id="outlined-basic" label="답변" variant="outlined" fullWidth size='small'/>
      </Box>
      <Button variant="contained" fullWidth>비밀번호 찾기</Button>
      <FindValueBox>
        <Typography> 해당 값이 있을 때 회원님의 비밀번호는 ??? 입니다</Typography>
        <Typography> 해당 값이 없을 때 등록되지않은 회원입니다.</Typography>
      </FindValueBox>
      {/* 현재는 스크롤이 존재하지만 위에서 한문장 제거하고나면 충분히 한 화면안에 들어옵니다! */}
      <Button onClick={()=>{window.close()}}>닫기</Button>
    </PwBoxWrap>
  );
};
//style=================================================
const PwBoxWrap = styled(Box)({
  padding:'40px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  height:'100%'
});
const EmailBox = styled(Box)({
  display:'flex',
  alignItems:'center',
  margin:'20px 0'
});
const FindValueBox = styled(Box)({
  marginTop:'40px', 
  textAlign:'center'
});
//======================================================
export default FindPwBox;