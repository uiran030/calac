import React, {useState} from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography, ListItem, ListItemText } from '@mui/material';
import { styled } from "@mui/material/styles";
import OpenModalBtn from '../common/OpenModalBtn';

const LedgerTotal = () => {

  const [tabValue, setTabValue] = useState('expense');

  const handleTabValue = (event, value) => { 
    if (value !== null ) { setTabValue(value); }
  };

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
            <TotalCount>2,125,463원</TotalCount>
          </ShowTotal>
          <ShowRecent>
            <RecentList>
              <ListItemText
                primary="월급"
                secondary={
                  <Box>
                    <RecentPrice
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      1,850,000원
                    </RecentPrice>
                  </Box>
                }
              />
            </RecentList>
            <RecentList>
              <ListItemText
                primary="빌린 돈 받음"
                secondary={
                  <Box>
                    <RecentPrice
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      50,000원
                    </RecentPrice>
                  </Box>
                }
              />
            </RecentList>
            <RecentList>
              <ListItemText
                primary="수입3"
                sx={{fontSize:'30px'}}
                secondary={
                  <Box>
                    <RecentPrice
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      24,000원
                    </RecentPrice>
                  </Box>
                }
              />
            </RecentList>
          </ShowRecent>
        </TabBox>
      ) : 
      (
        <TabBox>
          <ShowTotal>
            <TotalText>지출 전액</TotalText>
            <TotalCount>1,258,020원</TotalCount>
          </ShowTotal>
          <ShowRecent>
            <RecentList>
              <ListItemText
                primary="올리브영"
                secondary={
                  <Box>
                    <RecentPrice
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      91,000원
                    </RecentPrice>
                  </Box>
                }
              />
            </RecentList>
            <RecentList>
              <ListItemText
                primary="GS25 강남점"
                secondary={
                  <Box>
                    <RecentPrice
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      5,100원
                    </RecentPrice>
                  </Box>
                }
              />
            </RecentList>
            <RecentList>
              <ListItemText
                primary="GS25 역삼점"
                sx={{fontSize:'30px'}}
                secondary={
                  <Box>
                    <RecentPrice
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      4,000원
                    </RecentPrice>
                  </Box>
                }
              />
            </RecentList>
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
const TotalCount = styled('p')({
  fontSize:'30px'
});
const ShowRecent = styled(Box)({
  height:'75%',
  padding:'20px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-around',
  alignItems:'flex-end'
});
const RecentList = styled(ListItem)({
  textAlign:'right',
  padding:0
});
const RecentPrice = styled(Typography)({
  fontSize:'20px'
});
//======================================================
export default LedgerTotal;