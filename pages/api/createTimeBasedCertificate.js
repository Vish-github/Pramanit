import connectDB from "../../middleware/mongodb";
import TimeBasedCertificate from "../../models/TimeBasedCertificate.schema";

const handler = async (req, res) => {
  const newCertificate = new TimeBasedCertificate(req.body);
  newCertificate.save((err, certificate) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("timestamp created");
      res.status(200).send(certificate._id);
    }
  });
};

export default connectDB(handler);
