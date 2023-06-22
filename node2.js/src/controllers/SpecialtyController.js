import SpecialtyServices from "../services/SpecialtyServices";
let createNewSpecialty = async (req, res) => {
  try {
    let infor = await SpecialtyServices.createNewSpecialty(req.body);
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
};
