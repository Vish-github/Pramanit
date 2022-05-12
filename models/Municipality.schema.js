const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtkey = "mykey";

const municipalitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  addressLine3: {
    type: String,
  },
  code: {
    type: String,
  },
  pincode: {
    type: String,
  },
  accessToken: {type: String},
  resetToken: {type: String},
});

municipalitySchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, jwtkey, {
    expiresIn: "7d",
  });
  return token;
};

global.Municipality =
  mongoose.models.Municipality ||
  mongoose.model("Municipality", municipalitySchema);

export default global.municipalitySchema;
