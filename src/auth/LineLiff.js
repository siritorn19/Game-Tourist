import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import queryString from "query-string";
import { AddSession, RemoveSession } from "../helpper/function";
import BigCLoading from "../components/Loading";

const LoginLineLiff = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({
          liffId: process.env.REACT_APP_LINE_LIFF_ID,
          // liffId:'2002817424-Q5Mx7Nz3',
          withLoginOnExternalBrowser: true,
        });

        if (!liff.isLoggedIn()) {
          const redirectUri = constructRedirectUri();
          RemoveSession();
          liff.login();
        } else {
          const profile = await liff.getProfile();
          console.log("User Profile:", profile);
          const userId = sessionStorage.getItem("userId");
          if (profile.userId !== userId) {
            const isSession = await AddSession(profile);
            if (isSession === true) {
              window.location.reload();
            }
          }
          await setLoading(false);
        }
      } catch (error) {
        // console.error("Error initializing LIFF:", error.message);
      }
    };

    initializeLiff();
  }, []);

  const constructRedirectUri = () => {
    const currentUrl = window.location.href;
    return currentUrl;
  };

  if (loading) {
    return (
      <BigCLoading />
    );
  }
  return <></>;
};
export default LoginLineLiff;
