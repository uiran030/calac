import React,{useState} from 'react'
import { styled } from '@mui/material/styles';
import {Box,List,ListItem,ListItemButton,ListItemText,Divider, Hidden} from '@mui/material';
import '../css/App.css';

const Nav = () => {
  const btnList = [1,2,3,4,5];
  const [btnActive, setBtnActive] = useState(false);
  //=================================================================================
  const toggleActive = () => {
    setBtnActive(true);
  };
  //=================================================================================

  return (
    <NavBar>
      <nav>
        <List>
          <ListItem>
            <ListItemButton>
              <TitleColor primary="CALAC" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <DividerColor />
      <nav>
        <List>
          <ListItem>
            <ListItemButton>
              <TitleColor primary="Dashboard" className={btnActive?"active":""} onClick={toggleActive}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <TitleColor primary="Calandar" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <TitleColor primary="Account Book" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <TitleColor primary="Board" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <DividerColor />
      <nav>
        <List>
          <ListItem>
            <ListItemButton>
              <TitleColor primary="Setting" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </NavBar>
  )
}
//style=================================================
const NavBar = styled(Box)({
  backgroundColor: `#07553B`,
  textAlign: `center`,
  height: `100vh`
});
const DividerColor = styled(Divider)({
  width: `80%`,
  backgroundColor: `#fff`,
  margin: `auto`
});
const TitleColor = styled(ListItemText)({
  color: `#fff`,
  textAlign: `center`
});
//======================================================
export default function StyledComponents() {
  return <Nav>StyledComponents</Nav>
}