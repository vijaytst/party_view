import React from "react";
import classes from "./Chat.module.css";
import Moment from "react-moment";

const ChatMessage = ({ message, ref, userInfo }) => {
  const isOwner = message?.userId?._id === userInfo._id;

  const createdDate = new Date(message.createdAt);

  return (
    <div className={`w-full relative mb-1 text-sm unique-chat-class`} style={{height :'60%'}} ref={ref}>
      <div
        className={`px-3 py-1 rounded-tr-2xl relative w-full`}
        // style={{ backgroundColor: "#36404a" }}
      >
        <i className="text-xs font-semibold text-white mr-1">
          <Moment format={"LT"} date={createdDate} />
        </i>
        <p className="contents leading-0 text-gray-200 text-sm">
          <span
            className={"mr-1 font-semibold"}
            style={{ color: "rgba(102,252,241)" }}
          >
            {isOwner ? "You" : "@" + message?.userId?.userName}
          </span>
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
