import patientService from '../sevices/patientService';

let postBookApointment = async (req, res) => {
    try {
        let response = await patientService.postBookApointmentService(req.body)
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
let verifyBookApointment = async (req, res) => {
    try {
        let response = await patientService.verifyBookApointmentService(req.body)
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
    postBookApointment: postBookApointment,
    verifyBookApointment: verifyBookApointment,
}