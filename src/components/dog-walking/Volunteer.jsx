import noPhoto from "../../assets/images/noPhoto.png";

const Volunteer = ({
  photo,
  id,
  name,
  location,
  contactPhone,
  contactEmail,
}) => {
  let mainVolunteerPhoto = noPhoto;

  if (photo) {
    mainVolunteerPhoto = photo;
  }

  return (
    <div className="card-results-dogs mr-[2rem] flex h-auto max-w-[48.0rem] flex-wrap items-center">
      <div className="float-left m-[0.8rem] h-[7rem] min-h-[7rem] w-[5.251rem] min-w-[5.251rem]">
        <img
          src={mainVolunteerPhoto}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="dogs-info break-all">
        <h2 className="text-[1.00rem] text-white">
          Name:&nbsp;&nbsp;&nbsp;{name}
        </h2>
        <h2 className="text-[1.00rem] text-white">
          Location:&nbsp;&nbsp;&nbsp;{location}
        </h2>
        <h2 className="text-[1.00rem] text-white">
          Phone:&nbsp;&nbsp;&nbsp;{contactPhone}
        </h2>
        <h2 className="text-[1.00rem] text-white">
          Email:&nbsp;&nbsp;&nbsp;{contactEmail}
        </h2>
      </div>
    </div>
  );
};

export default Volunteer;
