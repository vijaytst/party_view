import React, { useState, useEffect } from "react";
import { Input, Button, Text } from "@chakra-ui/react";
import moment from "moment";
import SeoLayout from "../Components/Layouts/SeoLayout";
import Navbar from "../Components/Layouts/Navbar";
import { useRouter } from "next/router";

import Footer from "../Components/Layouts/Footer.js";

import axios, { DeleteAuthToken, setAuthToken } from "../services/axios";
import { Tooltip, DatePicker, Space, notification } from "antd";

export default function Sports() {
  const [isOnGoing, setIsOnGoing] = useState(true);
  const [partyCreated, setPartyCreated] = useState(false);

  const [partyInfo, setPartyInfo] = useState({
    streamingUrl: "sports streamijng url",
    partyTitle: "",
    sportType: "",
  });

  const [header, setHeader] = useState();

  useEffect(() => {
    let userToken = localStorage.getItem("accessToken");
    if (userToken) {
      setAuthToken(true);
      setHeader(userToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const [display, setDisplay] = useState(false);
  const toggleParty = () => setIsOnGoing(!isOnGoing);

  const onChange = (date, dateString) => {
    setDateFilter(moment(dateString).format("DD-MMM-YYYY"));
  };

  const updateInputValue = (e) => {
    let targetValue = e.target.name;

    let newState = { ...partyInfo, [e.target.name]: e.target.value };
    setPartyInfo(newState);
  };

  const crateSportsParty = () => {
    setPartyCreated(true);
    let data = partyInfo;
    axios.defaults.headers["x-access-token"] = header;
    axios
      .post(`/create-sport-party`, data)
      .then((res) => {
        notification.success({
          description: "Successfully created sports party",
          duration: 5000,
        });


        //
        setPartyCreated(false);
        router.push(`/sports/${res.data.data._id}`);
      })
      .catch((err) => {
        notification.error({
          message: "User Error!",
          description:
            err?.response?.data?.message?.error?.message || err?.message,
          duration: 5000,
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
                Create a sports party{" "}
              </h1>
            </div>
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

              <div className="mt-3">
                <Text mb="8px" className="text-center font-bold">
                  Sport type{" "}
                </Text>

                <Input
                  style={{ color: "black", borderRadius: "12px" }}
                  className="w-screen max-w-xs  md:max-w-3xl black p-1"
                  size={"lg"}
                  name={"sportType"}
                  onChange={updateInputValue}
                ></Input>
              </div>
              <Button
                style={{ background: "teal", width: "100px" }}
                colorScheme="blue"
                onClick={crateSportsParty}
                className={`focus:outline-none px-3 py-2 mt-5 rounded`}
              >
                {!partyCreated ? (
                  "Submit"
                ) : (
                  <i className="fa fa-spin fa-spinner mr-3"></i>
                )}
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SeoLayout>
  );
}
