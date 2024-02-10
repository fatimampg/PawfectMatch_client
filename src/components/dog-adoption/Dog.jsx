import noPhoto from "../../assets/images/noPhoto.png";
import { Link } from "react-router-dom";

const Dog = ({ dogPhotos, dogId, dogName, dogBreed, location }) => {
  let mainDogPhoto = noPhoto;

  if (dogPhotos) {
    mainDogPhoto = dogPhotos;
  }

  return (
    <Link to={`/dogdetails/${dogId}`} className="">
      <div className="card-results-dogs flex h-[9.00rem] w-[48.0rem] items-center">
        <div className="float-left ml-[1rem] mr-[1.5rem] mt-[0.5rem] h-[7rem] w-[5.251rem] rounded-full ">
          <img
            src={mainDogPhoto}
            alt={dogName}
            className="h-full w-full object-cover"
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
    </Link>
  );
};

export default Dog;