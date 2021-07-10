const db = require('../models');
const { comment } = db.sequelize.models


exports.createComment = async (req, res, next) => {
  try {
    let Comment = await comment.create({
      ...req.body,
      postId: req.params.postId,
    })

    res.status(201).json({ Comment })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

exports.getOneComment = (req, res, next) => {
  comment.findOne({ _id: req.params.id })
  .then(Comment => res.status(200).json(Comment))
  .catch(error => res.status(404).json({ error }))
};


exports.getAllComments = (req, res, next) => {
  comment.findAll({
    include: [
      {
        model: db.User
      }
    ],
    order: [['createdAt', 'DESC']]
  })
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  const commentObject = req.file ?
      {
      ...JSON.parse(req.body.post),
      fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
  comment.update({ ...commentObject, _id: req.params.id }, {where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

















/*
exports.getOneComment = (req, res, next) => {
  comment.findOne({
    ...req.body,
    idPost: req.params.idPost,
    include: [
      {
        model: db.User
      }
    ]
  })
    .then(Comment => res.status(200).json({ Comment }))
    .catch(error => res.status(404).json({ error }))
  }


  exports.getAllComments = (req, res, next) => {
    const options = {
      where: { idPost: req.params.idPost },
      include: db.User,
      order: [['createdAt', 'ASC']]
    }
  
    if (req.query.limit) {
      options.order = [['createdAt', 'DESC']]
      options.limit = parseInt(req.query.limit)
    }
  
    comment.findAndCountAll(options)
      .then(comment => {
        res.status(200).json({ comment })
      })
      .catch(error => res.status(400).json({ error }))
  }
  */