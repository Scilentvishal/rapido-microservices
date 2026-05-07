const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.post('/profile', authMiddleware, userController.getProfile);

module.exports = router;