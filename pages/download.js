import Head from "next/head";
import Footer from "../Components/Layouts/Footer";
import Navbar from "../Components/Layouts/Navbar";
import HowToCard from "../Components/Extension/HowToCard";

import { Tabs } from "antd";

export default function Download() {
  const { TabPane } = Tabs;

  const viewersData = [
    {
      title: "DOWNLOAD THE EXTENSION FOR YOUR BROWSER",
      instruction:
        "Click on the button above to install the correct extension for your browser. After installation you can pin the extension to your browser for easier access. ",
    },

    {
      title: "Join a party",
      instruction:
        'After a successful download, join a party by clicking on the extension icon. Select "Join a party" from the extension options. Input the name of the Twitch Channel you wish to join, and then click on "Join a party".',
    },
    {
      title: "Enjoy",
      instruction:
        "A window will open up with the synchronized video and the Twitch channel's chatroom.",
    },
  ];

  const streamersData = [
    {
      title: "DOWNLOAD THE EXTENSION FOR YOUR BROWSER",
      instruction:
        "Click on the button above to install the correct extension for your browser. After installation you can pin the extension to your browser for easier access. ",
    },

    {
      title: "HOST A VIEWING PARTY",
      instruction:
        'To start a viewing party click on on extension and select "Host a party" from the extension options. You will be redirected to authenticate with Twitch and then with your video service (ie Netflix). A window to browse the video service you chose will open up with Viewing Party messages showing your status.',
    },
    {
      title: "START THE VIEWING PARTY!",
      instruction:
        "Make sure not to broadcast/share the video to Twitch or risk Copyright Infringement. Also, make sure not to have the sound leak into the microphone which would broadcast the movie/show audio. If unsure, headphones would be safest. Start the movie/show and enjoy automatic synchronization with your viewers while also accounting for any Twitch stream delays that occur. (ie Latency to Broadcaster)",
    },
  ];

  function callback(key) {}

  return (
    <div style={{ backgroundColor: "#0b0c10" }}>
      <Head>
        <title>ViewingParty - About</title>
        <meta
          name="description"
          content="The best way to watch shows and movies with others"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={"px-5 bg-no-repeat bg-cover"}
        style={{ backgroundColor: "#0b0c10" }}
      >
        <Navbar />
        <div
          style={{ paddingTop: "150px" }}
          className={"container py-24 mx-auto text-center text-gray-100"}
        >
          <h1 className={"uppercase py-4 text-4xl md:text-5xl font-normal"}>
            VIEWING PARTY ADD ONS
          </h1>
          <p
            className={
              "pb-4 font-mono text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text"
            }
            style={{
              background: "rgb(102,252,241)",
              background:
                "linear-gradient(36deg, rgba(102,252,241,1) 0%, rgba(69,162,158,1) 50%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Web Browser Extensions
            {/* <Link href="#">ViewingParty</Link> */}
          </p>
          <div className={"grid lg:grid-cols-4 mb-5"}>
            <p className={"col-start-2 col-span-2"}>
              Join, watch and enjoy movies from Netflix, Disney+, or HBO Max
              with your family and friends. Through our extension, VIEWING
              PARTY, you can host a party and invite your friends or join a
              friend's party all in one extension .
            </p>
          </div>

          <a
            className=""
            target="_blank"
            rel="noopener noreferrer"
            href={
              "https://chrome.google.com/webstore/detail/viewing-party-internet-wa/pffaegjjkopdniooioigjfjkncgfiokl"
            }
            className={
              " py-2 md:py-2 px-2 md:px-5 text-sm sm:text-base font-semibold rounded-full  sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border mr-5 text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white"
            }
            style={{ border: "2px solid #1f2833" }}
          >
            Add Chrome Extension to Browser
          </a>

          <div className={"block md:grid md:grid-cols-5"}>
            <div className={"md:col-start-2 md:col-span-3"}>
              <div className={"mt-10 mb-10 block xl:grid xl:grid-cols-3"}>
                <ul className={"text-left xl:col-start-2"}>
                  <li className={"flex justify-between"}>
                    <b className={"mr-5"} style={{ color: "#66fcf1" }}>
                      Language:
                    </b>
                    English
                  </li>
                  <li className={"flex justify-between"}>
                    <b className={"mr-5"} style={{ color: "#66fcf1" }}>
                      Compatibility:
                    </b>
                    Desktop devices
                  </li>
                </ul>
              </div>
              <img
                src={"/images/download.jpg"}
                className={"w-full bg-contain"}
                alt={"extension"}
              />
            </div>
          </div>
          <div
            style={{ maxWidth: "55rem" }}
            className={"mt-5 mx-auto text-left"}
          >
            <p
              className={
                "pb-2 text-center border-b font-mono text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text"
              }
              style={{
                background: "rgb(102,252,241)",
                marginTop: "50px",
                background:
                  "linear-gradient(36deg, rgba(102,252,241,1) 0%, rgba(69,162,158,1) 50%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Getting started
            </p>

            {/* <p
              className={
                "pb-2 text-center border-b font-mono text-sm md:text-xl font-extrabold text-transparent bg-clip-text"
              }
              style={{
                background: "rgb(102,252,241)",
                background:
                  "linear-gradient(36deg, rgba(102,252,241,1) 0%, rgba(69,162,158,1) 50%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
            Streamers/ Viewers
            </p> */}

            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
              }}
              className={
                "flex justify-center pb-2 text-center border-b font-mono text-sm md:text-xl font-extrabold text-transparent text-white bg-clip-text"
              }
            >
              <TabPane
                style={{ justifyContent: "center" }}
                tab="As Viewers"
                key="1"
              >
                <div className={"mt-8"}>
                  {viewersData.map((info, index) => (
                    <>
                      <HowToCard
                        title={info.title}
                        instructions={info.instruction}
                        index={index}
                      />
                    </>
                  ))}

                  <div
                    style={{ textAlign: "left" }}
                    className="flex pt-2 mb-2 "
                  >
                    REMINDER! You will need to log into your paid video service
                    account (ie Netflix) and have the movie/show available in
                    your region. Not all regions have the same access to
                    movies/shows
                  </div>
                </div>
              </TabPane>
              <TabPane tab="As Streamers" key="2">
                {streamersData.map((info, index) => (
                  <HowToCard
                    title={info.title}
                    instructions={info.instruction}
                    index={index}
                  />
                ))}

                <div style={{ textAlign: "left" }} className="flex pt-2 mb-2 ">
                  REMINDER! You will need to log into your paid video service
                  account (ie Netflix) and have the movie/show available in your
                  region. Not all regions have the same access to movies/shows
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
