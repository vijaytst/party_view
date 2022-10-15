import React, { useContext } from "react";
import UserScheduleCard from "./UserScheduleCard";
import axios from "../../services/axios";
import { notification } from "antd";
import { useRouter } from "next/router";
import { userContext } from "../../pages/_app";
import { socket } from "../../services/socket";

const UserSchedule = ({   setUserSchedule,
    userSchedule}) => {
  const { userInfo } = useContext(userContext);
  const router = useRouter();
  const joinParty = (id, setLoading,title) => {
    setLoading(true);
    socket.emit(
      "join_party",
      { partyId: id, userId: userInfo.data._id },
      (res) => {
        if (res.error) {
          notification.error({ message: res.error });
        } else {
          console.log("operation failed");

          console.log(res.error);

          notification.success({ message: "You joined party" });
          router.push(`/chat/${id}/${title.replaceAll(" ", "_")}`);
          setLoading(false);
        }
      }
    );
  };

  return (
    <section style={{ backgroundColor: "#040308" }}>
      <div className="container mx-auto px-5 py-10">
        <h3 className="text-xl text-gray-200">My Scheduled parties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {userSchedule.length > 0 ? (
            userSchedule.map((party, i) => (
              <UserScheduleCard
                joinParty={joinParty}
             
                key={i}
                {...party}
              />
            ))
          ) : (
            <div className={"pb-24 text-gray-800 text-lg"}>
              <h6>There is currently no schedule to display</h6>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserSchedule;
