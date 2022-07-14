import React from "react";

export default function FetchData({ pageNumber, storeFetchedData }) {
  const ApiKey = "d2b2d694985de647dd765ec7cfac2568";
  const baseURL = "https://api.themoviedb.org/3/";
  let url = "".concat(
    baseURL,
    "discover/movie?api_key=",
    ApiKey,
    "&sort_by=popularity.desc&include_adult=false&page=",
    pageNumber
  );
  let movieData = [];
  
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      movieData = data;
    });
  return (
    <div>
      <button onClick={() => storeFetchedData(movieData)}>Fetch Data!</button>
    </div>
  );
}
