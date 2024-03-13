import axios from "axios";
const baseUrl = "/api/login";

const login = async ({ username, password }) => {
  try {
    const request = await axios.post(baseUrl, { username, password });
    return request.data;
  } catch (error) {
    throw error.response;
  }
};

export default { login };
