import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup,ToggleButtonGroup,ToggleButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LedgerTotalList = () => {
  const [tabValue, setTabValue] = useState('expense');
  const [monthlyData, setMonthlyData] = useState([]);
  //======================================================
  let type = 'expense';
  const handleTabValue = (event, value) => { 
    if (value !== null ) { setTabValue(value); }
  };
  type = tabValue;
  //======================================================
  useEffect(() => {
    axios.get(`http://localhost:5000/ledger?type=${type}`)
    .then((res) => {
      setMonthlyData(res.data[1]);
    })
  }, [tabValue]);
  console.log('monthlyData', monthlyData);
  //=====================================================
  const handleDelete = (index) => {
    if (window.confirm(`해당 데이터를 완전히 삭제하시겠습니까?`) == true) {
      axios.delete(`http://localhost:5000/ledger/delete/${index}`)
    } else {
      alert('취소하셨습니다.')
    }
  }
  //=====================================================
  return (
    <LedgerTotalWrap>
      <ToggleButtonGroup
        value={tabValue}
        exclusive
        onChange={handleTabValue}
        aria-label='text alignment'
        sx={{ width: "100%", height:'50px' }}
      >
        <ToggleButton
          value='expense'
          aria-label='left aligned'
          sx={{ width: "50%" }}
        >
          지출
        </ToggleButton>
        <ToggleButton
          value='income'
          aria-label='centered'
          sx={{ width: "50%" }}
        >
          수입
        </ToggleButton>
      </ToggleButtonGroup>
      <ListBox>
        <ListTableTop>
          <Typography sx={{width:'20%'}}>카테고리</Typography>
          <Typography sx={{width:'20%'}}>설명</Typography>
          <Typography sx={{width:'20%'}}>가격</Typography>
          <Typography sx={{width:'25%'}}>작성일</Typography>
          <Typography sx={{width:'5%'}}>기능</Typography>
        </ListTableTop>
        <ListTableWrap>
          {monthlyData && monthlyData.map(data => (
            <ListTableBox>
              <Typography sx={{width:'20%'}}>{data.ledger_category}</Typography>
              <Typography sx={{width:'20%'}}>{data.ledger_description}</Typography>
              <Typography sx={{width:'20%'}}>{data.ledger_count}</Typography>
              <Typography sx={{width:'25%'}}>
                {data.ledger_createdAt.split("T")[0]}
                {/* {(data.ledger_createdAt).toString()}  시간 잘못 보이는것 수정해야함*/}
              </Typography>
              <Box sx={{width:'15%', display:'flex'}}>
                <Button sx={{width:'50%'}}><EditIcon/></Button>
                <Button 
                  sx={{width:'50%'}}
                  onClick={()=>handleDelete(data.ledger_no)}
                >
                  <DeleteIcon/>
                </Button>
              </Box>
            </ListTableBox>
          ))}
        </ListTableWrap>
      </ListBox>
      
    </LedgerTotalWrap>
  );
};
//style=================================================
const LedgerTotalWrap = styled(Box)({
  height:'calc(100vh - 110px)',
  padding:'50px'
});
const ListBox = styled(Box)({
  border:'1px solid #ddd',
  marginTop:'10px',
  height:'calc(100% - 50px)',
});
const ListTableTop = styled(Box)({
  height:'50px', 
  width:'100%',
  borderBottom:'1px solid #ddd',
  display:'flex',
  alignItems:'center',
  padding:'5px'
});
const ListTableWrap = styled(Box)({
  height:'calc(100% - 50px)',
  overflowY:'scroll',
  padding:'5px'
});
const ListTableBox = styled(Box)({
  display:'flex',
  alignItems:'center',
  height:'70px',
});
//======================================================
export default LedgerTotalList;