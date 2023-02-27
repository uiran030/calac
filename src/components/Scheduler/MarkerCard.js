import { Button, Paper, Typography } from "@mui/material";
import React from "react";

export default function MarkerCard({ marker, setSelectedMarker, onClose }) {
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        margin: "5px",
      }}
    >
      <Typography>{marker.content}</Typography>
      <Button
        size='small'
        variant='contained'
        onClick={() => {
          setSelectedMarker(marker);
          onClose();
        }}
      >
        선택
      </Button>
    </Paper>
  );
}
