import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import { ShareAltOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";

const UserScheduleCard = ({
  joinParty,
  attendees,
  movieImg,
  originalName,
  movieId,
  movieName,
  privacyStatus,
  scheduleDate,
  _id,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gray-900 pb-5 group hover:scale-105 duration-200 transform rounded-b-2xl bg-opacity-25">
      <Link href={`/discover/${movieId}`} className={"cursor-pointer"} passHref>
        <figure className="relative overflow-hidden h-52 cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/original${movieImg}`}
            className="w-full h-full object-cover cursor-pointer"
            alt="avengers"
          />
          <div className="bg-black bg-opacity-70 absolute top-3 left-3 p-1 rounded-sm">
            <h2 className="text-white text-sm">{attendees.length} Invited</h2>
          </div>
          <div className="bg-red-500 absolute top-3 right-3 p-1 px-3 rounded-sm">
            <h2 className="text-white text-sm">
              <span>
                {moment(scheduleDate).format("LLL")}
                {/* <span className="text-primary font-semibold mx-2">|</span>{" "} */}
              </span>
            </h2>
          </div>
        </figure>
      </Link>
      <div className="px-5">
        <div className="flex justify-between items-center pt-4 pb-2">
          <h4 className="text-white text-lg">{movieName}</h4>
          <h4 className="text-white text-lg uppercase">{privacyStatus}</h4>
        </div>
        <div className={"flex items-center justify-between"}>
          <div className="flex mt-1">
            <button className="w-8 h-8 outline-none rounded-full grid place-content-center border border-gray-300 group duration-200 hover:border-primary hover:bg-gray-900">
              <ShareAltOutlined className="text-gray-300 group-hover:text-primary duration-200" />
            </button>
          </div>
          <div>
            <button
              onClick={() => joinParty(_id, setLoading, movieName)}
              className="outline-none rounded-full items-center flex text-sm text-white w-max px-5 py-2 border border-gray-300 group duration-200 hover:bg-gray-800 ml-3"
            >
              {loading && <i className="fa fa-spin fa-spinner mr-3"></i>}
              Join Party
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScheduleCard;
