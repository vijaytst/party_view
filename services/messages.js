import axios from "./axios";

export const getSideChats = () => {
  return axios.get("/private/messages", {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
};
