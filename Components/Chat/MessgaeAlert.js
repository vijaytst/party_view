import React from "react";
import classes from "./Chat.module.css";

import Moment from "react-moment";

const MessageAlert = ({ message, userInfo, ref }) => {
  const isOwner = message?.userId?._id == userInfo.data._id;
  const createdDate = new Date(message.createdAt);

  return (
    <div className={`mx-auto relative w-full mb-1 unique-chat-class`} ref={ref}>
      <div
        className={`px-2 py-1 relative w-full text-center`}
        // style={{ backgroundColor: "#36404a" }}
      >
        <p className="text-xs leading-0 text-gray-50">
          {isOwner ? (
            <span
              className={"font-bold font-mono mr-1"}
              style={{ color: "rgba(102,252,241)" }}
            >
              You
            </span>
          ) : (
            <span>{message?.userId?.userName} {' '}</span>
          )}
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default MessageAlert;
