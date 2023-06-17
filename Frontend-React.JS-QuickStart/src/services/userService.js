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
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorServices = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctors-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-doctor-by-id?doctorId=${doctorId}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  DeleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorServices,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraDoctorById,
};
