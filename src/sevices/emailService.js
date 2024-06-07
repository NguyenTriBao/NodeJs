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
let sendRemedyEmail = async (dataSend) =>{
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
            to: dataSend.email, // list of receivers
            subject: "Hoá đơn đặt lịch khám bệnh", // Subject line
            html:getbodyHTMLEmailRemedy(dataSend) ,
            attachments: [
                {   // encoded string as an attachment
                  filename: 'test.png',
                  content: dataSend.imgBase64.split("base64,")[1],
                  encoding: 'base64'
                }
              ]
        });
    
}
let getbodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
            <h3 style="color: #333;">Xin chào ${dataSend.patientName},</h3>
            <p style="color: #555;">Bạn nhận được email này vì bạn đã khám bệnh thành công trên webisite của chúng tôi.</p>
            <div style="margin-top: 20px; padding: 10px; border-top: 1px solid #eaeaea;">
                <h4 style="color: #333;">Thông tin hoá đơn khám bệnh</h4>
                <p style="color: #555;">Dưới đây là thông tin chi tiết về đơn thuốc và hóa đơn của bạn.</p>
                <!-- Add more details here as needed -->
            </div>
            <footer style="margin-top: 20px; text-align: center; color: #aaa;">
                <p>Website của chúng tôi | Liên hệ: support@ourwebsite.com</p>
            </footer>
        </div>`;
    }
    if (dataSend.language === 'en') {
        result = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
            <h3 style="color: #333;">Hello ${dataSend.patientName},</h3>
            <p style="color: #555;">You received this email because you booked a medical appointment online on our website.</p>
            <div style="margin-top: 20px; padding: 10px; border-top: 1px solid #eaeaea;">
                <h4 style="color: #333;">Remedy information</h4>
                <p style="color: #555;">Below are the details of your prescription and invoice.</p>
                <!-- Add more details here as needed -->
            </div>
            <footer style="margin-top: 20px; text-align: center; color: #aaa;">
                <p>Our Website | Contact: support@ourwebsite.com</p>
            </footer>
        </div>`;
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendRemedyEmail: sendRemedyEmail,
}