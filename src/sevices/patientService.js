import { Model, where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
require('dotenv').config();
import _, { includes, reject } from 'lodash';
import emailService from './emailService';

let postBookApointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email && !data.doctorId && !data.date && !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'fullname Patient',
                    time: 'time',
                    doctorName: "Nguyen Tri Bao",
                    redirectLink:"https://www.facebook.com/tribao05?locale=vi_VN"
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    });
                    resolve({
                        errCode: 0,
                        errMessage: 'save infor patinet succeed'
                    })
                } 
            }
        } catch (e) {
            reject(e);
        }
    })

}
module.exports = {
    postBookApointmentService: postBookApointmentService,
}