import React from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, Modal, Fade, Typography, Backdrop, Divider, CardMedia } from "@mui/material";

const DiaryDetail = (openDetail,setOpenDetail,openDetailModal,closeDetailModal,id,title,body) => {
  //======================================================
  console.log(id,body,title)
  return (
    <MyBox>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDetail}
        onClose={closeDetailModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDetail}>
          <ModalBox>
            <TitleTypography>{title}</TitleTypography><br></br>
            <DateTypography>2023-02-19</DateTypography>
            <Divider/>
            <DetailBox>
              <CardMedia
                component="img"
                width="210"
                height="194"
                image="../../assets/images/feed/img01.jpeg"
                alt="이미지"
              />
              <ContentTypography>
                {body}
              </ContentTypography>
            </DetailBox>
          </ModalBox>
        </Fade>
      </Modal>
    </MyBox>
  )
};
//style=================================================
const MyBox = styled(Box)({
  backgroundColor: 'red',
})
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
  padding: 20,
});
const DetailBox = styled(Box)({
  padding: 20,
});
const TitleTypography = styled(Typography)({
  fontSize: 30,
  color: '#07553B',
  textAlign: 'center'
});
const DateTypography = styled(Typography)({
  fontSize: 15,
  color: '#07553B',
  textAlign: 'right'
});
const ContentTypography = styled(Typography)({
  fontSize: 15,
  textAlign: 'center'
});
//======================================================

export default DiaryDetail