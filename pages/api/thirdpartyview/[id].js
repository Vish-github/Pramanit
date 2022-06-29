import connectDB from "../../../middleware/mongodb";
import User from "../../../models/User.schema";
import TimeBasedCertificateSchema from "../../../models/TimeBasedCertificate.schema";

const handler = async (req, res) => {
  const {id} = req.query;
  console.log(id);

  TimeBasedCertificateSchema.findById(id)
    .then((details) => {
      if (details.validTill > Date.now()) {
        User.findById(details.userid).then((user) => {
          if (details.type == "DEATH") {
            res.send({
              ipfshash: user.deathIpfsHash,
              transactionid: user.deathTransactionId,
              userid: details.userid,
              username: user.username,
              type: "DEATH",
            });
          } else {
            res.send({
              ipfshash: user.birthIpfsHash,
              transactionid: user.birthTransactionId,
              userid: details.userid,
              username: user.username,
              type: "BIRTH",
            });
          }
        });
      } else {
        console.log("Time out");
        res.status(401).send("Invalid link");
      }
    })
    .catch((err) => {
      console.log("error", err);
      res.send("done");
    });
};

export default connectDB(handler);
