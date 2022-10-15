import React, { useState, useEffect } from "react";
import { Input, Button, Text } from "@chakra-ui/react";

import SeoLayout from "../../../Components/Layouts/SeoLayout";
import Navbar from "../../../Components/Layouts/Navbar";
import { useRouter } from "next/router";
import Footer from "../../../Components/Layouts/Footer.js";
// import Spotify from 'js-spotify-api'
var Spotify = require("spotify-web-api-js");
import Axios from "axios";
import qs from "qs";

import axios, { DeleteAuthToken, setAuthToken } from "../../../services/axios";
import { notification } from "antd";

export default function SpotifyAuth({ userInfo }) {
  const [isOnGoing, setIsOnGoing] = useState(true);
  const [partyCreated, setPartyCreated] = useState(false);
  const [authCode, setAuthCode] = useState();
  const [userData, setUserData] = useState();

  const [partyInfo, setPartyInfo] = useState({
    streamingUrl: "sports streamijng url",
    partyTitle: "",
    videoUrl: "",
    date: "",
  });

  useEffect(() => {
    axios
      .get("/profile", {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setUserData(res.data.data);
        console.log(res.data.data);


        axios
    .get(
        'https://api.spotify.com/v1/me/playlists', {
            params: { limit: 50, offset: 0 },
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + "BQBijl4B_SxHnMVDRiHZv20xKR3Lrs74Q5xQtygWPIdnaRAZXAAEaXV5NwGjKP_dFyoXSEFzfiX5qaegLuOBYOwgO0xVS-T-yR825vWMuTETFx45AHbYoMltcG73fbbcdHvfCaw5T8cuD5pLdtklIbfg-EM_U-iCdmORitEa3EE_36enNiIFQPF7r_bZPWH66ePi7JVSfR1G",
                'Content-Type': 'application/json',
            },
        })

                        let getPlaylist = Axios.get('https://api.spotify.com/v1/users/n2fycwnzu11xv94a17cwqycfa/playlists',{headers:{'Authorization':"Bearer BQBijl4B_SxHnMVDRiHZv20xKR3Lrs74Q5xQtygWPIdnaRAZXAAEaXV5NwGjKP_dFyoXSEFzfiX5qaegLuOBYOwgO0xVS-T-yR825vWMuTETFx45AHbYoMltcG73fbbcdHvfCaw5T8cuD5pLdtklIbfg-EM_U-iCdmORitEa3EE_36enNiIFQPF7r_bZPWH66ePi7JVSfR1G"}}).then((data)=>{
    console.log('logging data from useEffect')
    console.log(data)
    }).catch((error)=>{
      console.log('error from get playlist')
      console.log(error)
    })

    //     fetch("https://accounts.spotify.com/api/token", {
    //       method: "POST",
    //       body: new URLSearchParams({
    //         refresh_token: res.data.data.tokens.spotify.refresh_token,
    //         grant_type: "refresh_token",
    //       }),
    //       headers: {
    //         Authorization:
    //           "Basic " +
    //           Buffer.from(
    //             "d090a931f6ad4e0fbfd227f904bb4b5f" + ":" + "1bdd37401b5d46a3896f67bc08262a2e"
    //           ).toString("base64"),
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (data.error) {
    //           console.log("returned data error: ", data);
    //           return;
    //         }
    //         console.log("returned data: ", data.access_token);
    //             let getPlaylist = Axios.get('https://api.spotify.com/v1/users/n2fycwnzu11xv94a17cwqycfa/playlists',{headers:{Authorization:`${data.access_token}`}}).then((data)=>{
    // console.log('logging data from useEffect')
    // console.log(data)
    // }).catch((error)=>{
    //   console.log('error from get playlist')
    //   console.log(error)
    // })
    //         // setToken(data.access_token);
    //         //setExpiresIn(data.expires_in);
    //       })
    //       .catch((error) => console.log("refresh token error: ", error));
        //1bdd37401b5d46a3896f67bc08262a2e
        //d090a931f6ad4e0fbfd227f904bb4b5f
      })
      .catch((err) => {
        console.log("logging user error ");
        console.log(err);
      });

    // let getPlaylist = Axios.get('https://api.spotify.com/v1/users/n2fycwnzu11xv94a17cwqycfa/playlists').then((data)=>{
    // console.log('logging data from useEffect')
    // console.log(data)
    // }).catch((error)=>{
    //   console.log('error from use Effect')
    //   console.log(error)
    // })
    // console.log('logging playlist')
    // console.log(getPlaylist) 
  }, []);

  // spotify.searchTracks('Love').then(
  //   function (data) {
  //     console.log('Search by "Love"', data);
  //   },
  //   function (err) {
  //     console.error(err);
  //   }
  // )

  const [header, setHeader] = useState();

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
                <div className="flex flex-col">
                  <i className="fa fa-spin fa-spinner p-10 mr-5 "></i>
                  Under construction
                </div>
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
