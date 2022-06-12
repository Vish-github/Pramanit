import connectDB from "../../middleware/mongodb";
import BirthApplication from "../../models/BirthApplication.schema";
import User from "../../models/User.schema";

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
              User.findByIdAndUpdate(req.body.applicant_id, {
                birthCertificateStatus: 1,
              })
                .then((user) => {
                  let updatedUser = user;
                  updatedUser.password = "";
                  updatedUser.birthCertificateStatus = 1;
                  console.log("Application created", updatedUser);
                  res.status(200).send(updatedUser);
                })
                .catch((err) => {
                  console.log("Error in updating status", err);
                  res.status(500).send("Error in updating status");
                });
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
