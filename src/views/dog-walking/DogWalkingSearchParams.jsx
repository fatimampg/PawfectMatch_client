import { useState, useEffect, useContext } from "react";
import { useLocationData } from "../../utils/locationData";
import Location from "../../components/dog-adoption/Location";
import ResultsAssociations from "../../components/dog-walking/ResultsAssociations";
import ResultsVolunteers from "../..//components/dog-walking/ResultsVolunteers";
import dogWalking from "../../assets/images/dogWalking.jpg";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";

const DogWalkingSearchParams = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryIso2, setSelectedCountryIso2] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateIso2, setSelectedStateIso2] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { currentUser } = useContext(UserContext);
  let userType = currentUser?.usertype;

  const [filteredAssociationsArray, setFilteredAssociationsArray] = useState(
    [],
  );
  const [filteredVolunteersArray, setFilteredVolunteersArray] = useState([]);

  // Fetching location data from public API:
  const { countries, states, cities } = useLocationData(
    selectedCountryIso2,
    selectedStateIso2,
  );
  let mail = currentUser?.mail;

  // VOLUNTEER REQUESTING FOR ASSOCIATION
  const requestFilteredAssociations = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      console.error("Selected country is missing or empty");
      return;
    }

    if (!selectedState || selectedState === "All") {
      try {
        sendDataToServer(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/volunteer?country=${encodeURIComponent(selectedCountry)}`,
        );

        console.log("Country data sent successfully");
      } catch (error) {
        console.error("Error sending country data:", error.message);
      }
    } else {
      if (!selectedCity || selectedCity === "All") {
        try {
          sendDataToServer(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/volunteer?country=${selectedCountry}&state=${encodeURIComponent(
              selectedState,
            )}`,
          );
          console.log("Country and state data sent successfully");
        } catch (error) {
          console.error("Error sending country and state data:", error.message);
        }
      } else {
        try {
          await sendDataToServer(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/volunteer?country=${selectedCountry}&state=${encodeURIComponent(
              selectedState,
            )}&city=${encodeURIComponent(selectedCity)}`,
          );
          console.log("All data sent successfully");
        } catch (error) {
          console.error("Error sending all data:", error.message);
        }
      }
    }
  };
  const sendDataToServer = async (apiurl) => {
    try {
      const response = await axios.get(apiurl, {
        withCredentials: true,
      });
      const locationdata = response.data.volunteer;
      console.log(locationdata);
      setFilteredVolunteersArray(locationdata);
    } catch (error) {
      console.log(error);
    }
  };

  // ASSOCIATIONS REQUESTING FOR VOLUNTEER
  const requestFilteredVolunteers = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      console.error("Selected country is missing or empty");
      return;
    }

    if (!selectedState || selectedState === "All") {
      try {
        sendDataToServer2(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/association?country=${encodeURIComponent(selectedCountry)}`,
        );

        console.log("Country data sent successfully");
      } catch (error) {
        console.error("Error sending country data:", error.message);
      }
    } else {
      if (!selectedCity || selectedCity === "All") {
        try {
          sendDataToServer2(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/association?country=${selectedCountry}&state=${encodeURIComponent(
              selectedState,
            )}`,
          );
          console.log("Country and state data sent successfully");
        } catch (error) {
          console.error("Error sending country and state data:", error.message);
        }
      } else {
        try {
          await sendDataToServer2(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/association?=${selectedCountry}&state=${encodeURIComponent(
              selectedState,
            )}&city=${encodeURIComponent(selectedCity)}`,
          );
          console.log("All data sent successfully");
        } catch (error) {
          console.error("Error sending all data:", error.message);
        }
      }
    }
  };
  const sendDataToServer2 = async (apiurl) => {
    try {
      const response = await axios.get(apiurl, {
        withCredentials: true,
      });
      const locationdata = response.data.associations;
      console.log(locationdata);
      setFilteredAssociationsArray(locationdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userType === "association" ? (
        <div className="">
          <h1 className="text-darkest font-customFont flex justify-center pt-[2.38rem] text-[1.25rem] font-semibold">
            FIND VOLUNTEERS
          </h1>
          <div className="flex flex-wrap">
            <div className="two-columns-left mt-[2rem] w-full basis-[38rem] pr-0 lg:w-[1/2]">
              <form
                onSubmit={requestFilteredAssociations}
                className="custom-darkest-card ml-[6.0rem] h-[26.5rem] w-[32.0rem] "
              >
                <div className="location-info mt-[2.0rem] flex justify-start space-x-[1.0rem]">
                  <h1 className="mb-2 p-0 text-[1.125rem] font-semibold tracking-wide text-white">
                    LOCATION:
                  </h1>
                  <div>
                    <Location
                      countries={countries}
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      setSelectedCountryIso2={setSelectedCountryIso2}
                      states={states}
                      selectedState={selectedState}
                      setSelectedState={setSelectedState}
                      setSelectedStateIso2={setSelectedStateIso2}
                      cities={cities}
                      selectedCity={selectedCity}
                      setSelectedCity={setSelectedCity}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="custom-button-darkest-card h-[3.0rem] w-[13.0rem]">
                    FIND VOLUNTEERS
                  </button>
                </div>
              </form>
            </div>
            <div></div>

            <div className="two-columns-right ml-[6.0rem] mr-[0rem] mt-[2rem] w-full pl-0 lg:w-1/2 lg:flex-grow">
              <ResultsVolunteers
                filteredVolunteersArray={filteredVolunteersArray}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="dog-walking-info flex w-full flex-wrap justify-center">
            <img
              className="h-[28rem] w-full object-cover opacity-80"
              src={dogWalking}
              alt="dogWalking"
            />
          </div>

          <h1 className="text-darkest font-customFont mb-[3rem] mt-[4rem] w-full justify-center text-center text-[1.25rem] font-semibold">
            HOW CAN I HELP?
          </h1>
          <h2 className="bg-medium ml-[3.5rem] mr-[3.5rem] justify-center rounded-[20px] p-[2rem] text-center font-bold leading-5 text-white shadow-md">
            Dogs don’t only need food and a roof over their heads to thrive, but
            also affection and lots of outdoor and playtime! <br />
            <br />
            Register to see the list of Associations that are looking for
            volunteers to walk their dogs.
          </h2>

          <h1 className="text-darkest font-customFont mt-[4rem] flex justify-center text-[1.25rem] font-semibold">
            FIND SHELTERS THAT NEED HELP
          </h1>

          <div className="dog-walking-search flex w-full flex-wrap justify-start">
            <div className="flex flex-wrap">
              <div className="dog-walking-search-left-col two-columns-left mt-[3rem] basis-[38rem] justify-start pr-0 lg:w-[1/2]">
                <form
                  onSubmit={requestFilteredVolunteers}
                  className="custom-darkest-card ml-[3.5rem] h-[27rem] w-[32.5rem] "
                >
                  <div className="location-info mt-[2.0rem] flex justify-start space-x-[1.0rem]">
                    <h1 className="mb-2 p-0 text-[1.125rem] font-semibold tracking-wide text-white">
                      LOCATION:
                    </h1>
                    <div>
                      <Location
                        countries={countries}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        setSelectedCountryIso2={setSelectedCountryIso2}
                        states={states}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                        setSelectedStateIso2={setSelectedStateIso2}
                        cities={cities}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button className="custom-button-darkest-card h-[3.00rem] w-[15.0rem]">
                      FIND ASSOCIATIONS
                    </button>
                  </div>
                </form>
              </div>
              <div className="dog-walking-search-right-col two-columns-right ml-[3.5rem]  mt-[3rem] flex w-full items-start justify-start lg:w-1/2 lg:flex-grow">
                {!mail ? (
                  <h2>
                    Register or Login to see the list of associations that need
                    help with dog walking
                  </h2>
                ) : (
                  <ResultsAssociations
                    filteredAssociationsArray={filteredAssociationsArray}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogWalkingSearchParams;
