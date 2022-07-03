import axios from "axios";

const BASE_URL = "https://api.randomuser.me/";

async function fetchUser() {
  const { data } = await axios.get(BASE_URL);

  return data;
}

export default fetchUser;
