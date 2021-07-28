const express = require('express')
const router = express.Router()


const commentCtrl = require('../controllers/comment')

const auth = require('../middleware/auth')



router.post('/comment',auth, commentCtrl.createComment)
router.get('/comment/:id',auth, commentCtrl.getOneComment)
router.get('/comment/',auth, commentCtrl.getAllComments)
router.put('/comment/:id',auth, commentCtrl.editComment)
router.delete('/comment/:id',auth, commentCtrl.deleteComment)

module.exports = router