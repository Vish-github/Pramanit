const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "babaniralalockhanwala@gmail.com",
    pass: "cgzcxyrwsokrlxbp",
  },
});
import connectDB from "../../middleware/mongodb";
import User from "../../models/User.schema";
import BirthApplication from "../../models/BirthApplication.schema";

const handler = async (req, res) => {
  await User.findOneAndUpdate(
    {email: req.body.email},
    {birthCertificateStatus: 3}
  )
    .then((certificate) => {
      BirthApplication.findOneAndUpdate({_id: req.body.id}, {issued: -1})
        .then((response) => {
          console.log("Successfully updated data", req.body.email);
          transporter.sendMail(
            {
              to: req.body.email,
              from: "babaniralalockhanwala@gmail.com",
              subject: "Rejection of Birth Certificate",
              html: `
                <h3>Dear Sir/Madam</h3>
                <p>We are sorry to inform that the birth certificate you had applied for has been rejected. <br />
                The cause of rejection is as stated below<br />
                Reason:  ${req.body.reason}

                We are sorry for the inconvienced caused, you can reply the certificate by going to your closest muncipality
                <br />
                Thank you!! 
                </p>
                `,
            },
            (err, _result) => {
              if (err) {
                console.log(err);
                res.send(err);
              } else {
                res.send("success");
              }
              transporter.close();
            }
          );
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
