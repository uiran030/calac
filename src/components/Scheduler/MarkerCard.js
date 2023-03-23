import React from "react";
import { Box, Typography, Button } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";

export default function MarkerCard({ marker, setNewEvent, onClose }) {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      sx={{ backgroundColor: "rgba( 255, 255, 255, 0.7)" }}
      marginBottom={1}
      padding={1}
      borderRadius={2}
      marginRight={0.5}
    >
      <RoomIcon color='primary' onClick={onClose} />
      <Typography fontSize={12} sx={{ flex: 1 }}>
        {marker && marker.content && marker.content}
      </Typography>
      <Button
        size='small'
        variant='contained'
        sx={{ marginLeft: "10px" }}
        onClick={() => {
          setNewEvent((prev) => ({ ...prev, locale: marker.content }));
          onClose();
        }}
      >
        선택
      </Button>
    </Box>
  );
}
