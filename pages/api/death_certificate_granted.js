import connectDB from "../../middleware/mongodb";
import User from "../../models/User.schema";
import DeathApplication from "../../models/DeathApplication.schema";

const handler = async (req, res) => {
  const data = {
    deathIpfsHash: req.body.deathhash,
    deathTransactionId: req.body.deathtransaction,
    deathCertificateStatus: 2,
  };
  await User.findOneAndUpdate({email: req.body.email}, data)
    .then((certificate) => {
      DeathApplication.findOneAndUpdate({_id: req.body.id}, {issued: 1})
        .then((response) => {
          console.log("Successfully updated data");
          res.send("Successfully updated data");
        })
        .catch((err) => {
          console.log("Error", err);
        });
    })
    .catch((err) => {
      console.log("Cannot Update some error occured", err);
      res.status(401).send("Cannot Update some error occured");
    });
};

export default connectDB(handler);
