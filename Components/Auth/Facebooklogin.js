import React from "react";
import FacebookLogin from "react-facebook-login";
import axios, { setAuthToken } from "../../services/axios";
import { notification } from "antd";

const FacebookComp = ({setHowForm,router,setSubmitting,Login}) => {
  const responseFacebook = (response) => {

    const data = {
      userName: response.name,
      email: response.email,
      profileImage: response.picture.data.url,
    };

const requestUrl = Login?("/social-login"):("/social-registration");



    axios
    .post(`${requestUrl}`, data)
    .then((res) => {
      setSubmitting(false);
      notification.success({
        description: "Successfully logged in",
        duration: 5000,
      });

      setHowForm(!setHowForm);
      setAuthToken(res?.data?.data?.accessToken);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      router.push("/profile");
    })
    .catch((err) => {
      setSubmitting(false);
      notification.error({
        message: "User Error!",
        description:"Network error please try again",
        duration: 5000,
      });
    });



  };

  const failure = (data) => {

  };
  return (
    <FacebookLogin
      appId="1581473205528654"
      onFailure={failure}
      // autoLoad={true}
      fields="name,email,picture"
      scope="public_profile,email"
      callback={responseFacebook}
      style={{ background: "red" }}

      textButton = {Login?"Sign In with Facebook":"Sign Up with Facebook" }
    />
  );
};

export default FacebookComp;
