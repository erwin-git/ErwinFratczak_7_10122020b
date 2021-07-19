const fs = require('fs');
const db = require('../models');
const { Post } = db.sequelize.models

exports.createPost = async (req, res, next) => {
    let postObject = req.body
  
    if (req.file) {
      postObject = JSON.parse(req.body.post)
      postObject.fileUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`
    }
  
    try {
      let post = await Post.create({ ...postObject, _id: req.params.id }, {where: { id: req.params.id }})
  
      post = await Post.findOne({ where: { id: post.id }, include: db.User })
  
      res.status(201).json({ post })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }


exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.User
      }
    ]
  })
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error }))
  }


  exports.getAllPosts = (req, res, next) => {
    Post.findAll({
      include: [
        {
          model: db.User
        }
      ],
      order: [['createdAt', 'DESC']]
    })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.editPost = (req, res, next) => {
  const postObject = req.file ?
      {
      ...JSON.parse(req.body.post),
      fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
  Post.update({ ...postObject, _id: req.params.id }, {where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.deletePost = (req, res, next) => {
  Post.findOne({ id: req.params.id })
  .then(post => {
      Post.destroy({ where: { id: req.params.id }, })
          .then(() => res.status(200).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      
  })
  .catch(error => res.status(500).json({ error }));
};

