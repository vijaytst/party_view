import React, { useContext, useEffect, useState } from "react";
import YoutubePartyCard from "./YoutubePartiesCard";
import { userContext } from "../../pages/_app";
import { socket } from "../../services/socket";
import { notification } from "antd";
import axios from "../../services/axios";
import { useRouter } from "next/router";
import Axios from "axios";

const MyYoutubeParties = ({ sportsParties, setSportsParties }) => {
  const { userInfo } = useContext(userContext);
  const [youtubeParties, setYoutubeParties] = useState();
  const router = useRouter();

  let reverseRow = sportsParties;

  useEffect(() => {
    getUserYoutubeParties();
  }, []);



  const emitStart = (party) => {
    socket.emit(
      "startYoutubeParty",
      {
        party: party
      },
      (res) => {
        console.log(res);
        if (!res.error)
          return
      }
    );
  };

  const emitEnd = (party) => {
    console.log('from end')
    socket.emit(
      "endYoutubeParty",
      {
        party: party
      },
      (res) => {
        console.log(res);
        if (!res.error)
          return
      }
    );
  };


  const joinParty = (id, setLoading, title) => {
    setLoading(true);
    axios.defaults.headers["x-access-token"] =
      localStorage.getItem("accessToken");
    axios
      .post(`/join-sport-party`, { partyId: id, userId: userInfo.data._id })
      .then(async (response) => {
        await getUserYoutubeParties();
        setLoading(false);
        notification.success({
          message: "Successfully joined party",
          duration: 1,
        });
        router.push(`/youtube/${id}/${title.replaceAll(" ", "_")}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        notification.success({
          message: "Successfully joined party",
          duration: 1,
        });
      });
  };

  const startParty = (party, setLoading) => {
    setLoading(true);
    const id  =  party?._id
    const title = party?.partyTitle
    axios.defaults.headers["x-access-token"] =
      localStorage.getItem("accessToken");
    axios
      .get(`/start-youtube-party`, {
        params: { id },
      })
      .then(async (response) => {
        await getUserYoutubeParties();
        notification.success({ message: "party started", duration: 1 });
        setLoading(false);
        emitStart(party)
        router.push(`/youtube/${id}/${title.replaceAll(" ", "_")}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        notification.success({ message: "operation failed", duration: 1 });
      });
  };

  const deleteParty = (id, setLoading,) => {
    setLoading(true);
    axios.defaults.headers["x-access-token"] =
      localStorage.getItem("accessToken");
    axios
      .get(`/delete-user-youtube-party`, {
        params: { id },
      })
      .then(async (response) => {
        notification.success({ message: "party removed", duration: 1 });
        setLoading(false)
        getUserYoutubeParties()
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        notification.success({ message: "operation failed", duration: 1 });
      });
  };

  const getUserYoutubeParties = () => {
    axios
      .get("/get-user-youtube-party", {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setYoutubeParties(res.data.data);
      })
      .catch(() => {
        notification.warn({
          message: "Party not found",
          description: "Unable to get user party",
          duration: 5000,
        });
      });
  };

  const endParty = (party, setEndLoading) => {
    setEndLoading(true);
    const id  = party?._id
    axios
      .get(`/stop-youtube-party`, {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
        params: { id },
      })
      .then(async (response) => {
       
        setEndLoading(false);
        emitEnd(party)
        await getUserYoutubeParties();
        notification.success({ message: "Party stopped", duration: 1 });
      })

      .catch((error) => {
        console.log(error);
        setEndLoading(false);
        notification.success({ message: "operation failed", duration: 1 });
      });
  };



  return (
    <section style={{ backgroundColor: "#040308" }}>
      <div className="container mx-auto py-10">
        <h3 className="text-xl text-gray-200">My Youtube Parties</h3>
        <div className="flex w-full flex-wrap">
          {youtubeParties?.length > 0 ? (
            youtubeParties
              ?.slice(0)
              .map((party, i) => (
                <YoutubePartyCard
                  joinParty={joinParty}
                  endParty={endParty}
                  startParty={startParty}
                  deleteParty={deleteParty}
                  party={party}
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

export default MyYoutubeParties;
