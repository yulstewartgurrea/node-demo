const express = require('express');

const userController = require('../controllers/users')

const router = express.Router();

router.get('', userController.getUsers);
router.get('/:user_id', userController.getUser);
router.post('', userController.createUsers);
router.put('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;