const token = require("../middleware/token");
const fs = require('fs');
const db = require('../models');
const { Post } = db.sequelize.models
const { User } = db.sequelize.models
const { comment } = db.sequelize.models
const { like } = db.sequelize.models

//create post
exports.createPost = async (req, res) => {
  const userId = token.getUserId(req);
  let imageUrl;
  try {
    const user = await db.User.findOne({
      attributes: ["firstName", "lastName", "id", "imageURL"],
      where: { id: userId },
    });
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } else {
        imageUrl = null;
      }
      const post = await db.Post.create({
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName", "id", "imageURL"],
          },
        ],
        content: req.body.content,
        fileUrl: imageUrl,
        idUser: user.id,
      });

      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};


//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ["id", "content", "fileUrl", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          attributes: ["firstName", "lastName", "id", "imageURL"],
        },
        {
          model: db.like,
          attributes: ["idUser"],
        },
        {
          model: db.comment,
          attributes: ["content","idUser", "id"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              attributes: ["imageURL", "firstName", "lastName"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};
// get one post 
exports.getOnePost = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          attributes: ["firstName", "lastName", "id", "imageURL"],
        },
        {
          model: db.like,
          attributes: ["idPost", "idUser", "id", "createdAt"],
          include: [
            {
              model: db.User,
              attributes: ["imageURL", "firstName", "lastName"],
            },
          ],
        },
        {
          model: db.comment,
          order: [["createdAt", "DESC"]],
          attributes: ["content", "idUser", "createdAt", "id",],
          include: [
            {
              model: db.User,
              attributes: ["imageURL", "firstName", "lastName"],
            },
          ],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//edit post 
exports.editPost = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserId(req);
    let post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.idUser) {
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        if (post.fileUrl) {
          const filename = post.fileUrl.split("/images")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: upload/${filename}`);
            }
          });
        }
      }
      if (req.body.content) {
        post.content = req.body.content;
      }
      post.fileUrl = newImageUrl;
      const newPost = await post.save({
        fields: ["content", "fileUrl"],
      });
      res.status(200).json({ newPost: newPost, messageRetour: "post modifié" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
//delete post
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.idUser || checkAdmin.admin === true) {
      if (post.fileUrl) {
        const filename = post.fileUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: "Post supprimé" });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: "Post supprimé" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//like and dislike post
exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const postId = req.params.id;
    const user = await db.like.findOne({
      where: { idUser: userId, idPost: postId },
    });
    if (user) {
      await db.like.destroy(
        { where: { idUser: userId, idPost: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
    } else {
      await db.like.create({
        idUser: userId,
        idPost: postId,
      });
      res.status(201).json({ messageRetour: "vous aimez ce post" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//add comment to post
exports.addComment = async (req, res) => {
  try {
    const comment = req.body.content;
    const newComment = await db.comment.create({
      content: comment,
      idUser: token.getUserId(req),
      idPost: req.params.id,
    });

    res
      .status(201)
      .json({ newComment, messageRetour: "votre commentaire est publié" });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//delete comment
exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.comment.findOne({ where: { id: req.params.id } });

    if (userId === comment.idUser || checkAdmin.admin === true) {
      db.comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: "commentaire supprimé" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};


