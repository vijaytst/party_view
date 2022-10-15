import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";
import Link from "next/link";
import { getLocal } from "../../services/LocalPersist";
import axios from "../../services/axios";
import { useEffect, useRef } from "react";
import { notification } from "antd";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UserInfo = ({ userInfo, setUserInfo }) => {
  const props = {
    name: "file",
    action: "https://viewingpartyserver.herokuapp.com/profile-image-upload",
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setUserInfo(info.file.response.data);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="pt-20" style={{ backgroundColor: "#05080e" }}>
      <div className="container pt-20 lg:pt-5 pb-5 mx-auto px-5">
        <h1 className="text-3xl font-semibold py-5 text-gray-200">
          My Profile
        </h1>
      </div>
      <div
        style={{
          background: "rgb(36,0,29)",
          background:
            "linear-gradient(90deg, rgba(36,0,29,1) 0%, rgba(121,31,9,1) 85%)",
        }}
        className="py-5"
      >
        <div className="container mx-auto px-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center">
              <div className={"flex items-center"}>
                <figure className="m-0 p-0">
                  <div className={"rounded-full h-28 w-28"}>
                    <img
                      src={'/defaultImage.png'}
                      className="rounded-full object-cover h-28 w-28"
                      alt=""
                    />
                  </div>
                </figure>
                <Upload {...props}>
                  <Button className={'shadow-none rounded-full pt-0 -m-5'} icon={<UploadOutlined />}></Button>
                </Upload>
              </div>

              <div className="ml-5 md:ml-10 flex flex-col justify-around">
                <h4 className="text-xl uppercase font-semibold">{userInfo.userName}</h4>
                <h6 className="text-lg lowercase">{userInfo.email}</h6>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-5 lg:mt-0 sm:items-center justify-between">
              <div
                style={{ flexBasis: "40rem" }}
                className="hidden sm:block lg:hidden px-5"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
