import React from "react";
import { useRouter } from "next/router";
import SideChatLink from "./SideChatLink";

const Sidebar = ({ chats, setNewChatOpen, className }) => {
  const { chatId } = useRouter().query;
  console.log(chats)

  return (
    <div
      style={{ flexBasis: "380px" }}
      className={`overflow-y-auto border-r border-l border-gray-800 flex flex-col ${className}`}
    >
      <div className="py-2 border-b border-gray-800 px-5">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-xl">Messages</h4>
          <button
            onClick={() => setNewChatOpen(true)}
            className="w-10 h-10 rounded-full hover:bg-gray-900 grid place-content-center"
          >
            <img src="/icons/message-add.png" />
          </button>
        </div>
        <div className="mt-3">
          <input
            placeholder="Search for People"
            onClick={() => setNewChatOpen(true)}
            className="block outline-none py-2 px-5 rounded-full cursor-pointer text-gray-200 focus:outline-none border border-gray-800 w-full bg-transparent"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <SideChatLink
            isActive={chat?.to?._id === chatId}
            chat={chat}
            key={chat?._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
