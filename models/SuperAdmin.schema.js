const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

global.SuperAdmin =
  mongoose.models.SuperAdmin || mongoose.model("SuperAdmin", superAdminSchema);

export default global.SuperAdmin;
