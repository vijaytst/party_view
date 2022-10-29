import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FormAuthContext, userContext } from "../../pages/_app";
import { useRouter } from "next/router";
import { DeleteAuthToken } from "../../services/axios";

const Navbar = ({ notFixed }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(true);
  const [hasExtension, setHasExtension] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const context = useContext(FormAuthContext);
  const { userInfo } = useContext(userContext);
  const router = useRouter();

  const LogOut = () => {
    DeleteAuthToken();
    localStorage.clear();
    localStorage.setItem("accessToken", null);
    router.push("/");
  };

  const userlogout = () => {
    DeleteAuthToken();
    localStorage.clear();
    DeleteAuthToken();
    localStorage.setItem("accessToken", null);

    router.replace("/");
  };

  useEffect(() => {
    const userInfo = window.localStorage.getItem("accessToken");
    if (!userInfo) {
      setToggleLogin(false);
    } else {
      setToggleLogin(true);
    }
  }, []);

  const getExtension = () => {
    window.open(
      "https://chrome.google.com/webstore/detail/viewing-party-internet-wa/pffaegjjkopdniooioigjfjkncgfiokl",
      "_blank",
      "location=yes,height=550,width=700,scrollbars=yes,status=yes,top=100 left=50%"
    );
  };
  setInterval(() => {
    try {
      chrome.runtime.sendMessage(
        "pffaegjjkopdniooioigjfjkncgfiokl",
        { message: "version" },
        function (reply) {
          if (!window.chrome.runtime.lastError) {
            if (reply) {
              if (reply.version) {
                setHasExtension(true);
              }
            } else {
              setHasExtension(false);
            }
          } else {
            setHasExtension(false);
          }
        }
      );
    } catch (error) {
      setHasExtension(false);
    }
  }, 5000);

  return (
    <nav
      style={{ backgroundColor: "#030816d8", backdropFilter: "blur(.6rem)" }}
      className={`${!notFixed && "fixed"} left-0 right-0 w-full z-30`}
    >
      <div className="container relative mx-auto py-2 px-2 sm:px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              style={{ outline: 0 }}
              className="mr-3 group z-50"
            >
              <div className="w-6 h-0.5 rounded-lg bg-gray-700 group-hover:bg-gray-300 duration-200"></div>
              <div className="w-6 h-0.5 mt-1 rounded-lg bg-gray-700 group-hover:bg-gray-300 duration-200"></div>
              <div className="w-6 h-0.5 mt-1 rounded-lg bg-gray-700 group-hover:bg-gray-300 duration-200"></div>
            </button>
            {isDropdownOpen && (
              <div
                className="inset-0 h-screen fixed z-50"
                onClick={() => setDropdownOpen(false)}
              ></div>
            )}
            <div
              style={{
                backdropFilter: "blur(1rem)",
                maxWidth: "10rem",
                pointerEvents: isDropdownOpen ? "all" : "none",
              }}
              className={`bg-gray-900 top-12 sm:top-14 absolute py-5 z-50 duration-200 shadow-lg ${
                isDropdownOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <ul>
                {toggleLogin ? (
                  <li>
                    <Link href="/profile">
                      <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                        Profile
                      </a>
                    </Link>
                  </li>
                ) : (
                  " "
                )}

                {userInfo ? (
                  <li>
                    <Link href="/messages">
                      <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                        Messages
                      </a>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <Link href="/about">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      About
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/discover">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Discover
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/sports">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Sports
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/youtube">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Youtube
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/schedule">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Schedules
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/download">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Download
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Contact Us
                    </a>
                  </Link>
                </li> */}

                <li>
                  <Link href="/getting-started">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      Getting started
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      FAQ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                      privacy policy
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/" passHref>
              <a>
                <h4 className="text-primary text-xl sm:text-2xl font-semibold">
                  ViewingParty
                </h4>
              </a>
            </Link>
          </div>
          <div className="hidden lg:block" style={{ flexBasis: "30rem" }}>
            <form className="flex h-10">
              <input
                type="text"
                className="text-base flex-1 bg-gray-900 shadow-lg outline-none text-gray-200 px-5 py-2"
              />
              <button
                type="submit"
                style={{ outline: 0 }}
                className="bg-gray-900 h-full px-5 flex items-center justify-center border-l-2 border-gray-800 shadow-lg py-2"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/search.svg"
                  className="w-2 h-2"
                  alt="search"
                />
              </button>
            </form>
          </div>
          <div
            className="flex"
            style={{ marginLeft: "12px", marginRight: "12px" }}
          >
            {!hasExtension && (
              <button
                onClick={() => getExtension(2)}
                className="mr-5 text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white"
              >
                Get Extension
              </button>
            )}
            {!userInfo.loading &&
              (toggleLogin ? (
                <>
                  <div
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    className="flex group cursor-pointer items-center"
                  >
                    <figure className="m-0 p-0">
                      <img
                        src={"/defaultImage.png"}
                        className="w-8 h-8 rounded-full"
                        alt={userInfo.data?.userName}
                      />
                    </figure>
                    <h4 className="text-base ml-3">
                      {userInfo.data?.userName}
                    </h4>
                    <i
                      className={`fa fa-sort-down ml-1 text-gray-300 duration-200 transform ${
                        userDropdownOpen
                          ? "-rotate-180 translate-y-1"
                          : "rotate-0 translate-y-0"
                      }`}
                    ></i>
                  </div>
                  {userDropdownOpen && (
                    <div
                      className="inset-0 h-screen fixed z-50"
                      onClick={() => setUserDropdownOpen(false)}
                    ></div>
                  )}
                  <div
                    style={{
                      backdropFilter: "blur(1rem)",
                      maxWidth: "10rem",
                      width: "100%",
                      pointerEvents: userDropdownOpen ? "all" : "none",
                    }}
                    className={`bg-gray-900 absolute top-28 lg:top-20 py-5 z-50 duration-200 shadow-lg ${
                      userDropdownOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <ul>
                      <li onClick={() => setUserDropdownOpen(false)}>
                        <Link href="/profile">
                          <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                            <i className="fa fa-user mr-3"></i>
                            View Profile
                          </a>
                        </Link>
                      </li>
                      <li onClick={() => setUserDropdownOpen(false)}>
                        <Link href="/party/new">
                          <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                            <i className="fa fa-tv mr-3"></i>
                            Start a Party
                          </a>
                        </Link>
                      </li>
                      <li onClick={LogOut}>
                        <Link href="">
                          <a className="text-gray-200 py-2 block px-5 hover:bg-gray-800 duration-200">
                            <i className="fa fa-sign-out-alt mr-3"></i>
                            Logout
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => context.openForm(2)}
                    className="mr-5 text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => context.openForm(1)}
                    className="mr-5 text-sm sm:border sm:bg-primary hover:bg-transparent hover:border-primary hover:border sm:px-5 duration-200 font-semibold sm:py-1 rounded-full text-gray-300 sm:text-gray-900 hover:text-white"
                  >
                    Sign Up
                  </button>
                </>
              ))}
          </div>
        </div>
        <div className="hidden lg:visible mt-4" style={{ flexBasis: "30rem" }}>
          <form className="flex">
            <input
              type="text"
              className="text-sm flex-1 bg-gray-900 shadow-lg outline-none text-gray-200 px-5 py-2"
            />
            <button
              type="submit"
              style={{ outline: 0 }}
              className="bg-gray-900 h-full px-5 block text-white text-base border-l-2 border-gray-800 shadow-lg py-2"
            >
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
