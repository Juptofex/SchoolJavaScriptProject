const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('users/index.hbs');
});

router.post('/login', (req, res) => {
    const session_login=req.body.member_login;
    if (req.body.member_password=='js') {
        console.log(session_login);
        res.render('members.hbs', {session_login});
    }
    else {
        res.redirect('/users');
    }
});

module.exports = router;