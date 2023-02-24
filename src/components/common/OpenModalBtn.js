import React, {useState} from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Modal, Tab, Typography, Button, FormControl, Input, InputAdornment, TextField } from '@mui/material';
import { styled } from "@mui/material/styles"; 
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PaymentsIcon from '@mui/icons-material/Payments';
import CloseIcon from '@mui/icons-material/Close';

const BottomLedgerButton = () => {
  const modalData = [];
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState('food');
  const [choiceModal, setChoiceModal] = useState(false);
  const [count, setCount] = useState(false);
  const [description, setDescription] = useState(false);

  const actions = [
    { icon: <PaymentsIcon />, name: '지출', value:'expense' },
    { icon: <AddCircleOutlineIcon />, name: '수입', value:'income' }
  ];
  
  // 모달창 닫기
  const handleClose = () => setOpen(false);
  // 카테고리 고르기
  const handleChange = (e, value) => { setTabValue(value); };
  // 지출/수입 모달 고른 후 클릭했을 때
  const handleChoiceModal = event => {
    setOpen(true);
    setCount(false);
    setDescription(false);
    setChoiceModal(event);
  };
  // 설명 입력창 (수정 필요)
  const hadleDescription = (e) => {
    const descriptionValue = e.target.value;
    setDescription(descriptionValue);
    if (!descriptionValue){
      setCount(descriptionValue);
    } else {
      setCount(false);
    }
  };
  // 금액 입력창
  const hadleCount = (e) => {
    const countValue = e.target.value;
    setCount(countValue);
    const checkNum =  /^[0-9]*$/;
    if (!checkNum.test(countValue)){
      alert('숫자만 입력해주세요.');
      setCount(false);
    } else {
      setCount(countValue);
    }
  };
  // 저장 버튼 클릭 시
  const handleSave = () => {
    modalData.push({choiceModal, count, description});
    setOpen(false);
    console.log('modalData', modalData);
  };
  

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

  return (
    <BtnWrap>
      <SpeedDial
        ariaLabel="Add count"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<ArrowUpwardIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=> {handleChoiceModal(action.value)}}
          />
        ))}
      </SpeedDial>
      
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <ModalTitle>
            {choiceModal === 'expense' ?
              (
                <Typography id="expense" variant="h6" component="h2">
                  지출
                </Typography>
              ):
              (
                <Typography id="income" variant="h6" component="h2">
                  수입
                </Typography>
              )
            }
            
            <CloseIcon onClick={() => setOpen(false)}/>
          </ModalTitle>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: { xs: 320, sm: 480 },
              bgcolor: 'background.paper',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              <Tab sx={{padding:'0px'}} label="식비" value='food'/>
              <Tab sx={{padding:'0px'}} label="통신비" value='phone'/>
              <Tab sx={{padding:'0px'}} label="쇼핑" value='shopping'/>
              <Tab sx={{padding:'0px'}} label="보험비" value='insuranceFee'/>
              <Tab sx={{padding:'0px'}} label="병원/약국" value='hospital/pharmacy'/>
              <Tab sx={{padding:'0px'}} label="간식비" value='dessert'/>
              <Tab sx={{padding:'0px'}} label="반료묘/견" value='pet'/>
              <Tab sx={{padding:'0px'}} label="추가 카테고리" value='addCategory'/>
            </Tabs>
          </Box>
          <Box sx={{mt:3, textAlign:'right'}}>
            <Input
              id="money"
              startAdornment={<InputAdornment position="start">설명</InputAdornment>}
              aria-describedby="money"
              inputProps={{
                'aria-label': 'money',
              }}
              onChange={hadleDescription}
            />
            <FormControl variant="standard" sx={{ mt:3, width:'100px'}}>
              
              <Input
                id="money"
                endAdornment={<InputAdornment position="end">원</InputAdornment>}
                aria-describedby="money"
                inputProps={{
                  'aria-label': 'money',
                }}
                onChange={hadleCount}
              />
            </FormControl>
          </Box>
          <Button 
            variant="contained"
            sx={{width:'100%', marginTop:'30px'}}
            onClick={() => {handleSave()}}
          >
            저장
          </Button>
        </Box>
      </Modal>
    </BtnWrap>
  );
};
//style=================================================
const BtnWrap = styled(Box)({
  position:'relative'
});
const ModalTitle = styled(Box)({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:'20px'
})
//======================================================
export default BottomLedgerButton;