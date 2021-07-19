const db = require('../models');
const { comment } = db.sequelize.models


exports.createComment = async (req, res, next) => {
  try {
    let Comment = await comment.create({
      ...req.body,
      idPost: req.params.postId,
    })

    res.status(201).json({ Comment })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}
exports.getOneComment = (req, res, next) => {
  comment.findOne({ where: { id: req.params.id }, include: db.User })
    .then(comment => res.status(200).json({ comment }))
    .catch(error => res.status(404).json({ error }))
}

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

exports.editComment = (req, res, next) => {
  const commentObject = req.file ?
      {
      ...JSON.parse(req.body.post),
      fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
  comment.update({ ...commentObject, _id: req.params.id }, {where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.deleteComment = (req, res, next) => {
  comment.findOne({ id: req.params.id })
  .then(post => {
      comment.destroy({ where: { id: req.params.id }, })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      
  })
  .catch(error => res.status(500).json({ error }));
};


