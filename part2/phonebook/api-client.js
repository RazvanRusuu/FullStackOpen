import axios from "axios";

const API_URL = "http://localhost:3001/api/persons";

const getPersons = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPerson = async (person) => {
  try {
    const response = await axios.post(API_URL, person);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updatePerson = async (person) => {
  console.log(person);
  try {
    const response = await axios.put(`${API_URL}/${person.id}`, person);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getPersons, createPerson, updatePerson, deletePerson };
