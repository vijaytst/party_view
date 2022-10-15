import React, { useEffect, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatMessage from "./YoutubeChatMessage";
import MessageAlert from "./MessgaeAlert";

const YoutubeChatMessageList = ({ messages, userInfo }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView();
      const uniqueClass =
        window.document.querySelectorAll(".unique-chat-class");
      uniqueClass[uniqueClass.length - 1].scrollIntoView();
    }
  }, [messages]);

  return (
    <div  
      style={{
        backgroundColor: 'black',
        backdropFilter: 'blur(.6rem)',
        overflow:"hidden",
        // maxHeight:"550px",
        overflowX: "scroll",
        overflowY: "auto"

    }} 


    className="flex-1 overflow-y-scroll relative flex flex-col p-5 bg-black bg-opacity-70" >
          <h3> Live youtube party chat </h3> 
      <ScrollToBottom className="react-scroll-to-bottom--css-zwklu-1n7m0yu">
        {messages.map((message, i) =>
          message.isAlert ? (
            <MessageAlert
              key={i}
              userInfo={userInfo}
              ref={messageRef}
              message={message}
            />
          ) : (
            <ChatMessage
              key={i}
              userInfo={userInfo}
              ref={messageRef}
              message={message}
            />
          )
        )}
      </ScrollToBottom>
    </div>
  );
};

export default YoutubeChatMessageList;
