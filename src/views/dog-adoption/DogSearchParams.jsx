import { useState, useEffect } from "react";
import Location from "../../components/dog-adoption/Location";
import ResultsDogsAdoption from "../../components/dog-adoption/ResultsDogsAdoption";
import fetchBreedList from "../../utils/fetchBreedList";
import transformToReadableString from "../../utils/transformToReadableString";
import { useLocationData } from "../../utils/locationData";
import axios from "axios";

const DogSearchParams = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryIso2, setSelectedCountryIso2] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedStateIso2, setSelectedStateIso2] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [filteredDogsArray, setFilteredDogsArray] = useState([]); 

  const { countries, states, cities } = useLocationData(
    selectedCountryIso2,
    selectedStateIso2
  );

  useEffect(() => {
    fetchBreedList().then((breeds) => {
      setBreeds(breeds);
    });
  }, []);

  useEffect(() => {
    const getAlldogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/alldog`,
          {
            withCredentials: true,
          }
        );
        const locationdata = response.data;
        console.log(locationdata);
        setFilteredDogsArray(locationdata);
      } catch (error) {
        console.log(error);
      }
    };
    getAlldogs();
  }, []);

  const requestFiltered = async (e) => {
    e.preventDefault();
    if (selectedBreed === "All") {
      return sendDataToServer(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/alldogs`
      );
    }
    if (selectedBreed && !selectedCountry) {
      return sendDataToServer(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/alldogs/${selectedBreed}`
      );
    } else {
      if (!selectedState || (selectedState === "All" && selectedBreed)) {
        try {
          sendDataToServer(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/mydogs?country=${encodeURIComponent(
              selectedCountry
            )}&dogBreed=${encodeURIComponent(selectedBreed)}`
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
              }/mydogs?country=${selectedCountry}&state=${encodeURIComponent(
                selectedState
              )}&dogBreed=${encodeURIComponent(selectedBreed)}`
            );
            console.log("Country and state data sent successfully");
          } catch (error) {
            console.error(
              "Error sending country and state data:",
              error.message
            );
          }
        } else {
          try {
            await sendDataToServer(
              `${
                import.meta.env.VITE_REACT_APP_BASE_URL
              }/mydogs?country=${selectedCountry}&state=${encodeURIComponent(
                selectedState
              )}&city=${encodeURIComponent(
                selectedCity
              )}&dogBreed=${encodeURIComponent(selectedBreed)}`
            );
            console.log("All data sent successfully");
          } catch (error) {
            console.error("Error sending all data:", error.message);
          }
        }
      }
    }
  };

  const sendDataToServer = async (apiurl) => {
    console.log(apiurl);
    try {
      const response = await axios.get(apiurl, {
        withCredentials: true,
      });
      const locationdata = response.data;
      console.log(locationdata);
      setFilteredDogsArray(locationdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-darkest font-customFont flex justify-center p-[2.38rem] text-[1.25rem] font-semibold">
        FIND DOGS
      </h1>
      <div className="flex flex-wrap">
        <div className="two-columns-left w-full basis-[38rem] pr-0 lg:w-[1/2]">
          <form
            onSubmit={requestFiltered}
            className="custom-darkest-card ml-[6.0rem] h-[32rem] w-[32.50rem] "
          >
            <div className="location-info mt-[2.0rem] flex justify-start space-x-[1.0rem]">
              <h1 className="mb-2 mt-[0.3rem] p-0 text-[1.125rem] font-semibold tracking-wide text-white">
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

            <div className="breed-info mt-[2rem] flex justify-start space-x-[3.12rem] pt-0">
              <h1 className="mt-[0.3rem] text-[1.125rem] font-semibold tracking-wide text-white">
                BREED:
              </h1>
              <label htmlFor="breeds">
                <select
                  className="custom-select-option w-[20rem]"
                  id="breeds"
                  value={selectedBreed}
                  onChange={(e) => {
                    setSelectedBreed(e.target.value);
                  }}
                >
                  <option key="">Breed</option>
                  <option key="allBreed">All</option>
                  <option key="unknown">Unknown</option>
                  {breeds.map((dogBreed) => (
                    <option key={dogBreed}>
                      {transformToReadableString(dogBreed)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex justify-center">
              <button className="custom-button-darkest-card h-[3.0rem] w-[9.0rem]">
                FIND A DOG
              </button>
            </div>
          </form>
        </div>

        <div className="two-columns-right ml-[6.0rem] mr-[0rem] mt-[2rem] w-full pl-0 lg:w-1/2 lg:flex-grow">
          <ResultsDogsAdoption filteredDogsArray={filteredDogsArray} />
        </div>
      </div>
    </div>
  );
};

export default DogSearchParams;
