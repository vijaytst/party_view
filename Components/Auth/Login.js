import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios, { setAuthToken } from "../../services/axios";
import InputField from "./InputField";
import { notification } from "antd";
import { localPersist } from "../../services/LocalPersist";
import GoogleLogin from "react-google-login";
import FacebookComp from "./Facebooklogin";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is Invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ setHowForm }) => {
  const [isSubmmitting, setSubmitting] = useState(false);

  const router = useRouter();

  const responseGoogle = (response) => {


    setSubmitting(true)


    const data = {
      userName: response.profileObj.name,
      email: response.profileObj.email,
      profileImage: response.profileObj.imageUrl,
    };


    axios
      .post("/social-login", data)
      .then((res) => {
        setSubmitting(false);
        notification.success({
          messgae: "Logged in!",
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

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, actions) => {
        setSubmitting(true);
        axios
          .post("/user-login", values)
          .then((res) => {
            setSubmitting(false);
            notification.success({
              message: "Logged In!",
              description:
                "You have successfully logged in, check out your profile",
              duration: 5000,
            });
            setAuthToken(res?.data?.data?.accessToken);
            localStorage.setItem("accessToken", res?.data?.data?.accessToken);
            setHowForm(!setHowForm);

            router.push("/profile");
          })
          .catch((err) => {
            setSubmitting(false);
            notification.error({
              message: "Login Error!",
              description:
                err?.response?.data?.data?.message ||
                err?.response?.data?.message,
              duration: 5000,
            });
            console.log("error", err?.response || err.message);
          });
      }}
    >
      <Form>
        <div className="px-5 border-b py-10 border-primary">
          <InputField
            name="email"
            noMargin
            type="email"
            id="email"
            label="Email"
          />
          <InputField
            name="password"
            type="password"
            id="password"
            label="Password"
          />
          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-5 outline-none bg-primary text-gray-800 duration-200 hover:bg-opacity-75 font-bold rounded-full"
            >
        



              Login
  {isSubmmitting && (
                <i className="fa fa-spin fa-spinner mr-3"></i>
              )}
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
                Login With Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
       
          <FacebookComp setHowForm={setHowForm} router={router} setSubmitting={setSubmitting} Login={true} />
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
