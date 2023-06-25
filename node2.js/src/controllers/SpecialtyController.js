import specialtyServices from "../services/specialtyServices";
let createNewSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.createNewSpecialty(req.body);
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyServices.getAllSpecialty();
    return res.status(200).json({ infor });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyServices.getDetailSpecialtyById(
      req.query.id,
      req.query.location
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
  createNewSpecialty: createNewSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
