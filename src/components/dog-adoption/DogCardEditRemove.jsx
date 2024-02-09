import noPhoto from "../../assets/images/noPhoto.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DogCardEditRemove = ({
  dogName,
  dogBreed,
  location,
  dogId,
  dogProfilePhoto,
}) => {
  const navigate = useNavigate();

  // Show dog profile photo if it exists:
  let mainDogPhoto = noPhoto;
  if (dogProfilePhoto.length) {
    mainDogPhoto = dogProfilePhoto;
  } else {
    mainDogPhoto = noPhoto;
  }

  //REMOVE DOG FROM THE DATABASE (based on the dogId):
  const handleRemoveDog = async (dogId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/${dogId}`,
      );
      const removeDogState = response.data;
      navigate(0);
      console.log("dog removed from the DB", removeDogState);
    } catch (error) {
      console.log(error);
      console.log("Error fetching dog information");
    }
  };

  return (
    <div className="card-results-dogs flex h-[9rem] w-[60.0rem] items-center">
      <div className="dogs-info-photo flex items-center">
        <div className="dog-photo float-left ml-[1rem] mr-[1.5rem] mt-[1rem] h-[7rem] w-[5.251rem] cursor-pointer rounded-full object-cover">
          <img
            src={mainDogPhoto}
            alt={dogName}
            onError={(e) => {
              e.target.src = noPhoto;
            }}
          />
        </div>
        <div className="dogs-info font-bold">
          <h1 className="text-[1.00rem] text-white">
            Name:&nbsp;&nbsp;&nbsp;{dogName}
          </h1>
          <h2 className="text-[1.00rem] text-white">
            Breed:&nbsp;&nbsp;&nbsp;{dogBreed}
          </h2>
          <h2 className="text-[1.00rem] text-white">
            Location:&nbsp;&nbsp;&nbsp;{location}
          </h2>
        </div>
      </div>
      <div className="ml-auto flex">
        <button
          className="custom-button-darkest-card  mr-[1rem] h-[3.0rem] w-[8.0rem]"
          type="button"
          onClick={() => navigate(`/editdog/${dogId}`)}
        >
          EDIT
        </button>
        <button
          className="custom-button-darkest-card ml-[0.5rem] mr-[1rem] h-[3.0rem] w-[8.0rem]"
          type="button"
          onClick={() => handleRemoveDog(dogId)}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default DogCardEditRemove;