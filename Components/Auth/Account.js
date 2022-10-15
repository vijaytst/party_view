import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Account = ({ current, setCurrent, setShowAuthForm }) => {
  return (
    <div className="bg-black bg-opacity-70 overflow-y-auto py-50 inset-0 flex flex-col justify-center fixed w-full h-screen z-40">
      <div
        className="max-w-sm w-full overflow-y-auto relative mx-auto z-50"
        style={{
          background: "rgba(3, 9, 54, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-primary text-xl text-center font-semibold py-4">
          ViewingParty Account
        </h2>
        <button
          onClick={() => setShowAuthForm(false)}
          className="outline-none font-semibold border-gray-300 text-sm place-content-center hover:border-primary absolute right-0 top-0 text-gray-300 hover:text-primary duration-200 block border w-8 h-8 rounded-full mr-auto"
        >
          X
        </button>
        <div className="flex border-b border-primary">
          <button
            style={{ outline: 0 }}
            onClick={() => setCurrent(1)}
            className={`flex-1 py-3 duration-200 text-base ${
              current === 1
                ? " hover:bg-gray-800  text-primary font-semibold bg-gray-700"
                : "hover:bg-gray-800 text-gray-400 hover:text-gray-50"
            }`}
          >
            Create Account
          </button>
          <button
            style={{ outline: 0 }}
            onClick={() => setCurrent(2)}
            className={`flex-1 py-3 duration-200 text-base ${
              current === 2
                ? " hover:bg-gray-800  text-primary font-semibold bg-gray-700"
                : "hover:bg-gray-800 text-gray-400 hover:text-gray-50"
            }`}
          >
            Login
          </button>
        </div>
        {current === 1 && <Signup setHowForm={setShowAuthForm}/>}
        {current === 2 && <Login setHowForm={setShowAuthForm} />}
      </div>
    </div>
  );
};

export default Account;
