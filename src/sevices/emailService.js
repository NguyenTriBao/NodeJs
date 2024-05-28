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
        html:getbodyHTMLEmail(dataSend) 
        
       
    });

}
let getbodyHTMLEmail = (dataSend) =>{
    let result = ''
    if(dataSend.language === 'vi'){
        result =  `<h3>Xin chào ${dataSend.patientName}</h3>
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
        <div>Xin chân thành cảm ơn</div>`;
    }
    if(dataSend.language === 'en'){
        result =  `<h3>Hello ${dataSend.patientName}</h3>
        <p>You received this email because you booked a medical appointment online on our website.</p>
        <p>Appointment booking information:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>
            If the above information is correct, please click the link below to confirm and complete the booking process.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target='_blank'>Click Here</a>
        </div>
        <div>Thank you very much</div>
        `;
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}