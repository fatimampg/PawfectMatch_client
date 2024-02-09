import fetchCountries from "./fetchCountries";
import fetchStates from "./fetchStates";
import fetchCities from "./fetchCities";

import { useState, useEffect } from "react";

export const useLocationData = (selectedCountryIso2, selectedStateIso2) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);

      if (selectedCountryIso2) {
        const statesData = await fetchStates(selectedCountryIso2);
        setStates(statesData);
      }

      if (selectedCountryIso2 && selectedStateIso2) {
        const citiesData = await fetchCities(
          selectedCountryIso2,
          selectedStateIso2,
        );
        setCities(citiesData);
      }
    };

    fetchData();
  }, [selectedCountryIso2, selectedStateIso2]);

  return { countries, states, cities };
};
