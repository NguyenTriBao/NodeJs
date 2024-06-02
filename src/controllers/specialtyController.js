import specialtyService from '../sevices/specialtyService'
let createNewSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.createNewSpecialtyService(req.body)
        return res.status(200).json(
            response
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllSpecialties = async (req, res) => {
    try {
        let response = await specialtyService.getAllSpecialtiesService();
        return res.status(200).json(
            response
        )
    } catch (error) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getDetailSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.getDetailSpecialtyService(req.query.id, req.query.location);
        return res.status(200).json(
            response
        )
    } catch (error) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialties: getAllSpecialties,
    getDetailSpecialty: getDetailSpecialty,
}