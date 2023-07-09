require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kim Chi 👻" <kimchi29042023@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = ``;
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đặt lịch khám bệnh online trên Kim Chi</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin đúng sự thật, vui lòng click vào đường link bên dưới
    để xác nhận và hoàn thành tất cả thủ tục đặt lịch khám bệnh</p>
    <div>
    <a href=${dataSend.redirectLink} target="_black">Click here</a>
    </div>
    <div> Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on Kim Chi</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the information is true, please click on the link below
    to confirm and complete all medical appointments</p>
    <div>
    <a href=${dataSend.redirectLink} target="_black">Click here</a>
    </div>
    <div> Thank you!</div>
    `;
  }
  return result;
};
let getBodyHTMLEmailRemedy = (dataSend) =>{
  let result = ``;
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đặt lịch khám bệnh online trên Kim Chi thành công</p>
    <p>Thông tin đơn thuốc/hóa đơn gửi file đi kèm</p>
    
    <div> Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you have successfully booked an online medical appointment on Kim Chi</p>
    <p>
    Prescription information/invoice attached file</p>
    
    <div> Thank you!</div>
    `;
  }
  return result;
}
let sendAllAttachment = (dataSend) => {
  return new Promise (async(resolve,reject) => {
    try{

   
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Kim Chi 👻" <kimchi29042023@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: "Thông tin đặt lịch khám bệnh", // Subject line
      text: "Hello world?", // plain text body
      html: getBodyHTMLEmailRemedy(dataSend), // html body
      attachments: [
        {   // define custom content type for the attachment
          filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
          content: dataSend.imgBase64.split("base64,")[1],
          encoding: "base64"
      },
      ]
    });
    console.log("check email")

    resolve({

    })
  }catch(e){
    reject(e)
  }
  })
 
}
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAllAttachment:sendAllAttachment,
};
