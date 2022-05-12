import connectDB from "../../middleware/mongodb";
import BirthApplication from "../../models/BirthApplication.schema";

const handler = async (req, res) => {
  await BirthApplication.findOne({applicant_id: req.body.applicant_id})
    .then((certificate, err) => {
      if (err) {
        console.log("error: ", err);
      } else {
        if (certificate) {
          console.log("Certificate already exists");
          res.status(401).send("Already applied certificate");
        } else {
          const newBirthApplication = new BirthApplication(req.body);
          newBirthApplication.save((err, birthApplication) => {
            if (err) {
              console.log("Error", err);
              res.status(400).send(err);
            } else {
              console.log("Application created");
              res.status(200).send("Application created");
            }
          });
        }
      }
    })
    .catch((err) => {
      console.log("Cannot Apply some error occured", err);
      res.status(401).send("Cannot Apply some error occured");
    });
};

export default connectDB(handler);
