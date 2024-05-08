import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import queryString from "query-string";
import PopupQRReuse from "../components/AlertqrReuse";
import PopupAward from "../components/AleartAward";
import PopupAward20 from "../components/Alert20Award";
import PopupAwardWelcome from "../components/AleartWelcomeAward";
import BigCLoading from "../components/Loading";

import tourgame from "../imges/TourGame.jpg";
import stamp from "../imges/Stamp.png";

import Waiting from "../components/Waiting";
import Layout from "./Layout";
import "./Mission.css";

const Mission = () => {
  const userId = sessionStorage.getItem("userId");
  const bigpointId = sessionStorage.getItem("bigpointId");
  const welcome = sessionStorage.getItem("welcome");

  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [processData, setProcessData] = useState([]);
  const [error, setError] = useState(null);
  const [award, setAward] = useState(null);
  const [award20, setAward20] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [rewardFetched, setRewardFetched] = useState(false);
  const [WelcomeAward, setWelcomeAward] = useState(null);
  const [popUpReload, setPopUpReload] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const params = queryString.parse(window.location.search);
  const qr = params.qr;

  useEffect(() => {
    // if (userId != "") {
      fetchData();
      // console.log(sessionStorage)
      if (welcome === "false") {
        fetchWelcomeReward();
      // }
    }
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
      // console.log("get :", missionResponse);
      if (missionResponse.data.status === "success") {
        setMissionData(missionResponse.data.data);
        setProcessData(missionResponse.data);
      }

      /* Check-in */
      // if (qr) {
      // console.log(`qr-: ${qr}`);
      if (userId !== "" && qr) {
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
            await fetchReward();
          } else {
            console.log("Check-in status error");
          }
        }
      } else {
        return <BigCLoading />;
      }
    } catch (error) {
      console.log("Error checkin:", error);
    }
  };

  /* Get reward */
  const fetchReward = async () => {
    try {
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
          // console.log("GetReward data:", response.data);
          if (response.data.status === "success") {
            await setRewardData(response.data);
            // console.log("GetReward message:", response.data.message);
            if (response.data.message === "10 Bigpoint") {
              await setAward("รับ 10 บิ๊กพอยต์<br/>*เงื่อนไขตามที่บริษัทกำหนด");
            } else if (response.data.message === "20 Bigpoint") {
              await setAward20(
                "รับ 20 บิ๊กพอยต์<br/>*เงื่อนไขตามที่บริษัทกำหนด"
              );
            } else {
              console.log("Error GetReward Message");
            }
          } else {
            console.log("Error GetReward");
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  /* Get Welcome Reward */
  const fetchWelcomeReward = async () => {
    try {
      const requestData = {
        userId: userId,
        bigpointId: bigpointId,
      };
      // console.log("WelcomeReward sent to API:", requestData);
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
          // console.log("WelcomeAward data:", response.data);
          if (response.data.status === "success") {
            await setRewardData(response.data);
            await setWelcomeAward("รับคูปอง Welcome award <br/>");
            sessionStorage.setItem("welcome", true);
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
        <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
          <Typography fontSize={22} color="#000" align="center">
            <b>
              สุขทันที <a style={{ color: "#f2228f" }}>ที่เที่ยวไทย</a> <br />{" "}
              สุขไปกันใหญ่ ที่บิ๊กซี
            </b>
          </Typography>
        </Grid>

        <Grid className="Main-Hunt-Box">
          <Link to="/scanqr">
            <Box
              // className="HYP-Hunt-Box"
              sx={{
                background: `url(${tourgame}) center/cover no-repeat`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                border: "1px solid #000",
                borderRadius: 3,
              }}
            >
              <Box
                className="HYP-Hunt-new-box"
                xs="auto"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "tranparent",
                }}
              ></Box>
              <Grid container spacing={0.1} justifyContent="space-evenly">
                {Array.from({ length: 10 }, (item, index) => {
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
                          p: 0.1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "tranparent",
                        }}
                      >
                        {mission && (
                          <img
                            src={stamp}
                            alt={`${index + 1}`}
                            style={{
                              width: `${(400 - 20) / 5}px`,
                              maxHeight: "100%",
                            }}
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
        <div style={{ width: "100%" }}>
          {error && <PopupQRReuse message={error} page={popUpReload} />}
          {isLoading ? <Waiting /> : ""}
          {WelcomeAward && (
            <PopupAwardWelcome message={WelcomeAward} page="main" />
          )}
          {award && <PopupAward message={award} />}
          {award20 && <PopupAward20 message={award20} />}
        </div>
      </Grid>
    </Layout>
  );
};

export default Mission;
