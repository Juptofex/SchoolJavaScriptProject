const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('members/index.hbs', {userFound: req.session.user});
    }
    else {
        res.redirect('/users');
    }
});

module.exports = router;