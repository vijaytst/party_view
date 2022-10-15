import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import axios, { setAuthToken, DeleteAuthToken } from "../../services/axios";
import Navbar from "../../Components/Layouts/Navbar";
import Sidebar from "../../Components/PrivateMessages/Sidebar";
import { getSideChats } from "../../services/messages";
import NewChatBox from "../../Components/PrivateMessages/NewChatBox";

const chat = ({ userInfo }) => {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [newChatUsers, setNewChatUsers] = useState([]);
  const [newChatOpen, setNewChatOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    if (!userInfo.loading && !userInfo.isAuthenticated) {
      router.push("/");
      notification.error({
        message: "Please you need to login",
      });
    }
  }, [userInfo]);

  console.log(userInfo)
  useEffect(() => {
    if (!userInfo.loading && userInfo.isAuthenticated) {
      getSideChats().then((res) =>
        setChats(
          res.data?.data?.messages.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        )
      );
    }
  }, [userInfo]);

  useEffect(() => {
    axios
      .get("/user/search?limit=10&page=1")
      .then((res) => setNewChatUsers(res.data?.data || []));
  }, []);

  return userInfo.loading ? (
    <div className="h-screen grid place-content-center bg-primary-theme">
      <i className="fa fa-spin fa-spinner text-xl text-primary"></i>
    </div>
  ) : (
    <div className="h-screen w-full bg-primary-theme">
      {newChatOpen && (
        <NewChatBox
          setUsers={setNewChatUsers}
          setOpen={setNewChatOpen}
          users={newChatUsers}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        />
      )}
      <Navbar  />
      <div className="container mx-auto h-full px-5">
        <div className="h-full flex overflow-y-auto border-r border-l border-gray-800">
          <Sidebar
            className="flex-1 md:flex-none"
            setNewChatOpen={setNewChatOpen}
            chats={chats}
          />
          <div className="flex-1 overflow-y-auto hidden md:block">
            <div className="grid py-10 place-content-center h-full overflow-y-auto">
              <div className="max-w-sm">
                <figure className="m-0 p-0 grid place-content-center">
                  <img
                    className="w-56 h-h6 object-contain"
                    src="/icons/chat.svg"
                  />
                </figure>
                <h3 className="text-3xl mt-14 leading-9 font-bold text-gray-100">
                  You don’t have a message selected
                </h3>
                <p className="text-gray-300 mt-3 leading-5">
                  Choose one from your existing messages, or start a new one.
                </p>
                <button
                  onClick={() => setNewChatOpen(true)}
                  className="bg-primary hover:bg-opacity-75 duration-200 block w-full max-w-max px-10 py-2 mt-10 rounded-full font-semibold text-gray-800 text-base"
                >
                  New message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chat;
