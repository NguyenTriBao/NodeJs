require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Bao Nguyen 👻" <tribao5102002@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `<h3>Xin chào ${dataSend.patientName}</h3>
          <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website của chúng tôi</p>
          <p>Thông tin đặt lịch khám bệnh:</p>
          <div><b>Thời gian: ${dataSend.time}</b></div>
          <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
          <p>
              Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh
          </p>
          <div>
              <a href=${dataSend.redirectLink} target='_blank'>Click Here</a>
          </div>
          <div>Xin chân thành cảm ơn</div>`, // html body
    });

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}