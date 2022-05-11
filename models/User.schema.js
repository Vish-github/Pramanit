const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtkey = "mykey";
const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "username is empty"],
  },
  email: {
    type: "string",
    required: [true, "email is empty"],
  },
  password: {
    type: "string",
    required: [true, "password is empty"],
  },
  birthIpfsHash: {
    type: "string",
    default: "",
  },
  birthTransactionId: {
    type: "string",
    default: "",
  },
  deathIpfsHash: {
    type: "string",
    default: "",
  },
  deathTransactionId: {
    type: "string",
    default: "",
  },
  accessToken: {type: String},
  resetToken: {type: String},
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, jwtkey, {
    expiresIn: "7d",
  });
  return token;
};
// const User = mongoose.model("User", userSchema);
global.User = global.User || mongoose.model("User", userSchema);

export default global.User;
