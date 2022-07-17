
export function fetchData(pageNumber) {
  const ApiKey = "d2b2d694985de647dd765ec7cfac2568";
  const baseURL = "https://api.themoviedb.org/3/";
  let url = "".concat(
    baseURL,
    "discover/movie?api_key=",
    ApiKey,
    "&sort_by=popularity.desc&include_adult=false&page=",
    pageNumber
  );

  return fetch(url)
}

