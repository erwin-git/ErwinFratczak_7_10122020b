const bcrypt = require("bcrypt");
const token = require("../middleware/token");
const db = require('../models');
const fs = require("fs");
const Sequelize = db.Sequelize
const { User } = db.sequelize.models


exports.signup = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (user !== null) {
      if (user.email === req.body.email) {
        return res.status(400).json({ error: "ce EMAIL est déjà utilisé" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        admin: false,
      });

      const tokenObject = await token.issueJWT(newUser);
      res.status(201).send({
        user: newUser,
        token: tokenObject.token,
        expires: tokenObject.expiresIn,
        message: `Votre compte est bien créé ${newUser.firstName} !`,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "email déjà utilisé" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    }); 
    if (user === null) {
      return res.status(403).send({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
      if (!hash) {
        return res.status(401).send({ error: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.status(200).send({
         
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
          message: "Bonjour " + user.firstName + " !",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};


exports.getOneUser = async (req, res) => {
  
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.getAllUsers = (req, res, next) => {
  User.findAll({
    attributes: ["imageURL", "firstName", "lastName",  "email"],
  })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
};

exports.editUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userId = token.getUserId(req);
    let newPhoto;
    let user = await db.User.findOne({ where: { id: id } }); 
    if (userId === user.id) {
      if (req.file && user.imageURL) {
        newPhoto = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        const filename = user.imageURL.split("/images")[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`Deleted file: images/${filename}`);
          }
        });
      } else if (req.file) {
        newPhoto = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      if (newPhoto) {
        user.imageURL = newPhoto;
      }
      if (req.body.biography) {
        user.biography = req.body.biography;
      }
      if (req.body.firstName) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      const newUser = await user.save({ fields: ["firstName","lastName", "biography", "imageURL"] });
      res.status(200).json({
        user: newUser,
        messageRetour: "Votre profil a bien été modifié",
      });
    } else {
      res
        .status(400)
        .json({ messageRetour: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
// add token!
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userId = token.getUserId(req);
    let user = await db.User.findOne({ where: { id: id } });
    if (userId === user.id) {
        const user = await db.User.findOne({ where: { id: id } });
        if (user.imageURL !== null) {
          const filename = user.imageURL.split("/images")[1];
          fs.unlink(`images/${filename}`, () => {
            db.User.destroy({ where: { id: id } });
            res.status(200).json({ message: "utilisateur supprimé" });
          });
        } else {
          db.User.destroy({ where: { id: id } });
          res.status(200).json({ message: "utilisateur supprimé" });
        }
    } else {
      res
        .status(400)
        .json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};



