import React from "react";
import { socket } from "../../services/socket";

const ChatForm = ({ value, setValue, userInfo, chatId }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      socket.emit(
        "private_message",
        {
          to: chatId,
          userId: userInfo.data._id,
          message: value,
          room: chatId,
        },
        () => setValue("")
      );
    }
  };

  return (
    <div className="p-3 py-2" style={{ backgroundColor: "#03101f" }}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex items-center w-full">
          <div>
            <button
              style={{ outline: 0 }}
              type="button"
              className="text-2xl text-gray-400 px-4 "
            >
              <i className="far fa-laugh"></i>
            </button>
          </div>
          <input
            type="text"
            style={{ backgroundColor: "#36404a" }}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Message here..."
            className=" text-base flex-1 shadow outline-none text-gray-200 px-5 py-1"
          />
          <button
            type="submit"
            style={{ outline: 0 }}
            className="rounded-full text-gray-400 px-4 duration-200"
          >
            <img src="/icons/sent.svg" alt="sent" className="w-10 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
