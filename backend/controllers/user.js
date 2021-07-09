const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models');
const { User } = db.sequelize.models


exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
                )
            });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.body.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
};


exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.editUser = (req, res, next) => {
    const userObject = req.file ?
        {
        ...JSON.parse(req.body.User),
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    //User.update({ _id: req.params.id }, )
    User.update({ ...userObject, _id: req.params.id }, {where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
};


exports.deleteUser = (req, res, next) => {
    User.findOne({ id: req.params.id })
    .then(user => {
        User.destroy({ where: { id: req.params.id }, })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        
    })
    .catch(error => res.status(500).json({ error }));
};




