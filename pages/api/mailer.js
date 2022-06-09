const nodemailer=require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
    auth: {
      user: "babaniralalockhanwala@gmail.com",
      pass: "cgzcxyrwsokrlxbp",
    },

  });
  import connectDB from "../../middleware/mongodb";
  const handler=async(req,res)=>{
    transporter.sendMail(
        {
          to: req.body.email,
          from: "babaniralalockhanwala@gmail.com",
          subject: "Rejection of Birth Certificate",
          html: `
                <h3>Dear Sir/Madam</h3>
                <p>We are sorry to announce that the birth certificate u had applied for has been rejected <br />
                the cause of rejection is as stated below<br />
                Reason${req.body.reason}

                we are sorry for the inconvienced caused, you can reply the certificate by going to your closest muncipality
                <br />
                Thank you 
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
  }
  export default connectDB(handler);