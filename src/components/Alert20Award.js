import * as React from "react";
import { styled, css } from "@mui/system";
import { Button } from "@mui/base/Button";
import { Dialog, DialogContent, Grid, CardMedia, Box, Typography } from "@mui/material";
import reward20bigpoint from "../imges/reward/icon-bigpoint-20.png"
import "./Alert.css";
import { useHistory } from 'react-router-dom';

const PopupAward20 = ({ message, error }) => {
  const [open, setOpen] = React.useState(true);
  const userLineId = sessionStorage.getItem("userId");
  const bigpointId = sessionStorage.getItem("bigpointId");
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.push('/');
    window.location.reload();
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
                  image={reward20bigpoint}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <h3>ยินดีด้วย คุณสำเร็จภารกิจและได้รับของรางวัล</h3>
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

const ModalButton = styled(Button)(
  ({ theme }) => `
  fontFamily: 'Prompt'
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #ed1c24;
  padding: 7px 30px;
  border-radius: 25px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid #ed1c24;
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px #ed1c24, inset 0 -2px 1px #ed1c24;

  &:hover {
    background-color: #ed1c24;
  }

  &:active {
    background-color: #ed1c24;
    box-shadow: none;
  }
  }
`
);

export default PopupAward20;
