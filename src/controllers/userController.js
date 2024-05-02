import userService from "../sevices/userService";

let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!',
        })
    }

    let userData = await userService.handleLogin(email,password);
    // check email exist
    // compare password
    // access_token:JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async(req, res) => {
    let id = req.query.id; //All, Single
    
    if(!id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter!',
            users: []
        });
    }
    let users = await userService.GetAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users,
    })
}
let handleCreateNewUser = async(req,res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters!'
        })
    }
    let message = await userService.editUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUser = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters!'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}