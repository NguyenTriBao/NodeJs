import clinic from '../models/clinic';
import db from '../models/index';

let createNewClinicService = (data) =>  {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name ||!data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!"
                })
            }
            else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    address: data.address,
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
let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
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
let getDetailClinicService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!"
                })
            }
            else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                });
                if(data){
                    let doctorClinic
                        doctorClinic = await db.Doctor_Infor.findAll({
                            where:{clinicId : inputId
                            },
                            attributes: ['doctorId', 'clinicId']
                        })
                    data.doctorClinic = doctorClinic
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
    createNewClinicService: createNewClinicService,
    getAllClinicService: getAllClinicService,
    getDetailClinicService,getDetailClinicService
}