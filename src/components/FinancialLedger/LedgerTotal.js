import React, {useState, useEffect} from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography, ListItem, ListItemText } from '@mui/material';
import { styled } from "@mui/material/styles";
import OpenModalBtn from '../common/OpenModalBtn';
import axios from 'axios';

const LedgerTotal = () => {

  const [tabValue, setTabValue] = useState('expense');
  const [expenseList, setExpenseList] = useState(false);
  const [incomeList, setIncomeList] = useState(false);

  const handleTabValue = (event, value) => { 
    if (value !== null ) { setTabValue(value); }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/ledger')
    .then((res) => {
      console.log('res', res.data);
      setExpenseList(res.data[1])
      setIncomeList(res.data[2])
    })
  }, []);

  return (
  <AddInfoArea>
    <UpperText>
      <ToggleButtonGroup
        value={tabValue}
        exclusive
        onChange={handleTabValue}
        aria-label="text alignment"
        sx={{width:'100%'}}
      >
        <ToggleButton value="expense" aria-label="left aligned" sx={{width:'50%'}}>
          지출
        </ToggleButton>
        <ToggleButton value="income" aria-label="centered" sx={{width:'50%'}}>
          수입
        </ToggleButton>
      </ToggleButtonGroup>
    </UpperText>
    { tabValue === 'income' ? 
      (
        <TabBox>
          <ShowTotal>
            <TotalText>수입 전액</TotalText>
            <TotalCount>
              nnn원
            </TotalCount>
          </ShowTotal>
          <ShowRecent>
            {
              incomeList && incomeList.map((list) => {
                return(
                  <RecentList>
                    <ListItemText
                      key={list.ledger_no}
                      primary={list.ledger_description}
                      secondary={
                        <Box>
                          <RecentPrice
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {list.ledger_count}
                          </RecentPrice>
                        </Box>
                      }
                    />
                  </RecentList>
                )
              })
            }
          </ShowRecent>
        </TabBox>
      ) : 
      (
        <TabBox>
          <ShowTotal>
            <TotalText>지출 전액</TotalText>
            <TotalCount>
              nnn원
            </TotalCount>
          </ShowTotal>
          <ShowRecent>
            {
              expenseList && expenseList.map((list) => {
                return(
                    <RecentList>
                      <ListItemText
                        key={list.ledger_no}
                        primary={list.ledger_description}
                        secondary={
                          <Box>
                            <RecentPrice
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {list.ledger_count}
                            </RecentPrice>
                          </Box>
                        }
                      />
                    </RecentList>
                )
              })
            }
          </ShowRecent>
        </TabBox>
      )
    }
    <OpenModalBtn />
  </AddInfoArea>
  );
};

//style=================================================
const AddInfoArea = styled(Box)({
  borderLeft:'1px solid #ddd',
  width:'30%',
  padding:'20px',
  position:'relative'
});
const UpperText = styled(Box)({
  display:'flex',
  justifyContent:'space-around',
  height:'15%',
});
const TabBox = styled(Box)({
  height:'85%'
});
const ShowTotal = styled(Box)({
  height:'25%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  textAlign:'right',
  borderBottom:'1px solid #ddd'
});
const TotalText = styled('h3')({
  fontSize:'20px',
  marginBottom:'10px'
});
const TotalCount = styled(Typography)({
  fontSize:'30px'
});
const ShowRecent = styled(Box)({
  height:'75%',
  padding:'20px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'flex-start'
});
const RecentList = styled(ListItem)({
  textAlign:'right',
  padding:0,
  height:'33.3333%',
});
const RecentPrice = styled(Typography)({
  fontSize:'20px'
});
//======================================================
export default LedgerTotal;