// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Grid, Box, Typography, Paper, Button } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import queryString from "query-string";
// import { useHistory } from "react-router-dom";
// import PopupQRReuse from "../components/AlertqrReuse";
// import Waiting from "../components/Waiting";
// import PopupAwardWelcome from "../components/AleartWelcomeAward";
// import Lottie from "lottie-react";
// import tourgame from "../imges/TourGame.jpg";
// import stamp from "../imges/Stamp.png";
// import Layout from "./Layout";

// import "./MainMission.css";
// import HowtoPlay from "../components/HowtoPlay";

// const MainMission = () => {
//   const userId = sessionStorage.getItem("userId");
//   const bigpointId = sessionStorage.getItem("bigpointId");

//   const [processData, setProcessData] = useState([]);
//   const [stageCount, setStageCount] = useState(0);
//   const [stage8Count, setStage8Count] = useState(0);
//   const [missionData, setMissionData] = useState([]);
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState(null);
//   const [award, setAward] = useState(null);
//   const [WelcomeAward, setWelcomeAward] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [rewardData, setRewardData] = useState(null);
//   const [rewardFetched, setRewardFetched] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const history = useHistory();

//   const params = queryString.parse(window.location.search);
//   const qr = params.qr;

//   useEffect(() => {
//     if (userId != null) {
//       fetchWelcomeReward();
//       fetchData();
//     }
//   }, []);

//   // Get process
//   const fetchData = async () => {
//     try {
//       const missionResponse = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/local_campaign/getallprocess/${userId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // setStatus(missionResponse.data.status);
//       // if (missionResponse.data.status === "success") {
//       //   setMissionData(missionResponse.data.data);
//       //   setProcessData(missionResponse.data);

//       //   const countHyp = missionResponse.data.data.filter(
//       //     (mission) => mission.check_point_type === 1
//       //   ).length;
//       //   const countMini = missionResponse.data.data.filter(
//       //     (mission) => mission.check_point_type === 2
//       //   ).length;
//       //   setStageCount(countHyp);
//       //   setStage8Count(countMini);
//       // }

//       if (qr) {
//         const checkinResponse = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/local_campaign/checkin`,
//           {
//             userId: userId,
//             qrCodeId: qr,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("post: ", checkinResponse);
//         setAward(null);
//         setError(null);

//         if (checkinResponse.data.status === "error") {
//           if (checkinResponse.data.message === "already check in") {
//             setError("ขออภัย!<br/>คุณเคยสแกนจุดนี้แล้ว");
//           } else if (checkinResponse.data.message === "Quota limit") {
//             setError(
//               "ขออภัย!<br/>คุณสแกนครบแล้ว 2 จุด<br />พรุ่งนี้รบกวนกลับมาเล่นอีกครั้งนะครับ"
//             );
//           }
//         } else if (
//           checkinResponse.data.status === "success" &&
//           checkinResponse.data.message === "get reward for bigC mini"
//         ) {
//           await fetchReward();
//         } else {
//           //console.log("ยินดีด้วย คุณสะสมได้อีก 1 จุดแล้ว");
//         }
//       }
//     } catch (error) {
//       // console.log("Error fetching data:", error);
//     }
//   };







//   // Reward
//   const fetchReward = async () => {
//     setIsLoading(true); // Set loading state
//     try {
//       const requestData = {
//         userId: userId,
//         qrCodeId: qr, // "qrCodeId": "TH3101Qr",
//         bigpointId: bigpointId,
//       };
//       console.log("Data sent to API:", requestData);
//       axios
//         .post(
//           `${process.env.REACT_APP_BACKEND_URL}/reward/getreward/`,
//           requestData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then(async (response) => {
//           setIsLoading(false);
//           console.log("Response data:", response.data);
//           if (response.data.status === "success") {
//             await setRewardData(response.data);
//             console.log("response message:", response.data.message);
//             await setAward(
//               "รับส่วนลด 30 บาท <br/>เมื่อซื้อสินค้าที่ร่วมรายการ ครบ 300 บาท"
//             );
//           } else {
//             // console.log(" err res message:", response.data.message); // Log error message
//           }
//         })
//         .catch((error) => {
//           setIsLoading(false);
//         });
//     } catch (error) {
//       // console.error("Error fetching data:", error);
//     }
//   };



//   // Welcome Reward 
//   const fetchWelcomeReward = async () => {
//     try {
//       const requestData = {
//         userId: userId,
//         bigpointId: bigpointId,
//       };
//       console.log("Data sent to API:", requestData);
//       axios
//         .post(
//           `${process.env.REACT_APP_BACKEND_URL}/local_campaign/getwelcomereward/`,
//           requestData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then(async (response) => {
//           setIsLoading(false);
//           console.log("Response data:", response.data);
//           if (response.data.status === "success") {
//             await setRewardData(response.data);
//             console.log("GetWelcomeAward:", response.data.message);
//             await setWelcomeAward("GetWelcomeAward <br/>");
//           } else {
//             console.log("Status is failed, not showing popup");
//           }
//         })
//         .catch((error) => {});
//     } catch (error) {}
//   };



//   //Loop Layout
//   const chunkArray = (array, size) => {
//     return array.reduce((chunks, item, index) => {
//       if (index % size === 0) {
//         chunks.push([item]);
//       } else {
//         chunks[chunks.length - 1].push(item);
//       }
//       return chunks;
//     }, []);
//   };
//   // Numbers 1 to 10
//   const numbers = [...Array(10).keys()].map((num) => num + 1);
//   // Chunking numbers into groups of 5
//   const chunkedNumbers = chunkArray(numbers, 5);




//   return (
//     <Layout>
//       <Grid item xs={12} sx={{ mb: 3, mt: 2 }}>
//         <Typography fontSize={26} color="#000" align="center">
//           <b>
//             สุขทันที ที่เที่ยวไทย
//             <br /> สุขไปกันใหญ่ ที่บิ๊กซี
//           </b>
//         </Typography>
//       </Grid>

//       <Grid sx={{ m: 1 }}>
//         <Link to="/scanqr" style={{ textDecoration: "none" }}>
//           <Grid item xs={12}>
//             <Box
//               className="Main-Hunt-Box"
//               sx={{
//                 background: `url(${tourgame}) center/cover no-repeat`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "cover",
//                 position: "relative",
//               }}
//             >
//               <Box className="Main-Hunt-TopLayer-Box">
//                 <Grid
//                   container
//                   direction="row"
//                   justifyContent="space-around"
//                   alignItems="flex-end"
//                   style={{ position: "absolute", bottom: 0, width: "100%" }}
//                 >
//                   {chunkedNumbers.slice(0, 2).map((row, index) => (
//                     <Grid key={index} container item spacing={0.5}>
//                       {row.map((number) => (
//                         <Grid key={number} item>
//                           <Paper
//                             sx={{
//                               width: "75px",
//                               height: "120px",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               background: `url(${stamp}) center/cover no-repeat`,
//                             }}
//                           >
//                             <Typography variant="h5">{number}</Typography>
//                           </Paper>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>
//             </Box>
//           </Grid>
//         </Link>
//       </Grid>



//       <div style={{ width: "100%" }}>
//         {error && <PopupQRReuse message={error} page="Main" />}
//         {isLoading ? <Waiting /> : ""}
//         {/* {WelcomeAward && (
//           <PopupAwardWelcome message={WelcomeAward} page="Main" />
//         )} */}
//       </div>
//     </Layout>
//   );
// };

// export default MainMission;
