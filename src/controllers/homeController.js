import db from '../models/index';
import CRUDService from '../sevices/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    //console.log(message);
    return res.send("post srud form sever");
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("display-crud.ejs", {
        dataTable: data,
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //Check user data not found
        //let userData
        return res.render("edit-crud.ejs", {
            user: userData,
        });
    }
    else {
        return res.send('User not found');
    }
}
let putCRUD = async (req, res) => {
    let userData = req.body;
    let data = await CRUDService.updateUserData(userData);
    return res.render("display-crud.ejs", {
        dataTable: data,
    });
}
let getDeleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserData(id);
        return res.send("Delete successed!");
    }
    else{
        return res.send("User not found");
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    getDeleteCRUD: getDeleteCRUD,
}
