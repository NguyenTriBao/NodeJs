import handbookService from '../sevices/handbookService';
let createNewHandbook = async (req, res) => {
    try {
        let response = await handbookService.createNewHandbookService(req.body)
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
let getAllHandbook = async (req, res) => {
    try {
        let response = await handbookService.getAllHandbookService()
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
    createNewHandbook: createNewHandbook,
    getAllHandbook: getAllHandbook,
}