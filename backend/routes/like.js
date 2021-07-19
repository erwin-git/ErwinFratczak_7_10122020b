const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const likeCtrl = require('../controllers/like')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')



router.post('/like', likeCtrl.createLike)
router.get('/like/:id', likeCtrl.getOneLike)
router.get('/like/', likeCtrl.getAllLikes)


module.exports = router 