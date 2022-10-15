import React from "react";
import Link from "next/link";

const SideChatLink = ({
  isActive,
  unreadMessages,
  chat: { to, updatedAt },
}) => {

  console.log(isActive)
  console.log(unreadMessages)
  return (
    <Link href={`/messages/${to?._id}`} passHref>
      <a
        className={`flex items-center w-full py-3 px-5 hover:bg-gray-900 duration-200 ${
          isActive && "bg-gray-900"
        }`}
      >
        <figure className="m-0 p-0 w-14 h-14 ">
          <img
            src={
              to?.profileImage == "default.png"
                ? "/defaultImage.png"
                : to?.profileImage
            }
            alt=""
            style={{ minWidth: "3.5rem" }}
            className=" w-14 h-14 object-cover rounded-full"
          />
        </figure>
        <div className="flex-1 flex ml-3">
          <div className="flex-1 overflow-hidden">
            <h4 className="text-gray-200 font-bold text-base">
              {to?.userName}
            </h4>
            <h5 className="text-gray-400 text-base whitespace-nowrap truncate overflow-hidden max-w-full">
              {to?.email}
            </h5>
          </div>
          <div className="flex flex-col justify-between items-end">
            <h4 className="text-gray-400 text-base">
              {new Date(updatedAt).toDateString()}
            </h4>
            {unreadMessages && (
              <div className="w-6 h-6 rounded-full mt-1 bg-green-500 bg-opacity-80 text-white grid place-content-center">
                {unreadMessages}
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SideChatLink;
