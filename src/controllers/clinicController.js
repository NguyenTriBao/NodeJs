import clinicService from "../sevices/clinicService"
let createNewClinic = async (req, res) => {
    try {
        let response = await clinicService.createNewClinicService(req.body)
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
let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinicService();
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
let getDetailClinic = async (req,res) => {
    try {
        let response = await clinicService.getDetailClinicService(req.query.id);
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
module.exports = {
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinic: getDetailClinic,
}