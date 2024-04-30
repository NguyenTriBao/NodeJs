import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('Create a new user succeed');
        } catch (e) {
            reject(e);
        }
    });

}
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
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            }
            else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userData.id },
            });
            if (user) {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.address = userData.address;
                await user.save();
                let users = await db.User.findAll();
                resolve(users);
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}
let deleteUserData = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await db.User.findOne({
            //     where: { id: userId },
            // });
            // if(user){
            //     await user.destroy();
            // }
            await db.User.destroy({
                    where: { id: userId },
                });
                
            resolve();
          
        } catch (e) {
            reject(e);
        }
    });


}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}