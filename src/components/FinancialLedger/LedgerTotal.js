import React, {useState, useEffect} from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography, ListItem, ListItemText } from '@mui/material';
import { styled } from "@mui/material/styles";
import OpenModalBtn from '../common/OpenModalBtn';
import axios from 'axios';

const LedgerTotal = () => {
  const [tabValue, setTabValue] = useState('expense');
  const [expenseList, setExpenseList] = useState(false);
  const [incomeList, setIncomeList] = useState(false);
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  //======================================================
  const handleTabValue = (event, value) => { 
    if (value !== null ) { setTabValue(value); }
  };
  const CHANGE_INCOME = totalIncome.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  const CHANGE_EXPENSE = totalExpense.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  //======================================================
  useEffect(() => {
    axios.get('http://localhost:5000/ledger/total')
    .then((res) => {
      console.log('resTotal', res.data);
      setTotalExpense(res.data[0][0]['sum_count'])
      setTotalIncome(res.data[0][1]['sum_count'])
      setExpenseList(res.data[1])
      setIncomeList(res.data[2])
    })
  }, []);
  //======================================================
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
              {CHANGE_INCOME}
            </TotalCount>
          </ShowTotal>
          <ShowRecent>
            {
              incomeList && incomeList.map((list) => {
                return(
                  <RecentList>
                    <ListItemText
                      key={list.ledger_no}
                      primary={
                        <Box>
                          {list.ledger_description}
                          <CategoryText>{list.ledger_category}</CategoryText>
                        </Box>
                      }
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
              {CHANGE_EXPENSE}
            </TotalCount>
          </ShowTotal>
          <ShowRecent>
            {
              expenseList && expenseList.map((list) => {
                return(
                    <RecentList>
                      <ListItemText
                        key={list.ledger_no}
                        primary={
                          <Box>
                            {list.ledger_description}
                            {/* {list.ledger_category} */}
                          </Box>
                        }
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
const CategoryText = styled('span')({
  fontSize:'10px',
  color:'#7d7d7d',
  marginLeft:'10px'
});
const RecentPrice = styled(Typography)({
  fontSize:'20px'
});
//======================================================
export default LedgerTotal;