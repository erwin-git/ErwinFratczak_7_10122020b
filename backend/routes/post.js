const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const commentCtrl = require('../controllers/comment')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', /*auth,*/ multer, postCtrl.createPost)
router.get('/:id', /*auth,*/ postCtrl.getOnePost)
router.get('/', /*auth,*/ postCtrl.getAllPosts)
router.put('/:id', /*auth,*/ multer, postCtrl.editPost)
router.delete('/:id', /*auth,*/ postCtrl.deletePost)

router.post('/:idPost/comment', /*auth,*/ commentCtrl.createComment)
router.get('/comment/:id', /*auth,*/ commentCtrl.getOneComment)
router.get('/:idPost/comment/', /*auth,*/ commentCtrl.getAllComments)
router.put('/:idPost/comment/:id', /*auth,*/ commentCtrl.modifyComment)


module.exports = router