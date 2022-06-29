import connectDB from "../../middleware/mongodb";
import DeathApplication from "../../models/DeathApplication.schema";
import User from "../../models/User.schema";

const handler = async (req, res) => {
  await DeathApplication.findOne({applicant_id: req.body.applicant_id})
    .then((certificate, err) => {
      if (err) {
        console.log("error: ", err);
      } else {
        if (certificate) {
          console.log("Certificate already exists");
          res.status(401).send("Already applied certificate");
        } else {
          const newDeathApplication = new DeathApplication(req.body);
          newDeathApplication.save((err, deathApplication) => {
            if (err) {
              console.log("Error", err);
              res.status(400).send(err);
            } else {
              User.findByIdAndUpdate(req.body.applicant_id, {
                deathCertificateStatus: 1,
              })
                .then((user) => {
                  let updatedUser = user;
                  updatedUser.password = "";
                  updatedUser.deathCertificateStatus = 1;
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
