import noPhoto from "../../assets/images/noPhoto.png";
import { Link } from "react-router-dom";

const Dog = ({ dogPhotos, dogId, dogName, dogBreed, location }) => {
  let mainDogPhoto = noPhoto;

  if (dogPhotos) {
    mainDogPhoto = dogPhotos;
  }

  return (
    <Link to={`/dogdetails/${dogId}`} className="">
      <div className="card-results-dogs mr-[2rem] flex h-auto max-w-[48.0rem] flex-wrap items-center">
        <div className="float-left m-[0.8rem] h-[7rem] min-h-[7rem] w-[5.251rem] min-w-[5.251rem]">
          <img
            src={mainDogPhoto}
            alt={dogName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="dogs-info break-all">
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