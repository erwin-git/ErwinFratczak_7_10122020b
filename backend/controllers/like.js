/*const token = require("../middleware/token");
const fs = require('fs');
const db = require('../models');
const { Post } = db.sequelize.models
const { User } = db.sequelize.models
const { comment } = db.sequelize.models
const { like } = db.sequelize.models

exports.likePost = async (req, res, next) => {
  try {
    const UserId = token.getUserId(req);
    const PostId = req.params.id;
    const user = await db.like.findOne({
      where: { idUser: UserId, idPost: PostId },
    });
    if (user) {
      await db.like.destroy(
        { where: { idUser: UserId, idPost: PostId } },
        //{ truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "vous n'aimez plus ce post" });
    } else {
      await db.like.create({
        idUser: UserId,
        idPost: PostId,
      });
      res.status(201).json({ messageRetour: "vous aimez ce post" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
*/

/*
exports.createLike = async (req, res, next) => {
  try {
    let Like = await like.findOne({
      ...req.body,
      where: { idUser: req.body.idUser, idPost: req.body.idPost },
      
    })

    if (Like){
      await Like.destroy()
      res.status(200).json({ Like: false })
    } else{
      await like.create({...req.body, where: { id: req.params.id }})
      res.status(201).json({ Like: true })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}


exports.getOneLike = (req, res, next) => {
  like.findOne({ where: { id: req.params.id }, 
    include: db.User
  })
    .then(like => res.status(200).json({ like }))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllLikes = (req, res, next) => {
  like.findAll({
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
*/