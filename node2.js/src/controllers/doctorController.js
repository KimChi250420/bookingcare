import { json } from "body-parser";
import doctorServices from "../services/doctorServices";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorServices.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let postInforDoctors = async (req, res) => {
  try {
    let response = await doctorServices.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetaiDoctorsById = async (req, res) => {
  try {
    let infor = await doctorServices.getDetaiDoctorsById(req.query.id);
    return res.status(200).json({
      infor,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorServices.bulkCreateSchedule(req.body);
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getScheduleDoctorByDate = async (req, res) => {
  try {
    let infor = await doctorServices.getScheduleDoctorByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getExtraDoctorById = async (req, res) => {
  try {
    let infor = await doctorServices.getExtraDoctorById(req.query.doctorId);
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorServices.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorServices.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctors: postInforDoctors,
  getDetaiDoctorsById: getDetaiDoctorsById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getExtraDoctorById: getExtraDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
};
