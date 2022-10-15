import React, { useContext } from "react";
import WatchPartyCard from "./WatchPartyCard";
import axios from "../../services/axios";
import { notification } from "antd";
import { useRouter } from "next/router";
import { userContext } from "../../pages/_app";
import { socket } from "../../services/socket";

const MyViewParties = ({ scheduleParties, setScheduleParties }) => {
  const { userInfo } = useContext(userContext);
  const router = useRouter();

  const deleteParty = (id) => {
    axios
      .get("/delete-user-party", {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
        params: { id },
      })
      .then((res) => {
        let obj = scheduleParties.find((o) => o._id === id);

        let party = scheduleParties.filter((p) => p._id !== id);

        const getIndex = scheduleParties.findIndex(
          (element) => (element._id = id)
        );
        setScheduleParties(party);
        var index = scheduleParties.findIndex(function (o) {
          return o._id === id;
        });

        if (index !== -1) scheduleParties.splice(index, 1);

        setScheduleParties(party);
        notification.success({
          message: "Party removed",
          description: "Party removed successfully",
          duration: 5000,
        });
      })
      .catch((err) => {
        notification.warn({
          message: "Party not removed",
          description: "Unable to remove party at the moment",
          duration: 5000,
        });
      });
  };

  const joinParty = (id, setLoading) => {
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
          router.push(`/chat?partyId=${id}`);
          setLoading(false);
        }
      }
    );
  };

  return (
    <section style={{ backgroundColor: "#040308" }}>
      <div className="container mx-auto px-5 py-10">
        <h3 className="text-xl text-gray-200">My ViewParties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {scheduleParties.length > 0 ? (
            scheduleParties.map((party, i) => (
              <WatchPartyCard
                joinParty={joinParty}
                deleteParty={deleteParty}
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

export default MyViewParties;
