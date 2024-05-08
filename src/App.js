import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "@mui/material";
import ScanQR from "./pages/Scan";
import LoginLineLiff from "./auth/LineLiff";
import ListStore from "./pages/ListStore";
import Mission from "./pages/Mission";
import "./index.css";

import Maintenace from "./pages/Maintenance";


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
          {/* <Switch>
            <Route exact path="/" component={Maintenace} />
            <Route path="/liststore" component={Maintenace} />
            <Route path="/mission" component={Maintenace} />
            <Route path="/scanqr" component={Maintenace} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch> */}
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
