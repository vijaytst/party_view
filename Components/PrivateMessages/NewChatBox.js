import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "../../services/axios";
import { notification } from "antd";
import { debounce } from "lodash";

const NewChatBox = ({ users, setUsers, setOpen, searchParam, setSearchParam }) => {
  const [selected, setSelected] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (selected !== "") {
      setSubmitting(true);
      axios
        .post(
          `link/${users[selected]?._id}/message`,
          {},
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log("res-________", res)
          router.push(`/messages/${res.data.data?.link?._id}`)
          setTimeout(() => setOpen(false), 2000)
        })
        .catch((err) => {
          setSubmitting(false);
          notification.error({
            message: err?.response?.data?.message || err.message,
          });
          console.log(err?.response?.data?.message || err.message);
        });
    }
  };

  const handleSearchUser = async (e) => {
    setSearchParam(e.target.value)
    const res = await axios.get(
      `/user/search?search=${e.target.value}&limit=10&page=1`
    );
    setUsers(res.data?.data || []);
  };

  return (
    <>
      <div className="fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-50 z-10 flex flex-col justify-center">
        <div className="h-96 relative flex flex-col max-w-xl w-full bg-black mx-auto rounded-xl shadow-md">
          {isSubmitting && (
            <div className="absolute inset-0 bg-white bg-opacity-40 grid place-content-center rounded-xl">
              <i className="fa-spin fa-spinner fa text-base text-gray-800"></i>
            </div>
          )}
          <div className="flex items-center justify-between py-4 px-5">
            <div className="flex items-center">
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-gray-900 duration-200 mr-3"
              >
                <i className="fa fa-times text-gray-300"></i>
              </button>
              <h4 className="text-gray-200 text-lg font-semibold">
                New Message
              </h4>
            </div>
            <button
              onClick={handleNext}
              style={{ opacity: selected !== "" ? 1 : 0.6 }}
              className="bg-primary rounded-full px-3 font-semibold py-1"
            >
              Next
            </button>
          </div>
          <div className="border-b border-gray-700 flex items-center pb-2 mb-0.5">
            <div className="px-5">
              <i className="fa fa-search text-blue-400 text-sm"></i>
            </div>
            <input
              type="text"
              placeholder="Search People"
              onChange={debounce(handleSearchUser, 1000)}
              className="flex-1 text-gray-300 text-base block bg-transparent focus:outline-none outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {users?.map((user, index) => (
              <div
                onClick={() =>
                  setSelected((prev) => (prev === index ? "" : index))
                }
                key={user?._id}
                className="flex items-center px-5 hover:bg-gray-900 duration-200 py-3 cursor-pointer"
              >
                <div className="flex-1 flex items-center">
                  <figure className="m-0 p-0 w-10 h-10">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={
                        user?.profileImage === "default.png"
                          ? "/defaultImage.png"
                          : user?.profileImage
                      }
                      alt={user?.userName}
                    />
                  </figure>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-300">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <h4 className="text-gray-500">@{user?.userName}</h4>
                  </div>
                </div>
                {selected === index && (
                  <i className="fa fa-check text-blue-400"></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChatBox;
