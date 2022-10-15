import React, { useState, useEffect, useContext } from "react";
import axios from "../../services/axios";
import IndexScheduleCard from "./IndexScheduleCard";
import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { userContext } from "../../pages/_app";
import { socket } from "../../services/socket";

const PublicWatchParties = ({ movies }) => {
  const [createdParties, setCreatedParties] = useState(movies);

  const { userInfo } = useContext(userContext);
  const router = useRouter();

  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

  const joinParty = (id, setLoading, title) => {
    setLoading(true);
    socket.emit(
      "join_party",
      { partyId: id, userId: userInfo.data._id },
      (res) => {
        if (res.error) {
          notification.error({ message: "Sign in to join a party" });
        } else {
          notification.success({ message: "You joined party" });
          router.push(`/chat?partyId=${id}/${title.replaceAll(" ", "_")}`);
          setLoading(false);
        }
      }
    );
  };

  return (
    <section style={{ backgroundColor: "#040308" }}>
      <div className="container mx-auto px-5 py-10">
        <h3 className="text-xl text-gray-200">Public Watch Parties</h3>

        {createdParties ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {createdParties
              .filter((i, index) => index < 3)
              .map((party, idx) => (
                <IndexScheduleCard
                  key={idx}
                  joinParty={joinParty}
                  party={party}
                />
              ))}
          </div>
        ) : (
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <Spin indicator={antIcon} size="large" />
          </h2>
        )}
      </div>
      <div className="flex m-auto mb-5 " style={{ backgroundColor: "inherit" }}>
        <a
          style={{ marginBottom: "20px" }}
          href="/discover"
          className="border border-primary rounded-3xl mx-auto text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white"
        >
          View More
        </a>
      </div>
    </section>
  );
};

export default PublicWatchParties;
