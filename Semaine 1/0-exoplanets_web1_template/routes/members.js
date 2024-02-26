const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.session.login) {
        res.render('member/index.hbs', {session_login: req.session.login});
    }
    else {
        res.redirect('/users');
    }
});

module.exports = router;