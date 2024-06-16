const { ctrl } = require('../controllers/users.controller');

const router = require('express').Router();

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

module.exports = router;