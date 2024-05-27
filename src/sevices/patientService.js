import { Model, where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
require('dotenv').config();
import _, { includes, reject } from 'lodash';

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