import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "@mui/material";
import ScanQR from "./pages/Scan";
import LoginLineLiff from "./auth/LineLiff";
import ListStore from "./pages/ListStore";
import Mission from "./pages/Mission";
import "./index.css";


export default function App() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Router>
          <LoginLineLiff />
          <Switch>
            <Route exact path="/" component={Mission} />
            <Route path="/liststore" component={ListStore} />
            <Route path="/mission" component={Mission} />
            <Route path="/scanqr" component={ScanQR} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Grid>
    </>
  );
}
