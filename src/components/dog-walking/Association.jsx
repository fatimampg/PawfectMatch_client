import noPhoto from "../../assets/images/noPhoto.png";

const Association = ({
  photo,
  id,
  associationName,
  location,
  contactPhone,
  contactEmail,
}) => {
  let mainAssociationPhoto;
  if (photo) {
    mainAssociationPhoto = photo;
  } else {
    mainAssociationPhoto = noPhoto;
  }
  return (
    <div className="card-results-dogs mr-[2rem] flex h-auto max-w-[48.0rem] flex-wrap items-center">
      <div className="float-left m-[0.8rem] h-[5.251rem] min-h-[5.251rem] w-[5.251rem] min-w-[5.251rem]">
        <img
          src={mainAssociationPhoto}
          alt={associationName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="dogs-info break-all">
        <h2 className="text-[1.00rem] text-white">
          Name:&nbsp;&nbsp;{associationName}
        </h2>
        <h2 className="text-[1.00rem] text-white">
          Location:&nbsp;&nbsp;{location}
        </h2>
        <h2 className="text-[1.00rem] text-white">
          Phone:&nbsp;&nbsp;{contactPhone}
        </h2>
        <h2 className="text-[1.00rem] text-white">
          Email:&nbsp;&nbsp;{contactEmail}
        </h2>
      </div>
    </div>
  );
};

export default Association;
