import React from "react";
import ChangeUserInfo from "./ChangeUserInfo";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Setting = () => {
  return (
    <FindWrap>
      <ChangeUserInfo />
    </FindWrap>
  );
};
//style=================================================
const FindWrap = styled(Box)({
  width: "100%",
  height: "100vh",
});
//======================================================
export default Setting;
