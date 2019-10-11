const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWTPRIVATEKEY);
  return token;
}

const User = mongoose.model('User', userSchema);

function validate(planet) {
  const schema = {
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
  };
  return Joi.validate(planet, schema);
}

module.exports = {
  User,
  validate,
};
