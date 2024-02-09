import { useState, useEffect, useContext } from "react";
import Location from "../dog-adoption/Location";
import { useLocationData } from "../../utils/locationData";
import noPhoto from "../../assets/images/noPhoto.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";
import axios from "axios";

const UserProfile = () => {
  const [associationName, setAssociationName] = useState("");
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryIso2, setSelectedCountryIso2] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateIso2, setSelectedStateIso2] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoDb, setPhotoDb] = useState(null);
  const [photoPer, setPhotoPer] = useState(0);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Context:
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.mail;
  let userType = currentUser?.usertype;

  console.log(
    "userType identified in token - CHECK if it is correct!",
    userType,
  );

  //Initializing userInfo used to collect user data from the DB:
  const [userInfo, setUserInfo] = useState({
    associationName: "",
    nameFirst: "",
    nameLast: "",
    contactEmail: "",
    contactPhone: "",
    country: "",
    city: "",
    state: "",
    description: "",
    checkBox: false,
    userType,
  });

  //If user writes manually the path /profile and is logged out, will be directly forwarded to login:
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    getUserInfo();
  }, [token]);

  // Fetching location data from public API:
  const { countries, states, cities } = useLocationData(
    selectedCountryIso2,
    selectedStateIso2,
  );

  // Get user information stored in the DB:
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/profile`,
        { withCredentials: true },
      );
      const fetchedUserInfo = await response.data;
      console.log("userInfo initially fetched from the DB", fetchedUserInfo);

      setUserInfo({
        associationName: fetchedUserInfo.associationName,
        nameFirst: fetchedUserInfo.nameFirst,
        nameLast: fetchedUserInfo.nameLast,
        country: fetchedUserInfo.country,
        city: fetchedUserInfo.city,
        state: fetchedUserInfo.state,
        contactEmail: fetchedUserInfo.contactEmail,
        contactPhone: fetchedUserInfo.contactPhone,
        description: fetchedUserInfo.description,
        checkBox: fetchedUserInfo.checkBox,
        userType: fetchedUserInfo.userType,
        photo: fetchedUserInfo.profilePicture,
      });

      // Updating component's data with the values obtained from the DB:
      setAssociationName(fetchedUserInfo.associationName);
      setNameFirst(fetchedUserInfo.nameFirst);
      setNameLast(fetchedUserInfo.nameLast);
      setSelectedCountry(fetchedUserInfo.country);
      setSelectedState(fetchedUserInfo.state);
      setSelectedCity(fetchedUserInfo.city);
      setContactEmail(fetchedUserInfo.contactEmail);
      setContactPhone(fetchedUserInfo.contactPhone);
      setDescription(fetchedUserInfo.description);
      setIsChecked(fetchedUserInfo.checkBox);
      setPhoto(fetchedUserInfo.profilePicture);
    } catch (error) {
      console.log(error);
      console.log("Error fetching user information");
    }
  };

  // Toggle function (Edit mode):
  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    console.log(
      "editMode (when EDIT button is clicked should be true, and when CANCEL button is clicked should be false)",
      editMode,
    );
  }, [editMode]);

  // In case the user doesn't want to save changes:
  const handleCancelClick = () => {
    setEditMode(false);
    getUserInfo();
  };

  // Send new info added/edited by the user to the BE :
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the data being sent to the server
    console.log("Data that is going to be sent to the DB:", {
      associationName: associationName,
      nameFirst: nameFirst,
      nameLast: nameLast,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      country: selectedCountry,
      city: selectedCity,
      state: selectedState,
      description: description,
      checkBox: isChecked,
      userType,
      photo: photo,
    });

    setError("");
    setEditMode(false);
    // Send the updated information to the BE:
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/profile`,
        {
          associationName: associationName,
          nameFirst: nameFirst,
          nameLast: nameLast,
          contactEmail: contactEmail,
          contactPhone: contactPhone,
          country: selectedCountry,
          city: selectedCity,
          state: selectedState,
          description: description,
          checkBox: isChecked,
          userType,
          photo: photo,
        },
      );

      const user = await response.data;
      uploadPhoto(photoDb);
      alert("Changes made!");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  useEffect(() => {
    // Log updated userData after it has been set
    console.log(
      "isChecked value (taking into account the checkbox option)",
      isChecked,
    );
  }, [isChecked]);

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
          setPhoto(downloadURL);
          setPhotoDb({ profilePicture: downloadURL });
        });
      },
    );
  };

  const uploadPhoto = async (photo) => {
    console.log(photo);
    try {
      const response = axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/editpicture`,
        photo,
        {
          withCredentials: true,
        },
      );
      const userPhoto = response.data;
      console.log("database photo url ", userPhoto);
    } catch (error) {
      console.log("  error upload user photo", error);
    }
  };

  useEffect(() => {
    console.log("photo Url to be sent to the database ", photo);
  });

  return (
    <div className="profile-container pt-[5rem]">
      <div className="title-and-button flex max-w-[66rem] flex-wrap justify-between">
        <h1 className="text-darkest mb-[4.0rem] flex justify-start pl-[3rem] text-[1.25rem] font-bold">
          USER PROFILE:
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container-two-columns grid grid-cols-1 gap-0 lg:w-[80rem] lg:grid-cols-2">
          <div className="left-column flex flex-col pl-[3rem] lg:col-span-1">
            {userType === "association" ? (
              <div className="flex shrink-0 flex-col ">
                <div className="input-field mb-[1.0rem] flex items-center ">
                  <label
                    htmlFor="associationName"
                    className="text-darkest mr-2 mt-[0.50rem] shrink-0 pb-[0.5rem]  pr-[3.6rem] text-start text-[1.00rem] font-bold"
                  >
                    NAME:
                  </label>
                  <input
                    type="text"
                    id="associationName"
                    className="user-data-input h-[2.4rem] w-[20rem] shrink-0"
                    value={associationName}
                    onChange={(e) => setAssociationName(e.target.value)}
                    placeholder="Name"
                    readOnly={!editMode}
                    defaultValue={associationName}
                  />
                </div>
              </div>
            ) : (
              <div className="flex shrink-0 flex-col ">
                <div className="input-field mb-[1.0rem] flex items-center ">
                  <label
                    htmlFor="nameFirst"
                    className="text-darkest mr-2 mt-[0.50rem] shrink-0 pb-[0.5rem]  pr-[3.6rem] text-start text-[1.00rem] font-bold"
                  >
                    NAME:
                  </label>
                  <input
                    type="text"
                    id="nameFirst"
                    className="user-data-input h-[2.4rem] w-[20rem] shrink-0"
                    value={nameFirst}
                    onChange={(e) => setNameFirst(e.target.value)}
                    placeholder="First Name"
                    readOnly={!editMode}
                    defaultValue={nameFirst}
                  />
                </div>
                <div className="input-field mb-[1.0rem] flex items-center ">
                  <label
                    htmlFor="nameLast"
                    className="text-darkest mr-2 shrink-0 pb-[1rem] pr-[6.8rem] text-start text-[1.00rem]"
                  >
                    {" "}
                  </label>
                  <input
                    type="text"
                    id="nameLast"
                    className="user-data-input  h-[2.4rem] w-[20rem] shrink-0"
                    value={nameLast}
                    onChange={(e) => setNameLast(e.target.value)}
                    placeholder="Last Name"
                    readOnly={!editMode}
                    defaultValue={nameLast}
                  />
                </div>
              </div>
            )}
            <div className="input-field mb-[1.0rem] flex items-center ">
              <label
                htmlFor="contactEmail"
                className="text-darkest mr-2 mt-[0.50rem] shrink-0 pb-[0.5rem]  pr-[1.6rem] text-start text-[1.00rem] font-bold"
              >
                CONTACT:
              </label>
              <input
                type="email"
                id="contactEmail"
                className="user-data-input h-[2.4rem] w-[20rem] shrink-0"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Email"
                readOnly={!editMode}
                defaultValue={contactEmail}
              />
            </div>
            <div className="input-field mb-[0.0rem] flex items-center ">
              <label
                htmlFor="contactPhone"
                className="text-darkest mr-2 shrink-0 pb-[1rem] pr-[6.8rem] text-start text-[1.00rem]"
              >
                {" "}
              </label>
              <input
                type="tel"
                id="contactPhone"
                className="user-data-input h-[2.4rem] w-[20rem] shrink-0"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone"
                readOnly={!editMode}
                defaultValue={contactPhone}
              />
            </div>
            <div className="location-info mt-[1.0rem] flex justify-start space-x-[1.0rem]">
              <h1 className="text-darkest mt-[0.50rem] shrink-0 p-0  pb-[0.5rem] pr-[0.8rem] text-[1.00rem] font-semibold tracking-wide">
                LOCATION:
              </h1>
              {editMode ? (
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
              ) : (
                <div>
                  <h2>{userInfo.country ? selectedCountry : userInfo.city}</h2>
                  <h2>{userInfo.state ? selectedState : userInfo.city}</h2>
                  <h2>{userInfo.city ? selectedCity : userInfo.city}</h2>
                </div>
              )}
            </div>
            <div className="input-description mb-[0.0rem] flex ">
              <label
                htmlFor="description"
                className="text-darkest mr-2 mt-[1.2rem] shrink-0 pb-[1rem] pr-[0rem] text-start text-[1.00rem] font-bold"
              >
                DESCRIPTION:
              </label>
              <textarea
                type="text"
                id="description"
                className="user-data-input bg-darkest mt-[0.5rem] h-[2.4rem] w-[28.0rem] shrink-0 resize-none break-all px-4 py-4 pb-[6.0rem] text-justify leading-5 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="(max. 200 characters)"
                readOnly={!editMode}
                defaultValue={description}
              />
            </div>
            <div className="ml-[0rem] mt-[2rem] flex items-center justify-start">
              <input
                type="checkbox"
                id="questionCheckbox"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
                readOnly={!editMode}
              />
              <label
                htmlFor="questionCheckbox"
                className="text-darkest ml-[1.0rem] text-[1.00rem] font-bold"
              >
                {userType === "association"
                  ? "Do you need help with dog walking?"
                  : userType === "regular"
                    ? "Do you want to become a volunteer?"
                    : "Do you want to stop being a volunteer?"}
              </label>
            </div>
          </div>
          <div className="right-column pl-[3rem] pt-[0rem] lg:col-span-1 ">
            {userType === "association" ? (
              <>
                <div>
                  <h1 className="text-darkest mb-[1.5rem] ml-[8rem] text-[1.0rem] font-bold">
                    {" "}
                    ADD/CHANGE LOGO{" "}
                  </h1>
                </div>
                <div className=" ml-[3rem] mt-[2rem] flex flex-wrap justify-start ">
                  <img
                    key={photo}
                    className="h-[20rem] w-[20rem] object-cover"
                    src={photo || noPhoto}
                    alt="user_photo"
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-darkest mb-[1.5rem] ml-[8rem] text-[1.0rem] font-bold ">
                  {" "}
                  ADD/CHANGE PHOTO{" "}
                </h1>
                <div className=" ml-[6rem] mt-[2rem] flex flex-wrap justify-start ">
                  <img
                    key={photo}
                    className="h-[20rem] w-[15rem] object-cover"
                    src={photo || noPhoto}
                    alt="user_photo"
                  />
                </div>
              </>
            )}
            <h1 className="text-darkest mb-[1.5rem] ml-[6.5rem] mt-1 text-[0.9rem]">
              (Recommended aspect/ratio: 4:3){" "}
            </h1>
            <div>
              {editMode && (
                <div className="mt-8">
                  <label
                    htmlFor="img"
                    className="text-darkest mouse-pointer border-darkest  mb-[2rem] ml-[9.5rem] mt-[2rem] h-[2.5rem] w-[8.0rem] cursor-pointer rounded-[20px] border bg-white p-3 text-[0.875rem] font-bold"
                  >
                    CHANGE PHOTO
                    <input
                      type="file"
                      accept="image/*"
                      id="img"
                      style={{ display: "none" }}
                      onChange={(e) => handlePhotoChange(e)}
                    />
                  </label>{" "}
                  {photoPer > 0 && "Uploading: " + photoPer + "%"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-[1rem] flex max-w-[66rem] justify-center gap-4">
          {editMode ? (
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
          ) : (
            <button
              className="custom-button-over-white-bg h-[3.0rem] w-[11.0rem]"
              type="button"
              onClick={() => handleEditMode()}
            >
              EDIT
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;