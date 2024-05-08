import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
} 

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    where: { email: email }
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Ok`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            }
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Pls try other email!`;
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            console.log('user '.userEmail);
            if (user) {
                
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let GetAllUsers = (userId) => {
    return new Promise (async(resolve, reject) => {
        try {
            let users = '';
            if(userId === 'All'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            if(userId && userId !== 'All'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            //check email is exist???
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email already is used, plz try another email'
                })
            }
            else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId
                })
                resolve({
                        errCode: 0,
                        message: 'OK'
                })
            }
           
        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise (async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: `the user isn't exist`
                })
            }
                await db.User.destroy({
                    where: {id: userId}
                })
                resolve({
                    errCode: 0,
                    errMessage: 'the user is Deleted'
                })
        } catch (e) {
            reject(e);
        }
      
    });
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'User update successed!'
                })
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    handleLogin: handleLogin,
    GetAllUsers: GetAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
}