const { reject } = require("lodash")
import { where } from 'sequelize';
import db from '../models/index';
let createNewSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!"
                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialtiesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            data.map(item => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
            })
            resolve({
                errCode: 0,
                errMessage: "Ok",
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailSpecialtyService = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!"
                })
            }
            else {
                let data = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                });
                if(data){
                    let doctorSpecialty
                    if(location === 'All'){
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where:{specialtyId : inputId},
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    else{
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where:{specialtyId : inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
                }
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data: data
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewSpecialtyService: createNewSpecialtyService,
    getAllSpecialtiesService: getAllSpecialtiesService,
    getDetailSpecialtyService: getDetailSpecialtyService
}