import db from "../models"
let createNewHandbookService = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.title || !data.descriptionHTML || !data.descriptionMarkdown
                || !data.authorId || !data.imageBase64
            ){
                resolve({
                    errCode : 1,
                    errMessage: 'Missing parameters!'
                })
            }else{
                await db.Handbook.create({
                    title: data.title,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    authorId: data.authorId,
                    image: data.imageBase64
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
let getAllHandbookService = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll();
            data.map(item => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
            })
            resolve({
                errCode : 0,
                data: data
            })
            
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewHandbookService: createNewHandbookService,
    getAllHandbookService: getAllHandbookService,
}