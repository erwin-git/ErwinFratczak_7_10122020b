const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const commentCtrl = require('../controllers/comment')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')



router.post('/comment', commentCtrl.createComment)
router.get('/comment/:id', commentCtrl.getOneComment)
router.get('/comment/', commentCtrl.getAllComments)
router.put('/comment/:id', commentCtrl.editComment)
router.delete('/comment/:id', commentCtrl.deleteComment)

module.exports = router