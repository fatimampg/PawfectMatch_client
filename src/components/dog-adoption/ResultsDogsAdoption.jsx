import Dog from "./Dog";

const ResultsDogsAdoption = ({ filteredDogsArray }) => {
  return (
    <div className="">
      {!filteredDogsArray.length ? (
        <h1>No dogs found</h1>
      ) : (
        filteredDogsArray.map((dog) => (
          <Dog
            dogName={dog.dogName}
            dogBreed={dog.dogBreed}
            location={`${dog.country}, ${dog.state}, ${dog.city}`}
            dogPhotos={dog.dogProfilePhoto}
            dogId={dog._id}
            key={dog.dogId}
          />
        ))
      )}
    </div>
  );
};

export default ResultsDogsAdoption;
