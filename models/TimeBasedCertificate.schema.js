const mongoose = require("mongoose");

const timeBasedCertificate = new mongoose.Schema({
  userid: {
    type: String,
  },
  validTill: {
    type: Date,
  },
  type: {
    type: String,
  },
});

global.TimeBasedCertificate =
  mongoose.models.TimeBasedCertificate ||
  mongoose.model("TimeBasedCertificate", timeBasedCertificate);

export default global.TimeBasedCertificate;
