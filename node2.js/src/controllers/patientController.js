import patientServices from "../services/patientServices";
let patientBookAppointment = async (req, res) => {
  try {
    let response = await patientServices.patientBookAppointment(req.body);
    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let verifyBookAppointment = async (req, res) => {
  try {
    let response = await patientServices.verifyBookAppointment(req.body);
    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  patientBookAppointment: patientBookAppointment,
  verifyBookAppointment: verifyBookAppointment,
};
