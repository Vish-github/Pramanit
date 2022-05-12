const mongoose = require("mongoose");

const birthApplicationSchema = new mongoose.Schema({
  childFirstName: {
    type: String,
  },
  childLastName: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  placeOfBirth: {
    type: String,
  },
  address: {
    type: String,
  },
  fatherNationality: {
    type: String,
  },
  motherNationality: {
    type: String,
  },
  gender: {
    type: String,
  },
  grandFatherName: {
    type: String,
  },
  grandMotherName: {
    type: String,
  },
  muncipalityLocation: {
    type: String,
  },
  fatherIdentityProof: {
    type: String,
  },
  motherIdentityProof: {
    type: String,
  },
  addressProof: {
    type: String,
  },
  birthProof: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  issued: {
    type: Number,
    default: 0,
  },
  applicant_id: {
    type: String,
  },
});

global.BirthApplication =
  mongoose.models.BirthApplication ||
  mongoose.model("BirthApplication", birthApplicationSchema);

export default global.BirthApplication;
