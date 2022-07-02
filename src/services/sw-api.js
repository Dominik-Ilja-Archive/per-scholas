
// starships endpoint -> https://swapi.dev/documentation#starships

import axios from "axios";
const BASE_URL = "https://swapi.dev/api/";

export async function getAllStarships(endpoint) {
  endpoint = (typeof endpoint === "string") ? endpoint : `${BASE_URL}/starships/`;
  const { data } = await axios.get(endpoint);
  console.log(data);
  console.log(data.results);
  return data;
};
