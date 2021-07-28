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
    }); // on vérifie que l'adresse mail figure bien dan la bdd
    if (user === null) {
      return res.status(403).send({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
      if (!hash) {
        return res.status(401).send({ error: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.status(200).send({
          // on renvoie le user et le token
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
  // on trouve l'utilisateur et on renvoie l'objet user
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
    let user = await db.User.findOne({ where: { id: id } }); // on trouve le user
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
















/*
  exports.login = async (req, res, next) => {
    try {
      const response = await User.authenticate(req.body.email, req.body.password)
  
      if (response.valid) {
        res.status(201).json(newToken(response.user))
      } else {
        res.status(401).json({ error: response.message })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.editUser = (req, res, next) => {
    try {
      const userObject = req.file
        ? {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`
          }
        : { ...req.body }
  
      console.log(userObject)
      req.user.update(userObject).then(user => res.status(200).json({ user }))
    } catch (error) {
      res.status(400).json({ error })
    }
  }

exports.deleteUser = (req, res, next) => {
    User.findOne({ id: req.params.id })
    .then(user => {
        User.destroy({ where: { id: req.params.id }, })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        
    })
    .catch(error => res.status(500).json({ error }));
};

*/


