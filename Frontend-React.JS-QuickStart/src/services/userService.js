import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log("check data from services: ", data);
  return axios.post(`/api/create-new-user`, data);
};
const DeleteUserService = (userId) => {
  // return axios.delete("/api/delete-user", { id: userId });
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put(`/api/edit-user`, inputData);
};
let getAllCodeService = (inputtype) => {
  return axios.get(`/api/allcode?type=${inputtype}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  DeleteUserService,
  editUserService,
  getAllCodeService,
};
