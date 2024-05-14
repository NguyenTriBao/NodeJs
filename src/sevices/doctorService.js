import { Model, where } from 'sequelize';
import db from '../models/index';

let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allcode = await db.Allcode;
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'], 
                },
                include: [
                    { model: allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,

            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }


    })
}

module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
}