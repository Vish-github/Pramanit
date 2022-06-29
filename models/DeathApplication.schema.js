const mongoose = require("mongoose");

const deathApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  dateOfDeath: {
    type: Date,
  },
  placeOfDeath: {
    type: String,
  },
  addressAtTimeOfDeath: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  gender: {
    type: String,
  },
  muncipalityLocation: {
    type: String,
  },
  reasonOfDeath: {
    type: String,
  },
  proofOfDeath: {
    type: String,
  },
  ageProof: {
    type: String,
  },
  identityproof: {
    type: String,
  },
  addressProof: {
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

global.DeathApplication =
  mongoose.models.DeathApplication ||
  mongoose.model("DeathApplication", deathApplicationSchema);

export default global.DeathApplication;
