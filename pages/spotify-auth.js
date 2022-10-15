import React, { useState, useEffect } from "react";
import { Input, Button, Text } from "@chakra-ui/react";

import SeoLayout from "../Components/Layouts/SeoLayout";
import Navbar from "../Components/Layouts/Navbar";
import { useRouter } from "next/router";
import Footer from "../Components/Layouts/Footer.js";

import axios, { DeleteAuthToken, setAuthToken } from "../services/axios";
import { notification } from "antd";

export default function SpotifyAuth({ userInfo }) {
  const [isOnGoing, setIsOnGoing] = useState(true);
  const [partyCreated, setPartyCreated] = useState(false);
  const [authCode, setAuthCode] = useState();

  const [partyInfo, setPartyInfo] = useState({
    streamingUrl: "sports streamijng url",
    partyTitle: "",
    videoUrl: "",
    date: "",
  });

  SpotifyAuth.getInitialProps = async () => {
    return {};
  };

  const [header, setHeader] = useState();

  useEffect(() => {
    let userToken = localStorage.getItem("accessToken");
    if (userToken) {
      setAuthToken(true);
      setHeader(userToken);
      const split = window.location.search.split("=");
      setAuthCode(split[1]);
      getspotifyTokens(userToken);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const toggleParty = () => setIsOnGoing(!isOnGoing);

  function getspotifyTokens(userToken) {
    setPartyCreated(true);
    let data = {
      code: router.query.code,
    };
    axios.defaults.headers["x-access-token"] = userToken;
    axios
      .post(`/get-user-spotify-tokens`, data)
      .then((res) => {
        notification.success({
          description: "Successfully created sports party",
          duration: 1,
        });
        router.push(`/spotify`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <SeoLayout title="ViewParty | Discover Party and movies to watch with loved ones">
      <div style={{ backgroundColor: "#040308" }}>
        <Navbar />
        <div className={"pt-28 px-5 text-white"}>
          <div className={"container mx-auto"}>
            <div className={"my-5"}>
              <h1 className={"text-3xl md:text-4xl font-sans text-center"}>
                {" "}
                {authCode ? (
                  <div className="flex flex-col">
                 
                  <i className="fa fa-spin fa-spinner p-10 mr-5 "></i>
                  Linking account
                </div>
                ) : (
                  "Linking"
                )}
              </h1>
            </div>
            <div
              style={{}}
              className={
                "flex flex-col items-center text-lg box-content mb-5 p-10"
              }
            ></div>
          </div>
        </div>
        <Footer />
      </div>
    </SeoLayout>
  );
}

export async function getServerSideProps() {
  try {
    return {
      props: {},
    };
  } catch (error) {
    console.log("error");
    return {
      props: {
        movie: [],
        pages: 0,
      },
    };
  }
}
