const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET all users
router.get('/', userController.getAllUsers);

// GET a single user by id
router.get('/:id', userController.getUserById);

// POST a new user
router.post('/', userController.createUser);

// PUT update a user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

module.exports = router;