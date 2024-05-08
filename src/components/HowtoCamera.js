import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function HowtoCamera() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 0.5,
        mt: 3,
        width: 400
      }}
    >
      <Button
        variant="contained"
        style={{
          borderRadius: 30,
          backgroundColor: "#93d701",
          padding: "4px 30px",
          fontSize: "18px",
          fontFamily: "Prompt",
          color: "#000",
        }}
      >
        วิธีแสกน
      </Button>
      <Link to="/scanqr" style={{ textDecoration: "none",  color: "#000" }}>
        <Grid
          container
          spacing={1}
          sx={{ borderRadius: 5, p: 2, backgroundColor: "grey.200" }}
        >
          <Grid item xs={3}>
            <CameraAltIcon sx={{ fontSize: 50, color: "#000" }} />
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontFamily: "Prompt" }}>
              กดกล้องเพื่อสแกน QR Code ตามจุดที่กำหนด
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
}

export default HowtoCamera;
