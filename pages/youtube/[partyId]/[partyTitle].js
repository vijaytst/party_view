import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../../../Components/Layouts/Navbar";
import { findDOMNode } from "react-dom";

import Head from "next/head";
import { FormAuthContext } from "../../../pages/_app";
import axios from "../../../services/axios";
import { useRouter } from "next/router";
import ChatHeader from "../../../Components/YoutubeChat/YoutubeChatHeader";
import YoutubeChatMessageList from "../../../Components/YoutubeChat/YoutubeChatMessageList";
import YoutubeChatForm from "../../../Components/YoutubeChat/YoutubeChatForm";
import { socket } from "../../../services/socket";
import { notification, Spin, Input } from "antd";
import ReactPlayer from "react-player";
import Split from "react-split";
import { LoadingOutlined, CloseCircleFilled } from "@ant-design/icons";
import Carousel from "react-elastic-carousel";

const SingleYoutubeParty = ({ party }) => {
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
  const [queueInput, setQueueInput] = useState("");
  const [userData, setUserData] = useState({});
  const [playState, setPlayState] = useState(false);
  const [timerId, setTimerId] = useState();
  const [queueDeactivated, setQueueDeactivated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);


  const playerRef = useRef(null);
  const cancelRef = useRef([]);

  const antIcon = <LoadingOutlined style={{ fontSize: 300 }} spin />;

  const [value, setValue] = useState({
    partyId: router?.query?.partyId,
    userId: userData?._id,
    message: "",
  });

  useEffect(()=>{
sportsParty?.creator?._id === userData?._id?(setAdmin(true)):(setAdmin(false))
  },[])

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  const updateLink = (event) => {
    setStreamingUrl(event.target.value);
  };

  const switchView = () => {
    setShowIframe(true);
  };
  const playVideo = () => {
    socket.emit(
      "updateYoutubePlayMode",
      {
        partyId: sportsParty?._id,
        playState: true,
      },
      (res) => {
        if (!res.error) return;
      }
    );
    setPlayState(true);
  };

  useEffect(() => {
    setInterval(() => {
      const currentTime = playerRef?.current?.getCurrentTime();
      socket.emit(
        "updatePlaytime",
        {
          partyId: sportsParty?._id || "61e35de3158593001de8b835",
          viewTime: currentTime,
        },
        (res) => {
          if (!res.error) return;
        }
      );
    }, 1000);
  }, []);

  const triggerTimeUpdate = function () {
    const runTimer = setInterval(() => {
      const currentTime = playerRef?.current?.getCurrentTime();
      socket.emit(
        "updatePlaytime",
        {
          partyId: sportsParty?._id || "61e35de3158593001de8b835",
          viewTime: currentTime,
        },
        (res) => {
          if (!res.error) return;
        }
      );
    }, 2000);
    setTimerId(runTimer);
  };

  const handleQueueInput = (data) => {
    setQueueInput(data.target.value);
  };

  const handleOnStart = (data) => {
    if (userData._id === sportsParty.creator._id) {
      triggerTimeUpdate();
    } else {
      return;
    }
  };

  const handlePause = () => {
    clearInterval(timerId);
  };

  const addVideoToQueue = () => {
    socket.emit(
      "add_to_queue",
      {
        partyId: sportsParty._id,
        payload: {
          videoUrl: queueInput,
          addedBy: userData._id,
          username: userData.username,
        },
      },
    );
    setQueueInput("");
  };

  const clearQueue = () => {
    socket.emit(
      "clear_youtube_queue",
      {
        partyId: sportsParty._id,
      },
    );
    setQueueInput("");
  };

  const removeVideoFromQueue = (data) => {
    socket.emit(
      "remove_from_queue",
      {
        partyId: sportsParty._id,
        videoUrl: data.videoUrl,
      },
    );
  };

  const toggleFullscreen = () => {
    findDOMNode(playerRef.current)
      .requestFullscreen()
      .catch((err) => console.log(err));
  };

  const stopVideo = () => {
    socket.emit(
      "updateYoutubePlayMode",
      {
        partyId: sportsParty?._id,
        playState: false,
      },
      (res) => {
        if (!res.error) return;
      }
    );
    setPlayState(false);
  };

  const playPrevious = () => {
    const currentIndex = currentQueueIndex !== 0 ? currentQueueIndex - 1 : 0;
    setCurrentQueueIndex(currentIndex);
    const queueVideo = sportsParty.queue[currentIndex];

    socket.emit(
      "start_next_video",
      {
        partyId: sportsParty?._id,
        videoUrl: queueVideo.videoUrl,
      },
      (res) => {
        if (!res.error) return;
      }
    );
  };

  const playNext = () => {
    const currentIndex =
      currentQueueIndex !== sportsParty.queue.length - 1
        ? parseInt(currentQueueIndex) + 1
        : sportsParty.queue.length - 1;
    setCurrentQueueIndex(currentIndex);
    const queueVideo = sportsParty.queue[currentIndex];

    socket.emit(
      "start_next_video",
      {
        partyId: sportsParty?._id,
        videoUrl: queueVideo.videoUrl,
      },
      (res) => {
        if (!res.error) return;
      }
    );
  };

  const videoEnded = (data) => {
    const index = sportsParty.queue.findIndex(
      (x) => x.videoUrl === sportsParty.videoUrl
    );
    const newVideo = sportsParty.queue[index + 1];
    if (newVideo !== undefined || null) {
      setCurrentQueueIndex(index + 1);
      socket.emit(
        "start_next_video",
        {
          partyId: sportsParty?._id,
          videoUrl: newVideo.videoUrl,
        },
        (res) => {
          if (!res.error) return;
        }
      );
    } else {
      socket.emit(
        "start_next_video",
        {
          partyId: sportsParty?._id,
          videoUrl: sportsParty.videoUrl,
        },
        (res) => {
          if (!res.error) return;
        }
      );
    }
  };

  const toggleQueueVisible = (data) => {
    setQueueDeactivated(true);
    socket.emit(
      "toggle_activate_queue",
      {
        partyId: sportsParty?._id,
        activateQueue: data,
      },
      (res) => {
        setQueueDeactivated(false);
        if (!res.error) return;
      }
    );
  };
  useEffect(() => {
    setResizeHeight(window.innerHeight);
    axios
      .get("/profile", {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        sportsParty?.creator?._id === res.data?.data?._id?(setAdmin(true)):(setAdmin(false))
        setUserData(res.data.data);
        setTokenState(true);
      })
      .catch((err) => {
        console.log(err)
        // DeleteAuthToken();
        // router.push("/");
        // setTokenState(false);
        // notification.error({
        //   message: 'SignIn to join party',
        //   duration: 1
        // });
      });
  }, [sportsParty]);

  useEffect(() => {
    axios.defaults.headers["x-access-token"] = header;
    axios
      .get(
        `/get-single-youtube-party?partyId=${
          window.history.state.as.split("/")[2]
        }`
      )
      .then((data) => {
        setSportsParty(data.data.data);
        setIsLoading(true);

      })
      .catch((error) => {
        console.log("error from get youtube party");
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
        "join_youtube_party",
        {
          partyId: window.history.state.as.split("/")[2],
          userId: userData?._id,
          message: "joined party",
        },
        (res) => {
          if (!res.error)
            return setMessages((prev) => [...prev, ...res.messages]);
        }
      );
      return (error) => {
        console.log("from join_youtube_party error block");
        console.log(error);
        socket.disconnect();
        socket.close();
      };
    }
  }, [tokenState]);

  useEffect(() => {
    socket.on("message_youtube_party", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("endYoutubeParty", (data) => {
      setSportsParty(data.party);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("add_to_queue", (data) => {
      axios
      .get("/profile", {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setUserData(res.data.data);
        setSportsParty(data);
        setTokenState(true);
      })
      .catch((err) => {
        console.log(err)
        // DeleteAuthToken();
        // router.push("/");
        // setTokenState(false);
        // notification.error({
        //   message: 'SignIn to join party',
        //   duration: 1
        // });
      });
 
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("startYoutubeParty", (data) => {
      setSportsParty(data.party);
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("clear_youtube_queue", (data) => {
      setSportsParty(data);
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("remove_from_queue", (data) => {
      setSportsParty(data);
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("start_next_video", (data) => {
      setSportsParty(data);
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  //toggle_activate_queue

  useEffect(() => {
    socket.on("toggle_activate_queue", (data) => {
      setSportsParty(data);
      data.activateQueue
        ? notification.error({
            message: "Queue input activated",
            duration: 1,
          })
        : notification.error({
            message: "Queue input deactivated",
            duration: 1,
          });
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("updateYoutubePlayMode", (data) => {
      axios.defaults.headers["x-access-token"] = header;
      axios
        .get(`/get-single-youtube-party?partyId=${data.partyId}`)
        .then((data) => {
          setSportsParty(data.data.data);
        })
        .catch((error) => {
          console.log("error from get youtube party");
          console.log(error);
        });

      setPlayState(data.playState);
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

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Head>
          <title>ViewingParty - Youtube party </title>
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
        <div style={{ width: "100%", height: `100vh`, marginTop: "0px" }}>
          <div style={{ background: "black" }}>
            <div style={{ paddingTop: "10px", height: `100vh` }}>
              <Split className="flex">
                <div style={{ height: "100vh" }}>
                  {sportsParty.started ? (
                    <ReactPlayer
                      ref={playerRef}
                      className={
                        admin
                          ? ""
                          : "pointer-events-none"
                      }
                      width={"100%"}
                      url={`${sportsParty.videoUrl}&start=${sportsParty.viewTime}&ecver=2`}
                      height={"87%"}
                      controls={
                        admin
                          ? true
                          : false
                      }
                      playing={playState}
                      onPlay={handleOnStart}
                      onPause={handlePause}
                      onEnded={videoEnded}
                      // light={true}
                    />
                  ) : (
                    <h2
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px",
                        height: "87%",
                        color: "white",
                        flexDirection: "column",
                      }}
                    >
                      <Spin indicator={antIcon} size="large" />
                      <h1 style={{ alignSelf: "center" }}>
                        Waiting for party to start
                      </h1>
                    </h2>
                  )}

                  {sportsParty.started ? (
                    <div>
                      <div className="flex justify-center pt-3">
                        {admin ? (
                          <>
                            <button
                              onClick={playVideo}
                              class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-2 font-medium border border-gray-400 rounded shadow mr-2"
                            >
                              Play
                            </button>
                            <button
                              onClick={stopVideo}
                              class="bg-white hover:bg-gray-100 text-gray-800  py-2 px-2 border border-gray-400 rounded shadow"
                            >
                              Stop
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                        <button
                          onClick={toggleFullscreen}
                          class="bg-white hover:bg-gray-100 ml-2 text-gray-800 font-medium py-2 px-2 border border-gray-400 rounded shadow"
                        >
                          Fullscreen
                        </button>
                      </div>
                      <div className="mt-2 ml-3 flex flex-col">
                        {
                          admin?(
                            <>
                                     <div
                          style={{ justifyContent: "center" }}
                          className="flex justify-centre"
                        >
                          <Input
                            value={queueInput}
                            onChange={handleQueueInput}
                            placeholder="Input video url"
                            style={{ width: 300 }}
                            className="mr-2"
                          />

                          <button
                            onClick={addVideoToQueue}
                            class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-1 px-2 border border-gray-400 rounded shadow mr-2"
                          >
                            Add to Queue
                          </button>
                            <>
                              <button
                                onClick={clearQueue}
                                class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-1 px-2 border border-gray-400 rounded shadow mr-2"
                              >
                                Empty Queue
                              </button>
                            </>
                        </div>
                            </>

                          ):(
                            ''
                          )
                        }
                        <div className="mt-12 mb-10">
                          <Carousel breakPoints={breakPoints} isRTL={false}>
                            {sportsParty.queue.map((item, index) => (
                              <div
                                className="mb-5"
                                id={item.videoUrl}
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <div className="flex flex-end">
                                  {item.videoUrl === sportsParty.videoUrl ? (
                                    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                      currently playing
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {admin ? (
                                    <CloseCircleFilled
                                      ref={(item) =>
                                        cancelRef.current.push(item)
                                      }
                                      onClick={() => removeVideoFromQueue(item)}
                                      className="ml-auto mr-3 cursor-pointer"
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                      id={item.videoUrl}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <ReactPlayer
                                  style={{ marginTop: "0px" }}
                                  className={
                                    admin
                                      ? ""
                                      : "pointer-events-none"
                                  }
                                  url={item.videoUrl}
                                  width={"90%"}
                                  height={"90%"}
                                  controls={true}
                                  // onEnded={videoEnded}
                                  playing={false}
                                  // onPlay={handleOnStart}
                                  // onPause={handlePause}
                                  // light={true}
                                />
                              </div>
                            ))}
                          </Carousel>
                          <div className="flex justify-center flex-row mb-5 mt-3">
                            <button
                              class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow mr-2"
                              onClick={() =>
                                playPrevious(
                                  currentQueueIndex !== 0
                                    ? setCurrentQueueIndex(
                                        currentQueueIndex - 1
                                      )
                                    : 0
                                )
                              }
                            >
                              Prev
                            </button>
                            <button
                              class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                              onClick={() =>
                                playNext(
                                  setCurrentQueueIndex(currentQueueIndex + 1)
                                )
                              }
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

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
                      // className="react-scroll-to-bottom--css-zwklu-1n7m0yushowinfo=0&controls=0&autohide=1"
                      className="resize"
                    >
                      <div>
                        <ChatHeader partyInfo={sportsParty} />
                      </div>

                      <div>
                        <YoutubeChatForm
                          userInfo={userData}
                          value={value}
                          setValue={setValue}
                          partyId={router?.query?.partyId}
                        />
                      </div>
                      <div>
                        <YoutubeChatMessageList
                          messages={messages}
                          userInfo={userData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Split>
            </div>
            }
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
      .get(`/get-single-youtube-party?partyId=${context.query.partyId}`)
      .then((data) => {
        return data.data.data;
      })
      .catch((error) => {
        console.log("error from get youtube party");
        console.log(error);
      });
    return {
      props: {
        party: fetchParty,
      },
    };
  } catch (error) {
    console.log("error");
    console.log(error);
    return {
      props: {
        name: "error",
      },
    };
  }
}

export default SingleYoutubeParty;
