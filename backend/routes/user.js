const express = require('express');
const router = express.Router();

const limiter = require('../middleware/express-rate-limit-config');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.get('/:id',/* auth,*/ userCtrl.getOneUser);
router.get('/', /*auth,*/ userCtrl.getAllUsers);
router.put('/edit/:id', /*auth,*/ multer, userCtrl.editUser)
router.delete('/:id', /*auth,*/ userCtrl.deleteUser);








module.exports = router;