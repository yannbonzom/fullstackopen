import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

const create = (newContact) => {
  const req = axios.post(baseURL, newContact);
  return req.then((res) => res.data);
};

const deleteContact = (id) => {
  const req = axios.delete(`${baseURL}/${id}`);
  return req;
};

const updateNumber = (contact) => {
  const req = axios.put(`${baseURL}/${contact.id}`, contact);
  return req.then((res) => res.data);
};

const contactHandler = { getAll, create, deleteContact, updateNumber };
export default contactHandler;
