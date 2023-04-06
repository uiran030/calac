import React, { useState, useEffect } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Modal, Tab, Typography, Button, FormControl, Input, InputAdornment, IconButton, TextField } from '@mui/material';
import { styled } from "@mui/material/styles";
import ApexCharts from 'react-apexcharts';
import axios from 'axios'; 
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const LedgerGoalGraph = () => {
  const [open, setOpen] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [monthlyGoalData, setMonthlyGoalData] = useState({});
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [money, setMoney] = useState(false);
  const [totalCountData, setTotalCountData] = useState(false);
  //======================================================
  // + 버튼 : 모달창 열림
  const handleClick = () => { setOpen(true) }
  //======================================================
  // 모달창 닫기
  const handleClose = () => setOpen(false);
  //======================================================
  // 모달창 저장버튼
  const handleSave = () => setOpen(false);
  //======================================================
  const hadleGoalMoney = (e) => {
    const goalMoneyValue = e.target.value;
    console.log('goal', goalMoneyValue)
  }
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/ledger/goal')
    .then((res) => {
      setMonthlyGoalData(res.data[0]);
      setCreated(res.data[0]['money_createdAt']);
      setUpdated(res.data[0]['money_updatedAt']);
      setMoney(res.data[0]['money_count']);
    })
  }, []);
  //======================================================
  const type = 'expense'
  useEffect(() => {
    axios.get(`http://localhost:5000/ledger/total?type=${type}`)
    .then((res) => {
      console.log('res', res.data[0])
      res.data[0][0]['sum_count'] !== null ? (
        setTotalCountData(res.data[0][0]['sum_count'])
      ) : (
        setTotalCountData(0)
      );
    })
  }, []);
  //======================================================
  const change_money = money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const goalPercent = Math.round(totalCountData/money*100);
  //======================================================
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + ( today.getMonth() + 1 )).slice(-2);
  let currentMonth = year+'년'+month+"월";
  //======================================================
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  //======================================================
  const state = {
    series: [goalPercent],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          }
        },
      },
      colors:['#3ed65d'],
      labels: [`예산 : ${change_money}`],
    },
  };
  //======================================================
  return (
    <ChartWrap>
      <IconButton aria-label="add">
        <AddIcon onClick={()=>{handleClick()}}/>
      </IconButton>
      <ApexCharts
        options={state.options}
        series={state.series}
        type="radialBar"
        height="90%"
        width="100%"
      />

      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
      >
      <Box sx={style}>
        <ModalTitle>
          {currentMonth} 목표 지출액
          <CloseIcon onClick={() => setOpen(false)}/>
        </ModalTitle>
        {monthlyGoalData !== undefined ? (
          <Box>
            {!openInput ? (
              <TextField
                id="outlined-read-only-input"
                defaultValue={change_money}
                InputProps={{
                  readOnly: true,
                }}
                sx={{marginBottom:'10px'}}
              />
            ) : (
              <TextField
                required
                id="outlined-required"
                label="수정가능합니다."
                defaultValue={change_money}
                autoFocus={true}
                sx={{marginBottom:'10px'}}
              />
            )}
            {created === updated ? (
              <Typography>
                마지막 수정일 : {(created || "").split("T")[0]}
              </Typography>
            ) : (
              <Typography>
                마지막 수정일 : {(updated || "").split("T")[0]}
              </Typography>
            )}
          </Box>
        ) : (
          <Typography sx={{marginBottom:'10px'}}>
            현재 목표액을 설정하지않았습니다.
          </Typography>
        )}
        {!openInput ? (
          <Button 
          variant="contained"
          sx={{width:'50%', marginTop:'30px'}}
          onClick={() => {setOpenInput(true)}}
          >
            수정
          </Button>
        ) : (
          <Button 
            variant="contained"
            sx={{width:'50%', marginTop:'30px'}}
            onClick={() => {setOpenInput(false)}}
          >
            취소
          </Button>
        ) }
        <Button 
          variant="contained"
          sx={{width:'50%', marginTop:'30px'}}
          onClick={() => {handleSave()}}
        >
          저장
        </Button>
      </Box>
      </Modal>
    </ChartWrap>
  );
};
//style=================================================
const ChartWrap = styled(Box)({
  position:'relative',
  width:'30%',
  border:'1px solid #ddd',
  position:'relative'
});
const ModalTitle = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:'20px'
});
//======================================================
export default LedgerGoalGraph;