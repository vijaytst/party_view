import React from "react";
import Moment from "react-moment";

const ChatMessage = ({ message, ref, userInfo, chatMeta }) => {
  const isOwner =
    typeof message?.user === "object"
      ? message?.user?._id
      : message?.user === userInfo.data._id;

  const createdDate = new Date(message.createdAt);

  return (
    <div className={`w-full relative mb-1 text-sm unique-chat-class mt-10`} ref={ref}>
      <div className={`px-3 py-1 rounded-tr-2xl relative w-full`}>
        <i className="text-xs font-semibold text-white mr-1">
          <Moment format={"LT"} date={createdDate} />
        </i>
        <p className="contents leading-0 text-gray-200 text-sm">
          <span
            className={"mr-1 font-semibold"}
            style={{ color: "rgba(102,252,241)" }}
          >
            {isOwner ? "You" : "@" + chatMeta?.to?.userName}
          </span>
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
