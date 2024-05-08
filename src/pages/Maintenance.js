import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Paper } from "@mui/material";
import computertrouble from "../imges/computertrouble.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#93d701",
    },
  },
});

const MaintenancePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src={computertrouble}
          alt="bigc"
          style={{
            width: "350px",
            maxHeight: "100%",
          }}
        />
        <Paper
          elevation={3}
          style={{
            padding: "12px",
            textAlign: "center",
            backgroundColor: theme.palette.primary.main,
            border: "20px solid #93d701",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{ fontFamily: "Prompt" }}
          >
            ปิดปรับปรุงระบบ
          </Typography>
          <Typography variant="h6" style={{ fontFamily: "Prompt" }}>
            วันที่ 7 พฤษภาคม 2567 <br />
            ตั้งแต่ 23:00 PM - 10:00 AM
          </Typography>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default MaintenancePage;
