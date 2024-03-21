import * as React from "react";
import { Button } from "@mui/base/Button";
import { Dialog, DialogContent, Grid, CardMedia, Box, Typography } from "@mui/material";
import reward250 from "../imges/reward/icon-reward-250.png";
import "./Alert.css";

const PopupAwardWelcome = ({ message, error }) => {
  const [open, setOpen] = React.useState(true);
  const userLineId = sessionStorage.getItem("userId");
  const bigpointId = sessionStorage.getItem("bigpointId");

  const handleClose = () => {
    setOpen(false);
  };

  const handleToRegister = (e) => {
    e.preventDefault();
    setOpen(false);
    window.location.href=`${process.env.REACT_APP_BIGGAME_LIFF_URL}?feature=register`;
  };

  const handleToMyReward = (e) => {
    e.preventDefault();
    setOpen(false);
    window.location.href=`${process.env.REACT_APP_BIGGAME_URL}/reward`;
  };

  return (
    <div>
      {message && (
        <Dialog
          className="alert-dialog"
          align="center"
          open={open}
          onClose={handleClose}
          sx={{
            p: 2,
            borderRadius: 25,
            justifyContent: "center",
            borderColor: "#555",
          }}
        >
          <DialogContent className="box-dialog">
            <Grid container spacing={1}>
              <Grid item sm={12} xs={12}>
                <CardMedia
                  className="box-dialog-img"
                  component="img"
                  image={reward250} // img
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                {/* <h3>ยินดีด้วย คุณสำเร็จภาระกิจและได้รับของรางวัล</h3> */}
                <br></br>
                <Typography
                variant="h6"
                className="popup-font-red"
                component="div"
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              ></Typography>
                <br></br>
                {bigpointId != null ? (
                  <>
                    <p className="popup-font-small">
                      ขณะนี้ระบบกำลังดำเนินการส่งคูปองไปให้คูณโดยจะใช้ระยะเวลาประมาณ
                      2-3 นาที หลังจากนั้น คุณสามารถตรวจสอบคูปองได้ที่เมนู My
                      Coupon หรือ 
                      <a href={`${process.env.REACT_APP_BIGGAME_URL}/reward`}>
                         คลิกที่นี่
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="popup-font">
                      โปรดสมัครหรือเชื่อมต่อสมาชิกบิ๊กพอยต์เพื่อรับของรางวัล
                    </p>
                    <p className="popup-font-small">
                      (ตัดสิทธิ์ของรางวัลทุกเที่ยงคืนของวัน)
                    </p>
                  </>
                )}
              </Grid>
              <Grid item sm={12} xs={12}>
                {bigpointId != null ? (
                  <Box className="btn-dialog">
                    <Button
                      sx={{ color: "#fff" }}
                      onClick={(e) => handleToMyReward(e)}
                    >
                      ตกลง
                    </Button>
                  </Box>
                ) : (
                  <Box className="btn-dialog-green">
                    <Button
                      sx={{ color: "#fff" }}
                      onClick={(e) => handleToRegister(e)}
                    >
                      สมัครสมาชิก
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};



export default PopupAwardWelcome;
