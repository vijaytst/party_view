import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatForm from "../../Components/PrivateMessages/ChatForm";
import Sidebar from "../../Components/PrivateMessages/Sidebar";
import { socket } from "../../services/socket";
import axios from "../../services/axios";
import Navbar from "../../Components/Layouts/Navbar";
import { getSideChats } from "../../services/messages";
import ChatMessage from "../../Components/PrivateMessages/ChatMessage";
import NewChatBox from "../../Components/PrivateMessages/NewChatBox";

const chat = ({ userInfo, setUserInfo }) => {
  const [messages, setMessages] = useState([]);
  const [chatMeta, setChatMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const router = useRouter();
  const { chatId } = router.query;
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
    if (!userInfo.loading && userInfo.isAuthenticated) {
      socket.on("private_message", (data) =>
        setMessages((prev) => [...prev, data?.message])
      );

      return () => {
        socket.disconnect();
        socket.close();
      };
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo.loading && userInfo.isAuthenticated) {
      socket.emit("join_private_message", { room: chatId });
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo.loading && userInfo.isAuthenticated && chatId) {
      setLoading(true);
      axios
        .get(`/private/${chatId}/message`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log("ress____", response);
          setMessages(response.data?.data?.messages?.messages || []);
          setLoading(false);
          setChatMeta({
            to: response.data?.data?.messages?.to,
            user: response.data?.data?.messages?.user,
          });
        })
        .catch((err) => console.log("error", err.response));
    }
  }, [userInfo, router.query]);

  useEffect(() => {
    axios
      .get("/user/search?limit=10&page=1")
      .then((res) => setNewChatUsers(res.data?.data || []));
  }, [router.query]);

  return userInfo.loading ? (
    <div className="h-screen grid place-content-center">
      <i className="fa fa-spin fa-spinner text-xl text-primary"></i>
    </div>
  ) : (
    <div className="h-screen w-full" style={{ background: "#030816d8" }}>
      <Navbar /> 
      <div className="container mx-auto h-full sm:px-5">
        <div className="h-full flex overflow-y-auto border-r border-l border-gray-800">
          <Sidebar
            className="hidden md:flex"
            setNewChatOpen={setNewChatOpen}
            chats={chats}
          />
          <div className="flex-1 overflow-y-auto">
            {newChatOpen && (
              <NewChatBox
                setUsers={setNewChatUsers}
                setOpen={setNewChatOpen}
                users={newChatUsers}
                searchParam={searchParam}
                setSearchParam={setSearchParam}
              />
            )}
            <div className="flex flex-col h-full overflow-y-auto">
              {loading ? (
                <div className="h-screen grid place-content-center">
                  <i className="fa fa-spin fa-spinner text-xl text-primary"></i>
                </div>
              ) : (
                <div className="flex-1 overflow-y-scroll relative flex flex-col p-5">
                  <ScrollToBottom className="react-scroll-to-bottom--css-zwklu-1n7m0yu">
                    {messages?.map((message, i) =>
                      message.isAlert ? (
                        <MessageAlert
                          key={i}
                          userInfo={userInfo}
                          message={message}
                        />
                      ) : (
                        <ChatMessage
                          key={i}
                          userInfo={userInfo}
                          chatMeta={chatMeta}
                          message={message}
                        />
                      )
                    )}
                  </ScrollToBottom>
                </div>
              )}
              <ChatForm
                chatId={chatId}
                value={value}
                userInfo={userInfo}
                setValue={setValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chat;
