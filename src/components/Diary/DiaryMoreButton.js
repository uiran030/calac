import React from 'react'
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DiaryMoreButton = () => {
  return (
    <TabBox>
      <List>
        <ListItem disablePadding>
          <ListItemButtonIcon>
            <AutoFixNormalIcon />
            <ListItemText primary="modify" />
          </ListItemButtonIcon>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButtonIcon>
            <DeleteOutlineIcon />
            <ListItemText primary="delete" />
          </ListItemButtonIcon>
        </ListItem>
      </List>
    </TabBox>
  )
};
//style=================================================
const TabBox = styled(Box)({
  maxWidth: 200, 
  position: 'absolute',
  top: -7,
  left: 35
});
const ListItemButtonIcon = styled(ListItemButton)({
  padding: 0
});
//======================================================

export default DiaryMoreButton