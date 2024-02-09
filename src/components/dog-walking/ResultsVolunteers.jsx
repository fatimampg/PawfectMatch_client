import Volunteer from "./Volunteer";

const ResultsVolunteers = ({ filteredVolunteersArray }) => {
  return (
    <div>
      {!filteredVolunteersArray.length ? (
        <h1>No volunteers found</h1>
      ) : (
        filteredVolunteersArray.map((volunteer) => (
          <Volunteer
            name={`${volunteer.nameFirst} ${volunteer.nameLast}`}
            location={`${volunteer.country}, ${volunteer.state}, ${volunteer.city}`}
            photo={volunteer.profilePicture}
            id={volunteer._id}
            key={volunteer._id}
            contactPhone={volunteer.contactPhone}
            contactEmail={volunteer.contactEmail}
          />
        ))
      )}
    </div>
  );
};

export default ResultsVolunteers;
