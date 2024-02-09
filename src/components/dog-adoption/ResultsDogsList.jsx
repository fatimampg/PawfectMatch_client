import DogCardEditRemove from "./DogCardEditRemove";

const ResultsDogsList = ({ filteredDogsArray }) => {

  return (
    <div>
      <div className="">
        {!filteredDogsArray.length ? (
          <h1>No dogs found</h1>
        ) : (
          filteredDogsArray.map((dog) => (
            <DogCardEditRemove
              dogName={dog.dogName}
              dogBreed={dog.dogBreed}
              location={`${dog.country}, ${dog.state}, ${dog.city}`}
              dogPhotos={dog.dogProfilePhoto}
              dogId={dog._id}
              key={dog.dogId}
              dogProfilePhoto={dog.dogProfilePhoto}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsDogsList;
