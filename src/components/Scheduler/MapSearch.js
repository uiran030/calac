import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KakaoMap from "./KakaoMap";
import MarkerCard from "./MarkerCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "870px",
  height: "700px",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function MapSearch({ selectedMarker, setSelectedMaker }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setKeyword("");
  };
  const [keyword, setKeyword] = useState("");
  const [markerList, setMarkerList] = useState("");
  // const [selectedMarker, setSelectedMaker] = React.useState();

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // console.log(markerList);
  // console.log(selectedMarker);

  return (
    <div>
      <Button onClick={handleOpen} variant='outlined'>
        지도 검색
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box display='flex' justifyContent='space-between' marginBottom='5px'>
            <Typography variant='h5' color='primary' fontWeight={700}>
              지도로 위치 검색
            </Typography>
            <CloseIcon onClick={handleClose} sx={{ cursur: "pointer" }} />
          </Box>
          <Box position='relative' height='600px'>
            <KakaoMap keyword={keyword} setMarkerList={setMarkerList} />
            <Box position='absolute' top={0} right={0} zIndex={10} padding={2}>
              <TextField
                id='outlined-basic'
                label='키워드 또는 주소를 입력하세요.'
                variant='outlined'
                fullWidth
                value={keyword}
                onChange={handleKeywordChange}
                color='primary'
                sx={{
                  backgroundColor: "rgba( 255, 255, 255, 0.7 )",
                  borderRadius: "5px",
                }}
              />
              <Box height='520px' sx={{ overflowY: "auto" }}>
                {markerList &&
                  markerList.map((marker, index) => (
                    <MarkerCard
                      key={index}
                      marker={marker}
                      setSelectedMarker={setSelectedMaker}
                      onClose={handleClose}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
