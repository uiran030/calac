import React from 'react'
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const FeedMoreButton = () => {
  return (
    <TabBox>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <AutoFixNormalIcon />
            <ListItemText primary="modify" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <DeleteOutlineIcon />
            <ListItemText primary="delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </TabBox>
  )
};
//style=================================================
const TabBox = styled(Box)({
  maxWidth: 200, 
  position: 'absolute',
  top: 20,
  right: 0
});
//======================================================

export default FeedMoreButton