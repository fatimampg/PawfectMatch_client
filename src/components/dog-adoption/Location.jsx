const Location = ({
  selectedCountry,
  setSelectedCountry,
  countries,
  setSelectedCountryIso2,
  selectedState,
  setSelectedState,
  states,
  setSelectedStateIso2,
  selectedCity,
  setSelectedCity,
  cities,
}) => {
  return (
    <div className="location">
      <label htmlFor="countries">
        <select
          className="custom-select-option w-[20rem]"
          id="countries"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            const countryIso2 = countries.find(
              (country) => country.name === e.target.value,
            )?.iso2;
            setSelectedCountryIso2(countryIso2);
          }}
        >
          <option value="" disabled defaultValue>
            Country
          </option>
          {countries.map((country) => (
            <option key={country.id}>{country.name}</option>
          ))}
        </select>
      </label>

      <label htmlFor="states">
        <select
          className="custom-select-option w-[20rem]"
          id="states"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            const stateIso2 = states.find(
              (state) => state.name === e.target.value,
            )?.iso2;
            setSelectedStateIso2(stateIso2);
          }}
        >
          <option value="" disabled defaultValue>
            State
          </option>
          <option key="allStates">All</option>
          {states.map((state) => (
            <option key={state.id}>{state.name}</option>
          ))}
        </select>
      </label>

      <label htmlFor="cities">
        <select
          className="custom-select-option w-[20rem]"
          id="cities"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
        >
          <option value="" disabled defaultValue>
            City
          </option>
          <option key="allCities">All</option>
          {cities.map((city) => (
            <option key={city.id}>{city.name}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Location;
