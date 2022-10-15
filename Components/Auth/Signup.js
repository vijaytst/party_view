import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios, { setAuthToken } from "../../services/axios";
import InputField from "./InputField";
import { notification, Spin } from "antd";

import { useRouter } from "next/router";
// import FacebookProvider, { Login } from "react-facebook-next";

import GoogleLogin from "react-google-login";
import { localPersist } from "../../services/LocalPersist";
import { background } from "@chakra-ui/react";
import FacebookComp from "./Facebooklogin";




const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Email is Invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
  userName: Yup.string().required("userName is required"),
  location: Yup.string().required("Location is required"),
  confirmPassword: Yup.string()
    .required("Please confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = ({ setHowForm }) => {
  const [isSubmmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleResponse = (data) => {

  };

  const handleError = (error) => {
    this.setState({ error });
  };

  const responseGoogle = (response) => {
    const data = {
      userName: response.profileObj.name,
      email: response.profileObj.email,
      profileImage: response.profileObj.imageUrl,
    };

    axios
      .post("/social-registration", data)
      .then((res) => {
        setSubmitting(false);
        notification.success({
          messgae: "Account Created!",
          description:
            "ViewingPartyAccount created successfully",
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
          description:
            err?.response?.data?.message?.error?.message || err?.message,
          duration: 5000,
        });
      });

 
  };

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        userName: "",
      }}
      onSubmit={async (values) => {
        setSubmitting(true);
        notification.destroy();
        axios
          .post("/user-registration", values)
          .then((res) => {
            setSubmitting(false);
            notification.success({
              messgae: "Account Created!",
              description:
                "You have successfully created your account, check out your profile",
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
              description:
                err?.response?.data?.message?.error?.message || err?.message,
              duration: 5000,
            });
          });
      }}
    >
      <Form>
        <div className="px-5 border-b py-10 border-primary">
          <InputField name="userName" id="userName" noMargin label="Username" />
          <InputField name="email" type="email" id="email" label="Email" />
          <InputField name="location" id="location" label="Location" />
          <InputField
            name="password"
            type="password"
            id="password"
            label="Password"
          />
          <InputField
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
          />
          <div className="mt-8">
            <button className="w-full py-2 px-5 flex items-center justify-center outline-none bg-primary text-gray-800 duration-200 hover:bg-opacity-75 font-bold rounded-full">
              {isSubmmitting && (
                <i className="fa fa-spin text-gray-900 fa-spinner mr-2 font-bold text-lg" />
              )}
              Create Account
            </button>
          </div>
        </div>
        <div className="mt-5 px-5 py-5 pb-10">
          <GoogleLogin
            clientId="165606613965-tqs2kpvpf4feni7i6mugs1naa40c59r4.apps.googleusercontent.com"
            buttonText="Signup with Google"
            render={(renderProps) => (
              <button
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  background: "#fff",
                  borderRadius: "7px",
                  alignItems: "center",
                  fontWeight: "bolder",
                  justifyContent: "center",
                  color: "blue",
                  height: "50px",
                  width: "100%",
                  display: "flex",
                }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Signup With Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookComp setHowForm={setHowForm} router={router} setSubmitting={setSubmitting} Login={false} />
        </div>
      </Form>
    </Formik>
  );
};

export default Signup;
