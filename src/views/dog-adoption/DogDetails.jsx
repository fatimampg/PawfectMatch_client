import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import axios from "axios";
import noPhoto from "../../assets/images/noPhoto.png";

const DogDetails = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [dogPhotos, setDogPhotos] = useState([
    noPhoto,
    noPhoto,
    noPhoto,
    noPhoto,
    noPhoto,
  ]);
  const [dogProfilePhoto, setDogProfilePhoto] = useState(dogPhotos[0]);
  const [error, setError] = useState("");
  // Context:
  const { currentUser } = useContext(UserContext);
  let userType = currentUser?.usertype;
  let mail = currentUser?.mail;

  useEffect(() => {
    if (!mail) {
      navigate("/login");
      alert("Login or Register To See  Dog Details");
    }
    console.log(mail);
  }, [mail]);

  const navigate = useNavigate();
  const { dogId } = useParams();
  console.log(dogId);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  //Initializing dogs info:
  const [dogInfo, setDogInfo] = useState({
    dogName: "",
    dogBreed: "",
    dogAge: "",
    country: "",
    state: "",
    city: "",
    dogDescription: "",
    dogPhotos: [],
    dogProfilePhoto: "",
    associationName: "",
  });

  const getDogInfo = async (dogId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/dogs/${dogId}`,
      );
      const fetchedDogInfo = await response.data;
      const response2 = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/userAssociation/${dogId}`,
      );
      const fetchedDogInfo2 = response2.data;
      console.log("dog initially fetched from the DB", fetchedDogInfo2);
      console.log("dog initially fetched from the DB", fetchedDogInfo);
      setDogInfo({
        dogName: fetchedDogInfo.dogName,
        dogBreed: fetchedDogInfo.dogBreed,
        dogAge: fetchedDogInfo.dogAge,
        country: fetchedDogInfo.country,
        state: fetchedDogInfo.state,
        city: fetchedDogInfo.city,
        dogDescription: fetchedDogInfo.dogDescription,
        dogPhotos: fetchedDogInfo.dogPhotos,
        dogProfilePhoto: fetchedDogInfo.dogProfilePhoto,
        associationName: fetchedDogInfo2.associationName,
        contactEmail: fetchedDogInfo2.contactEmail,
        contactPhone: fetchedDogInfo2.contactPhone,
      });
      //Updating component's data with the values obtained from the DB:
      setDogName(fetchedDogInfo.dogName);
      setSelectedBreed(fetchedDogInfo.dogBreed);
      setDogAge(fetchedDogInfo.dogAge);
      setSelectedCountry(fetchedDogInfo.country);
      setSelectedState(fetchedDogInfo.state);
      setSelectedCity(fetchedDogInfo.city);
      setDogDescription(fetchedDogInfo.dogDescription);
      setDogPhotos(fetchedDogInfo.dogPhotos);
      setDogProfilePhoto(fetchedDogInfo.dogProfilePhoto);
      setAssociationName(fetchedDogInfo2.associationName);
      setContactEmail(fetchedDogInfo2.contactEmail);
      setContactPhone(fetchedDogInfo2.contactPhone);
    } catch (error) {
      console.log(error);
      console.log("Error fetching dog information");
    }
  };
  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
  };
  const handleBackNavigation = () => {
    if (userType === "association") {
      navigate("/managedogs");
    } else {
      navigate("/dogsadoption");
    }
  };

  useEffect(() => {
    getDogInfo(dogId);
  }, []);

  return (
    <div className="dog-details">
      <div className="dog-details-title flex items-center">
        <button
          className="custom-button-over-white-bg ml-[2rem] h-[3.0rem] w-[6.5rem]"
          onClick={handleBackNavigation}
        >
          BACK
        </button>
        <h1 className="text-darkest font-customFont flex w-2/3 flex-grow justify-center p-[2.38rem] text-[1.25rem] font-semibold">
          DOG DETAILS
        </h1>
      </div>
      <div className="container-dog mt-[1rem] flex flex-wrap items-start gap-[0rem]">
        <div className="container-dog-images ml-[8.125rem] flex-shrink-0 ">
          <img
            className="w-22.105rem] h-[29.4rem] object-cover"
            src={dogProfilePhoto || dogPhotos[selectedPhotoIndex]}
            alt={dogName}
          />
        </div>
        <div className="flex-grow">
          <div className="container-dog-info ml-[8.125rem]">
            <div className="text-darkest mt-10 text-[1.0rem] ">
              <h2 className="mb-5">
                <strong>NAME:</strong>&nbsp;&nbsp;&nbsp;{dogName}
              </h2>
              <h2 className="mb-5">
                <strong>AGE:</strong>&nbsp;&nbsp;&nbsp;{dogAge}
              </h2>
              <h2 className="mb-5">
                <strong>BREED:</strong>&nbsp;&nbsp;&nbsp;{selectedBreed}
              </h2>
              <h2 className="mb-5">
                <strong>LOCATION:</strong>&nbsp;&nbsp;&nbsp;
                {`${selectedCity}, ${selectedState}, ${selectedCountry}`}
              </h2>
              <h2 className="mb-5">
                <strong>ASSOCIATION:</strong>&nbsp;&nbsp;&nbsp;
                {associationName}
              </h2>
              <h2 className="mb-5">
                <strong>PHONE:</strong>&nbsp;&nbsp;&nbsp;{contactPhone}
              </h2>
              <h2 className="mb-5">
                <strong>EMAIL:</strong>&nbsp;&nbsp;&nbsp;{contactEmail}
              </h2>
              <h2 className="bg-darkest mt-10 h-[10.94rem] w-[35rem] rounded-lg p-2 text-justify text-white">
                {dogDescription}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DogDetails;
