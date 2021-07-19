const db = require('../models');
const { like } = db.sequelize.models



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