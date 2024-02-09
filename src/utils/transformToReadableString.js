function transformToReadableString(inputString) {
  const stringsArray = inputString.split(" ");
  const capitalizeStrings = stringsArray.map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return capitalizeStrings.join(" ");
}

export default transformToReadableString;
