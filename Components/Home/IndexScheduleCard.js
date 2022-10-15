import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { ShareAltOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";

const IndexScheduleCard = ({ party, joinParty }) => {
  const [loading, setLoading] = useState(false);
  const [hasExtension, setHasExtension] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    chrome.runtime.sendMessage({ message: "version" }, function (reply) {
      console.log(reply);
      if (reply) {
        if (reply.version) {
          setHasExtension(true);
        }
      } else {
        setHasExtension(false);
      }
    });
  };

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      if (hasExtension) {
        joinParty(party?._id, setLoading, party?.partyTitle);
      } else {
        window.open(
          "https://chrome.google.com/webstore/detail/viewing-party-internet-wa/pffaegjjkopdniooioigjfjkncgfiokl",
          "_blank",
          "location=yes,height=550,width=700,scrollbars=yes,status=yes,top=100 left=50%"
        );
      }
    }
  }, [hasExtension]);

  return (
    <div className="bg-gray-900 pb-5 group hover:scale-105 duration-200 transform rounded-b-2xl bg-opacity-25">
      <Link
        href={`/discover/${party?.imdbID}`}
        className={"cursor-pointer"}
        passHref
      >
        <figure className="relative overflow-hidden h-52 cursor-pointer">
          <img
            src={`${party?.movieImg}`}
            className="w-full h-full object-cover cursor-pointer"
            alt="avengers"
          />
          <div className="bg-black bg-opacity-70 absolute top-3 left-3 p-1 rounded-sm">
            {/* <h2 className="text-white text-sm">{party?.attendees.length} Invited</h2> */}
          </div>
          <div className="bg-red-500 absolute top-3 right-3 p-1 px-3 rounded-sm">
            <h2 className="text-white text-sm">
              <span>
                {moment(party?.scheduleDate).format("LLL")}
                {/* <span className="text-primary font-semibold mx-2">|</span>{" "} */}
              </span>
            </h2>
          </div>
        </figure>
      </Link>
      <div className="px-5">
        <div className="flex justify-between items-center pt-4 pb-2">
          <h2 className="text-white text-lg">{party?.partyTitle}</h2>
          {/* <h4 className="text-white text-lg uppercase">{party?.countries[0]}</h4> */}
        </div>
        <div className="flex justify-between items-center pt-4 pb-2">
          <h2 className="text-white text-lg">{party?.movieName}</h2>
          {/* <h4 className="text-white text-lg uppercase">{party?.countries[0]}</h4> */}
        </div>
        <div className="flex justify-between items-center mt-2 mb-2">
          <h4 className="text-sm" style={{ color: "grey" }}>
            {" "}
            {party?.title}
          </h4>
          <button
            // onClick={() => joinParty(party?._id, setLoading, party?.partyTitle)}
            onClick={() => handleClick()}
            className="outline-none rounded-full items-center flex text-sm text-white w-max px-5 py-2 border border-gray-300 group duration-200 hover:bg-gray-800 ml-3"
          >
            {loading && <i className="fa fa-spin fa-spinner mr-3"></i>}
            Join Party
          </button>
        </div>
        <div className="text-sm flex" style={{ color: "grey" }}></div>
      </div>
    </div>
  );
};

export default IndexScheduleCard;
