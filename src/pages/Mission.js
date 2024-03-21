import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import queryString from "query-string";
import PopupQRReuse from "../components/AlertqrReuse";
import PopupAward from "../components/AleartAward";
import PopupAwardWelcome from "../components/AleartWelcomeAward";

import tournumber from "../imges/Tournumber.jpg";
import tourscan from "../imges/Tourscan.jpg";
import tourgame from "../imges/TourGame.jpg";
import stamp from "../imges/Stamp.png";

import Waiting from "../components/Waiting";
import Layout from "./Layout";
import "./Mission.css";

const Mission = () => {
  const userId = sessionStorage.getItem("userId");
  const bigpointId = sessionStorage.getItem("bigpointId");

  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [processData, setProcessData] = useState([]);
  const [error, setError] = useState(null);
  const [award, setAward] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [rewardFetched, setRewardFetched] = useState(false);
  const [WelcomeAward, setWelcomeAward] = useState(null);
  const [popUpReload, setPopUpReload] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const params = queryString.parse(window.location.search);
  const qr = params.qr;

  useEffect(() => {
    fetchData();
    fetchWelcomeReward();
  }, []);

  const fetchData = async () => {
    try {
      const missionResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/local_campaign/getallprocess/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(missionResponse.data.status);
      console.log("get :", missionResponse);
      if (missionResponse.data.status === "success") {
        setMissionData(missionResponse.data.data);
        setProcessData(missionResponse.data);
      }

      /* Check-in */
      if (qr) {
        console.log(`qr-: ${qr}`);
        const checkinResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/local_campaign/checkin/`,
          {
            userId: userId,
            qrCodeId: qr,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Post check in: ", checkinResponse);
        setAward(null);
        setError(null);

        if (checkinResponse.data.status === "error") {
          if (checkinResponse.data.message === "Already scan today") {
            setError("ขออภัย!<br/>คุณเคยแสกนจุดนี้แล้ว");
            setPopUpReload("");
          } else if (checkinResponse.data.message === "Quota limit") {
            setError("ขออภัย!<br/>คุณสแกนครบแล้ว 10 จุด");
            setPopUpReload("");
          }
        } else if (checkinResponse.data.status === "success") {
          if (checkinResponse.data.message === "get reward") {
            setAward("ยินดีด้วย คุณรับรางวัลแล้ว");
            console.log("Reward received!");
            await fetchReward();
          } else {
            console.log("Check-in status error");
          }
        }
      }
    } catch (error) {
      console.log("Error checkin:", error);
    }
  };

  /* Get reward */
  const fetchReward = async () => {
    try {
      setIsLoading(true); // Set loading state
      const requestData = {
        userId: userId,
        qrCodeId: qr,
        bigpointId: bigpointId,
      };
      console.log("GetReward sent to API :", requestData);

      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/local_campaign/getreward/`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          setIsLoading(false); // Set loading state
          console.log("GetReward data:", response.data);
          if (response.data.status === "success") {
            await setRewardData(response.data);
            console.log("GetReward message:", response.data.message);
            await setAward("รับส่วนลดคูปอง<br/>*เงื่อนไขตามที่บริษัทกำหนด");
          } else {
            console.log("Error GetReward");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          // console.error("Error fetching data:", error);
        });
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  /* Get Welcome Reward */
  const fetchWelcomeReward = async () => {
    try {
      const requestData = {
        userId: userId,
        bigpointId: bigpointId,
      };
      console.log("WelcomeReward sent to API:", requestData);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/local_campaign/getwelcomereward/`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          console.log("WelcomeAward data:", response.data);
          if (response.data.status === "success") {
            await setRewardData(response.data);
            await setWelcomeAward("รับคูปอง Welcome award <br/>");
          } else {
            console.log("Welcome Status is failed, not showing popup");
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <Layout>
      <Grid sx={{ m: 1 }}>
        <Grid item xs={12} sx={{ mb: 3, mt: 3 }}>
          <Typography fontSize={26} color="#000" align="center">
            <b>
              สุขทันที <a style={{ color: "#f2228f" }}>ที่เที่ยวไทย</a> <br />{" "}
              สุขไปกันใหญ่ ที่บิ๊กซี
            </b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Link to="/scanqr">
            <Box
              className="HYP-Hunt-Box-Head"
              sx={{
                background: `url(${tourscan}) center/cover no-repeat`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></Box>
          </Link>

          <Link to="/scanqr">
            <Box
              className="HYP-Hunt-Box"
              sx={{
                background: `url(${tournumber}) center/cover no-repeat`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Grid container spacing={0.1}>
                {Array.from({ length: 11 }, (item, index) => {
                  const mission =
                    missionData[index] &&
                    missionData[index].check_point_type === 3;
                  return (
                    <Grid
                      key={index}
                      item
                      sx={{ flexGrow: 1 }}
                      className="HYP-Hunt-Grid-Item"
                    >
                      <Box
                        xs="auto"
                        className="HYP-Hunt-Item"
                        sx={{
                          width: "75px",
                          height: "115px",
                          display: "flex",
                          p:0.2,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "tranparent",
                        }}
                      >
                        {mission && (
                          <img
                            src={stamp}
                            alt={`${index + 1}`}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Link>
        </Grid>
        {error && <PopupQRReuse message={error} page={popUpReload} />}
        {isLoading ? (<Waiting />) : ''}
        {WelcomeAward && (
          <PopupAwardWelcome message={WelcomeAward} page="main" />
        )}
        {award && <PopupAward message={award} />}
      </Grid>
    </Layout>
  );
};

export default Mission;
