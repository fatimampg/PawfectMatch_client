import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import projectLogo from "../../assets/images/projectLogo.png";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.mail;
  let userType = currentUser?.usertype;

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    console.log("isLoggedin", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/logout`, {
      withCredentials: true,
    });
    setCurrentUser(null);
    navigate("/login");
    console.log("User is logged out", currentUser);
  };

  return (
    <div className="bg-darkest">
      <nav className="mx-auto flex w-[97%] items-center justify-between shadow-inner">
        <div className="">
          <img className=" w-[14rem]" src={projectLogo} alt="project-logo" />
        </div>

        <div
          className={`nav-links bg-darkest absolute left-0 ${
            isMenuOpen ? "top-[4.3rem]" : "top-[-100%]"
          } item z-10 flex min-h-[14rem] w-full items-center px-7 md:static md:min-h-[4.5rem] md:w-auto`}
        >
          {isLoggedIn && userType === "association" ? (
            <div>
              <ul className="font-customFont ml-[1rem] flex flex-col gap-6 text-center text-[1.0rem] font-semibold text-white md:flex-row md:items-center md:gap-[7vw] ">
                <li>
                  <NavLink to="/">HOME</NavLink>{" "}
                </li>
                <li>
                  <NavLink to="/managedogs">MANAGE DOGS FOR ADOPTION</NavLink>{" "}
                </li>
                <li>
                  <NavLink to="/dogwalking">VOLUNTEERS</NavLink>{" "}
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="font-customFont ml-[1rem] flex flex-col gap-6 text-center text-[1.0rem] font-semibold text-white md:flex-row md:items-center md:gap-[7vw] ">
                <li>
                  <NavLink to="/">HOME</NavLink>{" "}
                </li>
                <li>
                  <NavLink to="/dogsadoption">DOGS FOR ADOPTION</NavLink>{" "}
                </li>
                <li>
                  <NavLink to="/dogwalking">DOG WALKING</NavLink>{" "}
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="font-customFont flex w-[15.0rem] justify-end text-[1.0rem] font-semibold text-white lg:w-auto">
          {isLoggedIn ? (
            <div className="">
              <ul className="mb-3 mt-3 flex items-center gap-4">
                <li>
                  <NavLink to="/profile">My profile</NavLink>
                </li>
                <li>
                  <button
                    className="bg-medium hover:text-darkest rounded-full px-5 py-2 hover:bg-white"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
                <li className="cursor-pointer text-2xl md:hidden">
                  <ion-icon
                    onClick={() => {
                      setMenuOpen((prev) => !prev);
                      console.log("Toggle menu clicked");
                    }}
                    name="menu-outline"
                  ></ion-icon>
                </li>
              </ul>
            </div>
          ) : (
            <div className=" ">
              <ul className="flex items-center gap-4">
                <li>
                  <button
                    className="bg-medium hover:text-darkest rounded-full px-5 py-2 text-white hover:bg-white"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                </li>
                <li className="cursor-pointer text-2xl md:hidden">
                  <ion-icon
                    onClick={() => {
                      setMenuOpen((prev) => !prev);
                      console.log("Toggle menu clicked");
                    }}
                    name="menu-outline"
                  ></ion-icon>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
