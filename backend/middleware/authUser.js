const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

exports.valid = (req, res, next) => {
  
  const passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(20) // Maximum length 20
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .has()
    .symbols(); // Has no symbols
  //.has().not().spaces()
  // Should not have spaces is a wrong rule to apply

  if (
    !emailValidator.validate(req.body.email) ||
    !passwordSchema.validate(req.body.password)
  ) {
    return res.status(400).send({
      error:
        "Merci de vérifier ton adresse mail, ton mot de passe doit contenir au minum 8 lettres avec des minuscules et majuscules  ",
    });
  } else if (
    emailValidator.validate(req.body.email) ||
    passwordSchema.validate(req.body.password)
  ) {
    next();
  }
};

exports.firstNameVerif = (req, res, next) => {
  
  const regex = /^[a-zA-Z]{3,30}$/; 
  const firstName = req.body.firstName;
  if (regex.test(firstName) === true) {
    next();
  } else {
    return res.status(400).send({
      error:
        "Votre FIRSTNAME doit être de 3 caractères minimum et 30 maximum, sont acceptées les lettres, chiffres et underscore (_)  ",
    });
  }
};

exports.lastNameVerif = (req, res, next) => {
  
  const regex = /^[a-zA-Z]{3,30}$/; 
  const lastName = req.body.lastName;
  if (regex.test(lastName) === true) {
    next();
  } else {
    return res.status(400).send({
      error:
        "Votre LASTNAME doit être de 3 caractères minimum et 30 maximum, sont acceptées les lettres, chiffres et underscore (_)  ",
    });
  }
};
