import React, {useState, useEffect} from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography, ListItem, ListItemText } from '@mui/material';
import { styled } from "@mui/material/styles";
import OpenModalBtn from '../common/OpenModalBtn';
import axios from 'axios';

const LedgerTopThree = () => {
  const [tabValue, setTabValue] = useState('expense');
  const [totalCountData, setTotalCountData] = useState({});
  const [recentThreeList, setRecentThreeList] = useState(false);
  //======================================================
  let type = 'expense';
  const handleTabValue = (event, value) => { 
    if (value !== null ) { 
      setTabValue(value);
    }
  };
  type = tabValue;
  const CHANGE_TOTAL = totalCountData.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  //======================================================
  // [0]번째 데이터 뽑아내기
  //======================================================
  useEffect(() => {
    axios.get(`http://localhost:5000/ledger/total?type=${type}`)
    .then((res) => {
      console.log('res', res.data)
      res.data[0][0]['sum_count'] !== null ? (
        setTotalCountData(res.data[0][0]['sum_count'])
      ) : (
        setTotalCountData(0)
      );
      res.data[1].length !== 0 ? ( 
        setRecentThreeList(res.data[1])
      ) : (
        setRecentThreeList(false)
      );
    })
  }, [tabValue]);
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
      <TabBox>
        <ShowTotal>
          { tabValue === 'expense' ? (
            <TotalText>지출 전액</TotalText>
          ) : (
            <TotalText>수입 전액</TotalText>
          )}
            <TotalCount>
              {CHANGE_TOTAL}
            </TotalCount>
        </ShowTotal>
        <ShowRecent>
          { recentThreeList && recentThreeList.map((list) => {
            return(
              <RecentList>
                <ListItemText
                  key={list.ledger_no}
                  primary={
                    <Box>
                      {list.ledger_description}
                      <CategoryText 
                        variant="body1"
                        component="span"
                      >
                        {list.ledger_category}
                      </CategoryText>
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
          })}
        </ShowRecent>
      </TabBox>
  </AddInfoArea>
  );
};

//style=================================================
const AddInfoArea = styled(Box)({
  border:'1px solid #ddd',
  width:'30%',
  padding:'20px',
  position:'relative'
});
const UpperText = styled(Box)({
  display:'flex',
  justifyContent:'space-around',
  height:'15%'
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
  borderBottom:'1px solid #ddd',
});
const TotalText = styled(Typography)({
  fontSize:'14px'
});
const TotalCount = styled(Typography)({
  fontSize:'25px'
});
const ShowRecent = styled(Box)({
  height:'75%',
  padding:'10px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'flex-start'
});
const RecentList = styled(ListItem)({
  textAlign:'right',
  padding:0,
  height:'33.3333%'
});
const CategoryText = styled(Typography)({
  fontSize:'10px',
  color:'#7d7d7d',
  marginLeft:'10px'
});
const RecentPrice = styled(Typography)({
  fontSize:'20px'
});
//======================================================
export default LedgerTopThree;