import React, { useState, useEffect } from "react";
import { Input, Button, Text } from "@chakra-ui/react";
import moment from "moment";
import SeoLayout from "../Components/Layouts/SeoLayout";
import Navbar from "../Components/Layouts/Navbar";
import { useRouter } from "next/router";
import { DatePicker, Space, Modal } from "antd";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Link from "next/link";
// import SpotifyLogin from 'react-spotify-login';
import Axios from "axios";
// import SpotifyAuth from 'react-spotify-auth'

import Footer from "../Components/Layouts/Footer.js";

import axios, { DeleteAuthToken, setAuthToken } from "../services/axios";
import { notification } from "antd";

const scopes = [
  "user-read-email",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-private",
  "user-library-modify",
  "streaming",
  "user-read-playback-position",
];

const loginUrl = `${"https://accounts.spotify.com/authorize?"}client_id=${"d090a931f6ad4e0fbfd227f904bb4b5f"}&response_type=code&redirect_uri=${"http://localhost:3030/spotify-auth"}&scope=${scopes.join(
  "%20"
)}`;

export default function Spotify({ userInfo }) {
  const [isOnGoing, setIsOnGoing] = useState(true);
  const [partyCreated, setPartyCreated] = useState(false);
  const [spotifyTokens , setSpotifyTokens] = useState()

  const [partyInfo, setPartyInfo] = useState({
    streamingUrl: "sports streamijng url",
    partyTitle: "",
    genre: "",
    date: "",
  });

  const [header, setHeader] = useState();
  useEffect(() => {
    let userToken = localStorage.getItem("accessToken");
    if (userToken) {
      setAuthToken(true);
      setHeader(userToken);
    } else {
      // DeleteAuthToken()
      // notification.success({
      //   description: "Signin to create youtube party",
      //   duration: 1,
      // });
      // router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const [display, setDisplay] = useState(false);
  const toggleParty = () => setIsOnGoing(!isOnGoing);

  const onChange = (date, dateString) => {
    let newState = {
      ...partyInfo,
      date: moment(dateString).format("DD-MMM-YYYY"),
    };
    setPartyInfo(newState);
  };

  const updateInputValue = (e) => {
    let targetValue = e.target.name;

    let newState = { ...partyInfo, [e.target.name]: e.target.value };
    setPartyInfo(newState);
  };

  const crateYoutubeParty = () => {
    setPartyCreated(true);
    let data = partyInfo;
    axios.defaults.headers["x-access-token"] = header;
    axios
      .post(`/create-spotify-party`, data)
      .then((res) => {
        notification.success({
          description: "Successfully created spotify party",
          duration: 1,
        });
        const title = res.data.data.partyTitle;
        const id = res.data.data._id;

        //
        setPartyCreated(false);
        router.push(`/Spotify/${id}/${title.replaceAll(" ", "_")}`);
      })
      .catch((err) => {
        notification.error({
          message: "Sign in to create a party",
          duration: 1,
        });
        console.log(err);
      });
  };

  return (
    <SeoLayout title="ViewParty | Discover Party and movies to watch with loved ones">
      <div style={{ backgroundColor: "#040308" }}>
        <Navbar />
        <div className={"pt-28 px-5 text-white"}>
          <div className={"container mx-auto"}>
            <div className={"my-5"}>
              <h1 className={"text-3xl md:text-4xl font-sans text-center"}>
                {" "}
                Create a Spotify party
              </h1>
            </div>

            {userInfo?.data?.tokens?.spotify ? (
              <div
                style={{}}
                className={
                  "flex flex-col items-center text-lg box-content mb-5 p-10"
                }
              >
                <div className="">
                  <Text mb="8px" className="text-center font-bold">
                    Party name{" "}
                  </Text>

                  <Input
                    style={{ color: "black", borderRadius: "12px" }}
                    className="w-screen max-w-xs  md:max-w-3xl black p-1"
                    size={"lg"}
                    name={"partyTitle"}
                    onChange={updateInputValue}
                  ></Input>
                </div>

                <div className="">
                  <Text mb="8px" className="text-center font-bold">
                    Genre{" "}
                  </Text>

                  <Input
                    style={{ color: "black", borderRadius: "12px" }}
                    className="w-screen max-w-xs  md:max-w-3xl black p-1"
                    size={"lg"}
                    name={"genre"}
                    onChange={updateInputValue}
                  ></Input>
                </div>

                <div className={"mr-5 flex flex-wrap items-center flex-col"}>
                  <Text mb="8px" className="text-center font-bold mt-5">
                    Select date{" "}
                  </Text>
                  <div className="flex">
                    <Space
                      className={"text-white"}
                      direction="vertical"
                      size={10}
                      style={{
                        color: "#fff",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <DatePicker
                        placeholder={"Filter parties using date"}
                        style={{
                          color: "#fff",
                          border: "none",
                          outline: "none",
                          width: "200px",
                        }}
                        onChange={onChange}
                        className={
                          "py-2 rounded-md text-lg bg-gray-900 text-white font-semibold outline-none focus:outline-none"
                        }
                      />
                    </Space>

                    <button
                      style={{ width: "70px" }}
                      className={`flex-1 duration-200 text-base rounded ml-4 bg-gray-800  text-primary font-semibold bg-gray-700"
                            `}
                      // onClick={resetDate}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <Button
                  style={{ background: "teal", width: "100px" }}
                  colorScheme="blue"
                  onClick={crateYoutubeParty}
                  className={`focus:outline-none px-3 py-2 mt-5 rounded`}
                >
                  {!partyCreated ? (
                    "Submit"
                  ) : (
                    <i className="fa fa-spin fa-spinner mr-3"></i>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col mx-auto mt-5 mb-5">
                <h2 style={{ textAlign: "center" }}>
                  Link spotify account to create party
                </h2>

                <Link href={loginUrl} passHref={true}>
                  <Button
                    style={{
                      background: "green",
                      width: "150px",
                      alignSelf: "center",
                    }}
                    colorScheme="blue"
                    className={`focus:outline-none px-3 py-2 mt-5 rounded`}
                  >
                    Link Spotify
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </SeoLayout>
  );
}
