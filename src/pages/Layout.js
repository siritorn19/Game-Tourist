import * as React from "react";
import { Grid, Typography } from "@mui/material";
import HowtoPlay from "../components/HowtoPlay";
import Navbar from "../components/NavBar";
import BigCLoading from "../components/Loading";
import FloatingActionButtons from "../components/FloatingActionButtons";

import "./Layout.css";

function Layout(props) {
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const userLineId = sessionStorage.getItem("userLineId");
  const pictureUrl = sessionStorage.getItem("pictureUrl");

  if (userId === null) {
    return <BigCLoading />;
  } else {
    return (
      <>
        <Navbar
          userName={userName}
          userLineId={userLineId}
          pictureUrl={pictureUrl}
        />
        
        {props.children}
        <Grid sx={{ m: 2 }}>
        <HowtoPlay />
        </Grid>
      </>
    );
  }
}
export default Layout;
