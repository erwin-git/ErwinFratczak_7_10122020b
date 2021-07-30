const express = require('express')
const router = express.Router()


const likeCtrl = require('../controllers/like')

const auth = require('../middleware/auth')




//router.post('/like', auth, likeCtrl.likePost)
//router.get('/like/:id', auth, likeCtrl.getOneLike)
//router.get('/like/', auth, likeCtrl.getAllLikes)


module.exports = router 