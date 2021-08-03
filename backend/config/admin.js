//create admin user when server start
const db = require("../models");
const bcrypt = require("bcrypt");
function setAdmin(req, res) {
  db.User.findOne({ where: { email: "admin@mail.com" } || { firstName: "admin" } || { lastName: "admin" } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash("Moderator2021!", 10)
          .then((hash) => {
            const admin = db.User.create({
              firstName: "admin",
              lastName: "admin",
              email: "admin@mail.com",
              password: hash,
              admin: true,
            })
              .then((admin) => {
                console.log({
                  admin,
                  message: `Votre compte admin est bien créé ${admin.firstName} !`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "l'admin est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setAdmin();
