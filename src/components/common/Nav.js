import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Hidden,
  Typography,
} from "@mui/material";
import "../../assets/css/App.css";
import { Link } from "react-router-dom";
import JoinRightRoundedIcon from "@mui/icons-material/JoinRightRounded";

const Nav = () => {
  // const btnList = [1, 2, 3, 4, 5];
  const [btnActive, setBtnActive] = useState(false);
  //=================================================================================
  const toggleActive = () => {
    setBtnActive(true);
  };
  //=================================================================================

  return (
    <NavBar>
      <Box>
        <nav>
          <List>
            <Link to='/dashboard' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ padding: `30px`, marginLeft: `5px` }}
                onClick={() => {
                  setBtnActive("dashBoard");
                }}
              >
                {/* <ListItemButton> */}
                <JoinRightRoundedIcon
                  sx={{ color: "#fff", fontSize: `30px` }}
                />
                <TitleColor
                  primary='C A L A C'
                  disableTypography
                  sx={{ fontSize: "30px" }}
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
          </List>
        </nav>
        <DividerColor />
        <nav>
          <List>
            <Link to='/dashboard' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("dashBoard");
                }}
              >
                {/* <ListItemButton> */}
                <TitleColor
                  primary='Dashboard'
                  className={btnActive === "dashBoard" ? "active" : ""}
                  onClick={toggleActive}
                  disableTypography
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
            <Link to='/scheduler' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("scheduler");
                }}
              >
                {/* <ListItemButton> */}
                <TitleColor
                  primary='Scheduler'
                  className={btnActive === "scheduler" ? "active" : ""}
                  disableTypography
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
            <Link to='/financialledger' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("financialLedger");
                }}
              >
                {/* <ListItemButton> */}
                <TitleColor
                  primary='Financial Ledger'
                  className={btnActive === "financialLedger" ? "active" : ""}
                  disableTypography
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
            <Link to='/feed' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("feed");
                }}
              >
                {/* <ListItemButton> */}
                <TitleColor
                  primary='Feed'
                  className={btnActive === "feed" ? "active" : ""}
                  disableTypography
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
          </List>
        </nav>
        <DividerColor />
        <nav>
          <List sx={{ boxSize: "border-box" }}>
            <Link to='/setting' style={{ textDecoration: "none" }}>
              <ListItem
                sx={{ height: "70px", boxSize: "border-box" }}
                onClick={() => {
                  setBtnActive("setting");
                }}
              >
                {/* <ListItemButton> */}
                <TitleColor
                  primary='Setting'
                  className={btnActive === "setting" ? "active" : ""}
                  disableTypography
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
          </List>
        </nav>
      </Box>
      <Box marginBottom={10} fontSize={30}>
        <nav>
          <List>
            <Link to='/login' style={{ textDecoration: "none" }}>
              <ListItem>
                {/* <ListItemButton> */}
                <TitleColor
                  primary='Login'
                  disableTypography
                  sx={{ fontSize: "30px" }}
                />
                {/* </ListItemButton> */}
              </ListItem>
            </Link>
          </List>
          <Link to='/login/signup' style={{ textDecoration: "none" }}>
            <Typography sx={{ color: "#c1c1c1", textDecoration: "underline" }}>
              Sign up
            </Typography>
          </Link>
        </nav>
      </Box>
    </NavBar>
  );
};
//style=================================================
const NavBar = styled(Box)({
  backgroundColor: `#07553B`,
  textAlign: `center`,
  height: `100vh`,
  width: `250px`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // transition: "ease-in-out",
  // transitionDuration: "3s",
});
const DividerColor = styled(Divider)({
  width: `80%`,
  backgroundColor: `#fff`,
  margin: `auto`,
});
const TitleColor = styled(ListItemText)({
  color: `#fff`,
  textAlign: `center`,
  fontSize: `20px`,
  margin: `10px`,
});
//======================================================
export default function StyledComponents() {
  return <Nav>StyledComponents</Nav>;
}
