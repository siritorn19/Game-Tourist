import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
import { Grid, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Layout from "./Layout";
import PopupQRdata from "../components/AleartQRdata";
import Waiting from "../components/Waiting";
import BigCLoading from "../components/Loading";


const ScanQR = () => {
  const [error, setError] = useState(null);
  const [popUpReload, setPopUpReload] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 


  const handleScan = (data) => {
    if (data) {
      redirectBasedOnQRData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(err);
    window.location.reload();
  };

  const redirectBasedOnQRData = (data) => {
    const params = getParamsFromQRData(data);
    if (params && params.qr && params.qr.startsWith("TH")) {
      window.location.href = `/mission?qr=${params.qr}`;
    } else {
      console.error("QR code is invalid");
      setError("QR code ไม่ถูกต้อง");
      setPopUpReload("");
    }
  };

  const getParamsFromQRData = (data) => {
    try {
      const url = new URL(data);
      const searchParams = new URLSearchParams(url.search);
      const qr = searchParams.get("qr");
      return { qr };
    } catch (error) {
      console.error("Error parsing QR data:", error);
      setError("Error parsing QR data");
      setPopUpReload("");
      return null;
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    window.history.go(-1);
    return false;
  };

  return (
    <Layout>
      <Grid container spacing={0} direction="column">
        <Grid sx={{ m: 1 }}>
          <IconButton onClick={handleBack}>
            <ArrowBackIosIcon sx={{ stroke: "#000", strokeWidth: 2 }} />
          </IconButton>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography fontSize={22} color="#000" align="center">
            <b>
              สุขทันที <a style={{ color: "#f2228f" }}>ที่เที่ยวไทย</a> <br />{" "}
              สุขไปกันใหญ่ ที่บิ๊กซี
            </b>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "10vh", backgroundColor: "#706e6e", m: 0, p: 0 }}
      >
        <QrReader
          delay={300}
          constraints={{
            facingMode: "environment",
          }}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>
      {error && <PopupQRdata message={error} page={popUpReload} />}
      {isLoading ? <Waiting /> : ""}
    </Layout>
  );
};

export default ScanQR;
