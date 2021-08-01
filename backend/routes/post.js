const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, postCtrl.createPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.get('/', auth, postCtrl.getAllPosts)
router.put('/:id', auth, multer, postCtrl.editPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.post("/:id/like", auth, postCtrl.likePost);
router.post("/:id/comment", auth, postCtrl.addComment);
router.delete("/comment/:id", auth, postCtrl.deleteComment);


module.exports = router