import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [userData, setuserdata] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setuserdata((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/login`,
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      console.log(user);
      if (user) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="login-container flex flex-col items-center justify-center pt-[14.00rem]">
      {error && <p className="form__error-message">{error} </p>}
      <form className="flex flex-col" onSubmit={registerUser}>
        <label className="text-darkest pb-[1rem] text-start font-[1.125rem]">
          EMAIL:
          <br />
          <input
            type="text"
            className="user-data-input w-[22.31rem]"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
        </label>
        <label className="text-darkest text-start">
          PASSWORD:
          <br />
          <input
            type="password"
            className="user-data-input w-[22.31rem]"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
        </label>
        <div className="mb-[2rem] mt-[0.5rem] self-center">
          <button className="custom-button-over-white-bg h-[3.0rem] w-[6.5rem]">
            LOG IN
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center pt-[0rem]">
        <h3 className="text-darkest pr-[2rem]"> New User? </h3>
        <button
          className="custom-button-over-white-bg h-[3.0rem] w-[6.5rem]"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
