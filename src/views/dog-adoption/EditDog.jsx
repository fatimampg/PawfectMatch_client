import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Location from "../../components/dog-adoption/Location";
import fetchBreedList from "../../utils/fetchBreedList";
import transformToReadableString from "../../utils/transformToReadableString";
import { useLocationData } from "../../utils/locationData";
import noPhoto from "../../assets/images/noPhoto.png";
import { UserContext } from "../../components/context/UserContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../components/auth/firebase";

const EditDog = () => {
  const { dogId } = useParams(); 
  console.log(dogId);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryIso2, setSelectedCountryIso2] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateIso2, setSelectedStateIso2] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogProfilePhoto, setDogProfilePhoto] = useState(noPhoto); 
  const [photoPer, setPhotoPer] = useState(0);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.mail; 
  let userType = currentUser?.usertype;

  //Get dog info - run when the component mounts:
  useEffect(() => {
    getDogInfo(dogId);
  }, []);

  //Initializing dogs info:
  const [dogInfo, setDogInfo] = useState({
    dogName: "",
    dogBreed: "",
    dogAge: "",
    country: "",
    state: "",
    city: "",
    dogDescription: "",
    dogProfilePhoto: "",
    associationName: "",
  });

  //GET INFO OF THAT DOG FROM THE DB, BASED ON THE dogId:
  const getDogInfo = async (dogId) => {

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/dogs/${dogId}`
      );

      const fetchedDogInfo = await response.data;
      console.log("dog initially fetched from the DB", fetchedDogInfo);
      setDogInfo({
        dogName: fetchedDogInfo.dogName,
        dogBreed: fetchedDogInfo.dogBreed,
        dogAge: fetchedDogInfo.dogAge,
        country: fetchedDogInfo.country,
        state: fetchedDogInfo.state,
        city: fetchedDogInfo.city,
        dogDescription: fetchedDogInfo.dogDescription,
        dogProfilePhoto: fetchedDogInfo.dogProfilePhoto,
      });
      setDogName(fetchedDogInfo.dogName);
      setSelectedBreed(fetchedDogInfo.dogBreed);
      setDogAge(fetchedDogInfo.dogAge);
      setSelectedCountry(fetchedDogInfo.country);
      setSelectedState(fetchedDogInfo.state);
      setSelectedCity(fetchedDogInfo.city);
      setDogDescription(fetchedDogInfo.dogDescription);
      setDogProfilePhoto(fetchedDogInfo.dogProfilePhoto);
    } catch (error) {
      console.log(error);
      console.log("Error fetching dog information");
    }
  };

  // fetch location data:
  const { countries, states, cities } = useLocationData(
    selectedCountryIso2,
    selectedStateIso2
  );

  // fetch breeds (DOG-CEO-API) when the component mounts and update its state with fetched breeds:
  useEffect(() => {
    fetchBreedList().then((breeds) => {
      setBreeds(breeds);
    });
  }, []);

  //Cancel input (clear all input fields)
  const handleCancelClick = () => {
    setSelectedCountry(dogInfo.country);
    setSelectedState(dogInfo.state);
    setSelectedCity(dogInfo.city);
    setSelectedBreed(dogInfo.dogBreed);
    setDogName(dogInfo.dogName);
    setDogAge(dogInfo.dogAge);
    setDogDescription(dogInfo.dogDescription);
    setDogProfilePhoto(dogInfo.dogProfilePhoto);
    setError("");
    console.log("clearing all input fields");
  };


  const handleEditDog = async (e) => {
    e.preventDefault();

    console.log("Data that is going to be sent to the DB:", {
      dogName: dogName,
      dogBreed: selectedBreed,
      dogAge: dogAge,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      dogDescription: dogDescription,
      dogProfilePhoto: dogProfilePhoto,
    });

    // Send the updated information to the BE:
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/updatedogs/${dogId}`,
        {
          dogName: dogName,
          dogBreed: selectedBreed,
          dogAge: dogAge,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
          dogDescription: dogDescription,
          dogProfilePhoto: dogProfilePhoto,
        }
      );
      const dog = await response.data;
      alert("Dog edited");
      console.log(dog);
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };
  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setFile(selectedPhoto);
    console.log("selected photo", selectedPhoto);
  };
  useEffect(() => {
    file && uploadFile(file, "photoUrl");
    console.log("file", file);
  }, [file]);
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log("Upload task created:", uploadTask);
    console.log("filename:", fileName);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPhotoPer(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Error during upload:", error);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          // ...
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setDogProfilePhoto(downloadURL);
        });
      }
    );
  };


  return (
    <form className="add-dog" onSubmit={handleEditDog}>
      <div className="dog-info-title flex items-center">
        <h1 className="text-darkest font-customFont ml-[6rem] flex w-2/3 flex-grow justify-start p-[2.38rem] text-[1.25rem] font-semibold">
          EDIT DOG FOR ADOPTION
        </h1>
      </div>
      <div className="container-dog mt-[1rem] flex flex-wrap items-start gap-[0rem]">
        <div className="container-dog-images ml-[8.125rem] flex-shrink-0 ">
          <img
            key={dogProfilePhoto}
            className="h-[25rem] w-[18.75rem] object-cover"
            src={dogProfilePhoto || noPhoto}
            alt="dog_photo"
          />
          <h1 className="text-darkest mb-[1.5rem] ml-[2.0rem] mt-1 text-[0.9rem]">
            (Recommended aspect/ratio: 4:3){" "}
          </h1>
          <div className="mt-8">
            <label
              htmlFor="img"
              className="text-darkest mouse-pointer border-darkest  mb-[2rem] ml-[4.5rem] mt-[2rem] h-[2.5rem] w-[8.0rem] cursor-pointer rounded-[20px] border bg-white p-3 text-[0.875rem] font-bold"
            >
              CHANGE PHOTO
              <input
                type="file"
                accept="image/dogs/*"
                id="img"
                style={{ display: "none" }}
                onChange={(e) => handlePhotoChange(e)}
              />
            </label>
            {photoPer > 0 && "Uploading: " + photoPer + "%"}
          </div>
        </div>
        <div className="flex-grow">
          <div className="container-dog-info ml-[8.125rem]">
            <div className="text-darkest mt-10 text-[1.0rem] ">
              <div className="flex shrink-0 flex-col ">
                <div className="input-field mb-[1.0rem] flex items-center ">
                  <label
                    htmlFor="dogName"
                    className="text-darkest mr-2 mt-[0.50rem] shrink-0 pb-[0.5rem]  pr-[3.7rem] text-start text-[1.00rem] font-bold"
                  >
                    NAME:
                  </label>
                  <input
                    type="text"
                    id="dogName"
                    className="user-data-input h-[2.4rem] w-[20rem] shrink-0"
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                    defaultValue={dogName}
                  />
                </div>
              </div>
              <div className="input-field mb-[1.0rem] flex items-center ">
                <label
                  htmlFor="dogAge"
                  className="text-darkest mr-2 mt-[0.50rem] shrink-0 pb-[0.5rem]  pr-[4.6rem] text-start text-[1.00rem] font-bold"
                >
                  AGE:
                </label>
                <select
                  className="custom-select-option w-[20rem]"
                  id="dogAge"
                  value={dogAge}
                  onChange={(e) => {
                    setDogAge(e.target.value);
                  }}
                  defaultValue={dogAge}
                >
                  <option key="lessThan6months">Less than 6 months</option>
                  <option key="6monthsTo2years">6 months to 2 years</option>
                  <option key="moreThan2years">More than 2 years</option>
                </select>
              </div>
              <div className="breed-info mt-[0.0rem] flex justify-start space-x-[3.12rem] pt-0">
                <label
                  htmlFor="breeds"
                  className="text-darkest mr-2 mt-[0.50rem] shrink-0 pb-[0.5rem]  pr-[0.4rem] text-start text-[1.00rem] font-bold"
                >
                  BREED:
                </label>
                <select
                  className="custom-select-option w-[20rem]"
                  id="breeds"
                  value={selectedBreed}
                  onChange={(e) => {
                    setSelectedBreed(e.target.value);
                  }}
                  defaultValue={selectedBreed}
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
              </div>
              <div className="location-info mt-[0.0rem] flex justify-start space-x-[1.0rem]">
                <h1 className="text-darkest mt-[0.50rem] shrink-0 p-0  pb-[0.5rem] pr-[0.8rem] text-[1.00rem] font-semibold tracking-wide">
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
              <div className="input-description mb-[0.0rem] flex ">
                <label
                  htmlFor="dogDescription"
                  className="text-darkest mr-2 mt-[1.2rem] shrink-0 pb-[1rem] pr-[0rem] text-start text-[1.00rem] font-bold"
                >
                  DESCRIPTION:
                </label>
                <textarea
                  type="text"
                  id="dogDescription"
                  className="user-data-input bg-darkest mt-[0.5rem] h-[2.4rem] w-[28.0rem] shrink-0 resize-none break-all px-4 py-4 pb-[6.0rem] text-justify leading-5 text-white"
                  value={dogDescription}
                  onChange={(e) => setDogDescription(e.target.value)}
                  placeholder="(max. 200 characters)"
                  defaultValue={dogDescription}
                />
              </div>
            </div>
            <div className="ml-[0rem] mt-[1rem] flex max-w-[66rem] justify-start gap-4">
              <div>
                <button
                  className="custom-button-over-white-bg mr-8 h-[3.0rem] w-[11.0rem]"
                  type="submit"
                >
                  SAVE CHANGES
                </button>
                <button
                  className="custom-button-over-white-bg h-[3.0rem] w-[11.0rem]"
                  type="button"
                  onClick={() => handleCancelClick()}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditDog;
