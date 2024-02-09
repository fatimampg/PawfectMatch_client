import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ResultsDogsList from "../../components/dog-adoption/ResultsDogsList";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";

const ManageDogs = () => {
  const [filteredDogsArray, setFilteredDogsArray] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  //const token = currentUser?.mail; //is this the user email?
  //let userType = currentUser?.usertype; //comes from the local storage

  //GET INFO OF THAT DOG FROM THE DB, BASED ON THE dogId:
  const getDogsList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/dogs`,
        {
          withCredentials: true,
        },
      );

      const fetchedDogsList = await response.data;
      console.log("List of dogs added by this association", fetchedDogsList);
      setFilteredDogsArray(fetchedDogsList);
    } catch (error) {
      console.log(error);
      console.log("Error fetching dog information");
    }
  };

  useEffect(() => {
    getDogsList();
  }, []);

  return (
    <div className="">
      <h1 className="text-darkest font-customFont flex justify-center p-[2.38rem] text-[1.25rem] font-semibold">
        LIST OF DOGS ADDED
      </h1>
      <button
        className="custom-button-over-white-bg ml-[9rem] h-[3.0rem] w-[11.0rem]"
        type="button"
        onClick={() => navigate("/adddog")}
      >
        ADD DOG
      </button>
      <div className="flex flex-wrap">
        <div className="two-columns-right ml-[6.0rem] mr-[0rem] mt-[2rem] w-full pl-0 lg:w-1/2 lg:flex-grow">
          <ResultsDogsList filteredDogsArray={filteredDogsArray} />
        </div>
      </div>
    </div>
  );
};

export default ManageDogs;
