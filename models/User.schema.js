const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtkey = "mykey";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: [true, "username is empty"],
  },
  email: {
    type: String,
    // required: [true, "email is empty"],
  },
  password: {
    type: String,
    // required: [true, "password is empty"],
  },
  birthIpfsHash: {
    type: String,
    default: "",
  },
  birthTransactionId: {
    type: String,
    default: "",
  },
  deathIpfsHash: {
    type: String,
    default: "",
  },
  deathTransactionId: {
    type: String,
    default: "",
  },
  accessToken: {type: String},
  resetToken: {type: String},
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtkey, {
    expiresIn: "7d",
  });
  return token;
};

global.User = mongoose.models.User || mongoose.model("User", userSchema);

export default global.User;
