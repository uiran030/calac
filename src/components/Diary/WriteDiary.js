import React,{useState} from 'react'
import { styled } from "@mui/material/styles";
import { Box, Button, Modal, Fade, Typography, Backdrop, Divider } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';

const WriteDiary = () => {
  const [open, setOpen] = useState(false);
  //======================================================

  return (
    <Box>
      <Button 
        variant="outlined" 
        startIcon={<CreateIcon />}
        onClick={()=>setOpen(true)}
      > Write
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={()=>setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalBox>
            <TitleTypography>Write Diary</TitleTypography>
            <Divider/>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </ModalBox>
        </Fade>
      </Modal>
    </Box>
  )
};
//style=================================================
const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '57%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: '60vh',
  backgroundColor: '#fff',
  border: '3px solid #07553B',
  boxShadow: 24,
  padding: 20
});
const TitleTypography = styled(Typography)({
  fontSize: 30,
  color: '#07553B',
});
//======================================================

export default WriteDiary