const { reject } = require("lodash")
import db from '../models/index';
let createNewSpecialtyService = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                    errCode : 1,
                    errMessage:"Missing required parameters!"
                })
            }
            else{
                await db.Specialty.create({
                    name : data.name,
                    image : data.imageBase64,
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
    return new Promise(async(resolve, reject) =>{
        try {
            let data = await db.Specialty.findAll();
            data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
            })
            resolve({
                errCode: 0,
                errMessage:"Ok",
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewSpecialtyService: createNewSpecialtyService,
    getAllSpecialtiesService: getAllSpecialtiesService,
}