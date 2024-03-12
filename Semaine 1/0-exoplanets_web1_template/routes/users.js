const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require ('bcrypt');
const saltRounds = 10;
const validator = require ('validator');

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/members');
    }
    else {
        res.render('users/index.hbs', {error: req.session.errors});
        req.session.errors=null;
    }
});

router.post('/login', (req, res) => {
    const session_login=req.body.member_login;
    console.log(req.body);
    userFound = Users.find(req.body.member_login);
    console.log(userFound);
    if (userFound===undefined) {
        req.session.errors = "Email inconnu !"
        res.redirect('/users')
    }
    else {
        if (bcrypt.compareSync(req.body.member_password, userFound.password)) {
            console.log(session_login);
            req.session.user=userFound;
            res.render('members/index.hbs', {userFound});
        } 
        else {
            req.session.errors = "Mot de passe erroné !"
            res.redirect('/users');
        }
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/users');
});

router.get('/register', (req, res) => {
    res.render('users/register.hbs', {errors: req.session.errors});
    req.session.errors=null;
});

router.post('/sign_in', (req, res) => {
    req.session.errors=[];
    if (!validator.isLength(req.body.name, 3)) {
        req.session.errors.push('Le nom doit avoir 3 caractères au minimum');
    }
    if (!validator.isAlphanumeric(req.body.name)) {
        req.session.errors.push('Le nom doit contenir uniquement des caractères alphanumériques')
    }
    if (!validator.isLength(req.body.firstname, 3)) {
        req.session.errors.push('Le prénom doit avoir 3 caractères au minimum')
    }
    if (!validator.isAlphanumeric(req.body.firstname)) {
        req.session.errors.push('Le prénom doit contenir uniquement des caractères alphanumériques')
    }
    if (!validator.isEmail(req.body.email)) {
        req.session.errors.push('L\'email doit être un email correct')
    }
    if (req.session.errors!==null) {
        res.redirect('/users/register')
    }
    else {
        const encryptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        Users.add(req.body.name, req.body.firstname, req.body.email, encryptedPassword);
        res.redirect('/users');
    }
});

module.exports = router;