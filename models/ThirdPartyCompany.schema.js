const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtkey = "mykey";

const thirdPartyCompanySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  birthcertificates: {
    type: Array,
    default: [],
  },
  deathcertificates: {
    type: Array,
    default: [],
  },
});

thirdPartyCompanySchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, jwtkey, {
    expiresIn: "7d",
  });
  return token;
};

global.thirdPartyCompany =
  mongoose.models.thirdPartyCompany ||
  mongoose.model("thirdPartyCompany", thirdPartyCompanySchema);

export default global.thirdPartyCompany;
