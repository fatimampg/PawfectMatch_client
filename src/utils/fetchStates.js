async function fetchStates(selectedCountryIso2) {
  if (!selectedCountryIso2) {
    console.log("selectedCountruIso2 is not defined");
    return [];
  }

  const config = {
    cUrl: `https://api.countrystatecity.in/v1/countries/${selectedCountryIso2}/states`,
    cKey: import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY,
  };

  const headers = new Headers();
  headers.append("X-CSCAPI-KEY", config.cKey);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  let statesList = [];
  try {
    const response = await fetch(config.cUrl, requestOptions);
    statesList = await response.json();
    return statesList;
  } catch (error) {
    console.log("error fetching states", error);
    throw error;
  }
}

export default fetchStates;
