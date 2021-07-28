const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const commentCtrl = require('../controllers/comment')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, postCtrl.createPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.get('/', auth, postCtrl.getAllPosts)
router.put('/:id', auth, multer, postCtrl.editPost)
router.delete('/:id', auth, postCtrl.deletePost)

module.exports = router