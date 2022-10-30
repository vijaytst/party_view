import React from "react";
import { socket } from "../../services/socket";

const ChatForm = ({ value, setValue, userInfo, partyId, partyInfo }) => {
  const handleChange = (e) => {
    setValue({
      ...value,
      message: e.target.value,
    });
  };

  const isFormValid = () => !!value.message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      socket.emit(
        "message_party",
        {
          ...value,
          userId: userInfo.data._id || "611cf0bff8a283001decbd73",
          partyId: partyId,
        },
        (data) => {
          setValue({
            message: "",
          });
        }
      );
    }

    return () => {
      console.log("from error block");
      socket.disconnect();
      socket.close();
    };
  };

  return (
    <div className="p-3" style={{ backgroundColor: "#03101f" }}>
      <form onSubmit={handleSubmit} className="flex items-center h-10">
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
            onChange={handleChange}
            value={value.message}
            placeholder="Comment on the movie here...."
            className=" text-base flex-1 shadow outline-none text-gray-200 px-5 py-2"
          />
          {/* {true ? ( */}
          <button
            type="submit"
            style={{ outline: 0 }}
            className="rounded-full text-gray-400 px-4 duration-200"
          >
            <img src="/icons/sent.svg" alt="sent" className="w-10 h-6" />
          </button>
          {/* // ) : (
          //   <button
          //     style={{ outline: 0 }}
          //     type="button"
          //     className="text-2xl text-gray-400 px-4 "
          //   >
          //     <i className="far fa-image"></i>
          //   </button>
          // )} */}
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
