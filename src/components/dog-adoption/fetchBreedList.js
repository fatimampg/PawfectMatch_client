async function fetchBreedList() {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
    const body = await response.json();
    const originalArrayBreeds = Object.entries(body.message);

    let breedsArray = [];

    originalArrayBreeds.forEach((item) => {
      const breed = item[0];
      const subbreed = item[1];
      if (subbreed.length === 0) {
        breedsArray.push(breed);
      } else {
        subbreed.forEach((subbreed) => {
          breedsArray.push(`${subbreed} ${breed}`);
        });
      }
    });
    const sortedBreeds = breedsArray.slice().sort();
    return sortedBreeds;
  } catch (error) {
    console.log("error fetching dog breeds", error);
    throw error;
  }
}

export default fetchBreedList;
