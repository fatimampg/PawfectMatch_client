import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setuserdata] = useState({
    email: "",
    password: "",
    password2: "",
    userType: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeInputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "userType") {
      setuserdata((prevUserData) => ({
        ...prevUserData,
        userType: value,
      }));
      console.log("Form submitted with values:", userData);
    } else {
      setuserdata((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
      console.log("Form submitted with values:", userData);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/signup`,
        userData,
      );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) setError("cant register user at this time ,pls try again");
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };
  return (
    <div className="login-container  flex flex-col items-center justify-center pt-[4rem] ">
      {error && <p className="form__error-message">{error} </p>}
      <form onSubmit={registerUser}>
        <h1 className="text-darkest mb-[3rem] text-center font-bold">
          {" "}
          REGISTER AS:{" "}
        </h1>
        <div className="radioButton text-darkest mb-[2rem] flex space-x-[4rem]">
          <label>
            <input
              type="radio"
              value="regular"
              name="userType"
              className="radio-button mr-[1rem]"
              onChange={changeInputHandler}
            />
            Regular User
          </label>
          <label>
            <input
              type="radio"
              value="volunteer"
              name="userType"
              className="radio-button mr-[1rem]"
              onChange={changeInputHandler}
            />
            Volunteer
          </label>
          <label>
            <input
              type="radio"
              value="association"
              name="userType"
              className="radio-button mr-[1rem]"
              onChange={changeInputHandler}
            />
            Association
          </label>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex w-[22.31rem] flex-col items-start">
            <label htmlFor="email" className="text-darkest pb-[1rem] pt-[1rem]">
              {" "}
              EMAIL:
            </label>
            <input
              type="text"
              name="email"
              className="user-data-input w-[22.31rem]"
              value={userData.email}
              onChange={changeInputHandler}
            />

            <label
              htmlFor="password"
              className="text-darkest pb-[1rem] pt-[1rem]"
            >
              PASSWORD:
            </label>
            <div className="flex flex-col space-y-[1rem]">
              <input
                type="password"
                className="user-data-input w-[22.31rem]"
                value={userData.password}
                name="password"
                onChange={changeInputHandler}
                placeholder="Password"
              />
              <input
                type="password"
                className="user-data-input w-[22.31rem]"
                name="password2"
                value={userData.password2}
                onChange={changeInputHandler}
                placeholder="Confirm password"
              />
            </div>
          </div>
          <div className="mb-[0rem] mt-[0.5rem]">
            <button
              className="custom-button-over-white-bg h-[3.0rem] w-[7.5rem]"
              type="submit"
            >
              REGISTER
            </button>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center pt-[0rem]">
        <h3 className="text-darkest pr-[2rem]"> Already have an account? </h3>
        <button
          className="text-darkest font-bold underline"
          onClick={() => navigate("/login")}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default Register;