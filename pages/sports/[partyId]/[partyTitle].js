import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../../../Components/Layouts/Navbar";

import Head from "next/head";
import { FormAuthContext } from "../../../pages/_app";
import axios from "../../../services/axios";
import { useRouter } from "next/router";
import ChatHeader from "../../../Components/SportsChat/SportChatHeader";
import SprtsChatMessageList from "../../../Components/SportsChat/SportChatMessageList";
import SportChatForm from "../../../Components/SportsChat/SportChatForm";
import { socket } from "../../../services/socket";
import { Button } from "@chakra-ui/react";
import { notification } from "antd";
import Split from 'react-split'

const SingleSportParty = ({ party }) => {
  const router = useRouter();

  const context = useContext(FormAuthContext);
  const [header, setHeader] = useState("");
  const [sportsParty, setSportsParty] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [streamingUrl, setStreamingUrl] = useState("");
  const [resizeHeight, setResizeHeight] = useState("800");
  const [resizeWidth, setResizeWidth] = useState("100%");
  const [showIframe, setShowIframe] = useState(false);
  const [tokenState, setTokenState] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const [value, setValue] = useState({
    partyId: router?.query?.partyId,
    userId: userInfo?._id,
    message: "",
  });

  const updateLink = (event) => {
    setStreamingUrl(event.target.value);
  };

  const switchView = () => {
    setShowIframe(true);
  };

  useEffect(() => {
setResizeHeight(window.innerHeight)
    axios
      .get("/profile", {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setUserInfo(res.data.data);
        setTokenState(true);
      })
      .catch((err) => {
        DeleteAuthToken();
        router.push("/");
        setTokenState(false);
        notification.error({
          message: err?.response?.data?.message || err.message,
        });
      });
  }, []);

  useEffect(() => {
    axios.defaults.headers["x-access-token"] = header;
    axios
      .get(
        `/get-single-sports-party?partyId=${
          window.history.state.as.split("/")[2]
        }`
      )
      .then((data) => {
        setSportsParty(data.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log("error from get sports party");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket.on("connect", (res) => {
      console.log("connect status", socket.connected);
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (tokenState) {
      socket.emit(
        "join_sport_party",
        {
          partyId: window.history.state.as.split("/")[2],
          userId: userInfo?._id,
        },
        (res) => {
          if (!res.error)
            return setMessages((prev) => [...prev, ...res.messages]);
        }
      );
      return (error) => {
        console.log("from join_sport_party error block");
        console.log(error);
        socket.disconnect();
        socket.close();
      };
    }
  }, [tokenState]);

  useEffect(() => {
    socket.on("message_sport_party", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 2px #ddd",
    background: "#f0f0f0",
  };

  const resize = (data) => {
    let newHeight = `${data.clientY}px`;
    let newWidth = `${data.clientX}px`;
    let domNode = data.path[2];
    setResizeHeight(domNode.style.height);
    setResizeWidth(`${domNode.style.width}px`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Head>
          <title>ViewingParty - sports party </title>
          <meta
            name="description"
            content="The best way to watch shows and movies with others"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ marginBottom: "45px" }}>
          <Navbar />
        </div>
      </div>
      <div className="flex h-full w-full mt-3" style={{}}>
        <div style={{ width: "100%", height: `100vh` ,marginTop:"0px"}}>
          <div style={{ background: "black" }}>
            {showIframe ? (
              <div style={{ paddingTop: "10px", height: `100vh` }}>
          
          <Split className="flex">
      <div style={{height:'100vh'}}>    <iframe
                    allowFullScreen
                    frameBorder="0"
                    height={resizeHeight}
                    src={streamingUrl}
                    width={`100%`}
                  /></div>
      <div>
      <div
                    style={{ height: "100%", backgroundColor: "black" }}
                    className=""
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#030816e8",
                        backdropFilter: "blur(.6rem)",
                      }}
                      // className="react-scroll-to-bottom--css-zwklu-1n7m0yu"
                      className="resize"
                    >
                      <div >
                        <ChatHeader partyInfo={sportsParty} />
                      </div>

                      <div >
                        <SportChatForm
                          userInfo={userInfo}
                          value={value}
                          setValue={setValue}
                          partyId={router?.query?.partyId}
                        />
                      </div>
                      <div>
                        <SprtsChatMessageList
                          messages={messages}
                          userInfo={userInfo}
                        />
                      </div>
                    </div>
                  </div>
      </div>
    </Split>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: '100vh',
                }}
                className="pt-64"
              >
                <input
                  onChange={updateLink}
                  style={{
                    border: "1px solid grey",
                    width: "80%",
                    height: "40px",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  className="rounded p-2 bg-black"
                  placeholder="Enter streaming url here"
                ></input>

                <Button
                  onClick={switchView}
                  style={{
                    width: "100px",
                    color: "aqua",
                    height: "50px",
                    background: "linear-gradient(45deg, black, transparent)",
                    borderRadius: "10px",
                    border: "1px solid grey",
                  }}
                  className="mt-5 font-bold font-lg"
                >
                  {" "}
                  Submit{" "}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
	try {
   let fetchParty = await axios
      .get(
        `/get-single-sports-party?partyId=${
          context.query.partyId
        }`
      )
      .then((data) => {
        return data.data.data 
      })
      .catch((error) => {
        console.log("error from get youtube party");
        console.log(error);
      });
		return {
			props: {
        party:fetchParty
			},
		};
	} catch (error) {
		console.log("error");
    console.log(error)
		return {
			props: {
				"name": 'error',
			},
		};
	}
}

export default SingleSportParty;
