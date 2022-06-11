import connectDB from "../../../middleware/mongodb";
import User from "../../../models/User.schema";
import TimeBasedCertificateSchema from "../../../models/TimeBasedCertificate.schema";
import axios from "axios";

const handler = async (req, res) => {
  const {id} = req.query;
  console.log(id);

  TimeBasedCertificateSchema.findById(id)
    .then((details) => {
      if (details.validTill > Date.now()) {
        User.findById(details.userid).then((user) => {
          res.send({
            ipfshash: user.birthIpfsHash,
            transactionid: user.birthTransactionId,
            userid: details.userid,
            username: user.username,
          });
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
  //   const data = await BirthApplication.findOne({applicant_id: id});
  //   const emailGetter = await User.findOne({_id: id});
  //   const email = emailGetter.email;
  //   console.log(data);
  //   if (data != undefined || data != null) {
  //     let allData = {email, data};
  //     return res.status(200).send({allData});
  //   } else {
  //     return res.status(404).send({error: "No data find"});
  //   }
};

export default connectDB(handler);
