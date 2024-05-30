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
module.exports = {
    createNewSpecialty: createNewSpecialty,
}