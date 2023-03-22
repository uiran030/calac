import React from "react";
import { Box, Typography, Button } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";

export default function MarkerCard({ marker, setSelectedMarker, onClose }) {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      sx={{ backgroundColor: "rgba( 255, 255, 255, 0.8)" }}
      marginY={1}
      padding={1}
    >
      <RoomIcon color='primary' onClick={onClose} />
      <Typography fontSize={12} sx={{ flex: 1 }}>
        {marker && marker.content && marker.content}
      </Typography>
      <Button
        size='small'
        variant='contained'
        onClick={() => {
          setSelectedMarker("");
          // onClose(); 어떻게 해야 선택했을 떄 끌 수 있을깐
        }}
      >
        선택
      </Button>
    </Box>
  );
}
