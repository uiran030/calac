import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import KakaoMap from "./KakaoMap";
import CloseIcon from "@mui/icons-material/Close";
import MarkerCard from "./MarkerCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 700,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function MapSeach({ selectedMarker, setSelectedMaker }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [keyword, setKeyword] = React.useState("");
  const [markerList, setMarkerList] = React.useState();
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
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='space-between'>
              <Typography variant='h5' color='primary' fontWeight={700}>
                지도로 위치 검색
              </Typography>
              <CloseIcon onClick={handleClose} sx={{ cursur: "pointer" }} />
            </Grid>
            <Grid item xs={8} height='600px'>
              <KakaoMap keyword={keyword} setMarkerList={setMarkerList} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id='outlined-basic'
                label='키워드 또는 주소를 입력하세요.'
                variant='outlined'
                fullWidth
                onChange={handleKeywordChange}
              />
              <Box height='520px' sx={{ overflowY: "scroll" }}>
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
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
