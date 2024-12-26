const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authMiddleware, authController.protectedData);
router.post('/edit-profile', authMiddleware, userController.editProfile);
router.post('/change-password', authMiddleware, userController.changePassword);
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;