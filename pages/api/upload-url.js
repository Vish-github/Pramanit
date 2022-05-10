import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
cloudinary.config({
  cloud_name: "dyuxnrh9a",
  api_key: "744456297138184",
  api_secret: "cV7LRCW6hOH_LPb6Ss5bZPKOFdk",
});
export const config = {
  api: {
    bodyParser: false
  }
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  export default async function handler(req, res) {
    console.log("Receiving");
    if (req.method === "POST") {
      const result = await asyncParse(req);
      console.log(result)
       await fetch(
    `https://api.cloudinary.com/v1_1/dyuxnrh9a/image/upload -X POST --data 'file=${result.files.file}&timestamp=<TIMESTAMP>&api_key=744456297138184&signature=cV7LRCW6hOH_LPb6Ss5bZPKOFdk`,
    {
      method: "POST",
      body: req.files.file,
    }
  ).then((r) =>
    r.json().then((r) => {
      console.log("Secure link", r.secure_url);
    })
  );
      // res.status(200).json({ result });
    }
  }
// export default async function handler(req, res) {
//   console.log("in backend",req)
  // cloudinary.v2.uploader.upload(
  //   req.query.file,
  //   {public_id: "olympic_flag"},
  //   function (error, result) {
  //     if (error) {
  //       console.log("Error: ", error);
  //     }
  //     console.log("result", result);
  //   }
  // );

  // await fetch(
  //   `https://api.cloudinary.com/v1_1/dyuxnrh9a/image/upload -X POST --data 'file=${req.body.file}&timestamp=<TIMESTAMP>&api_key=744456297138184&signature=cV7LRCW6hOH_LPb6Ss5bZPKOFdk`,
  //   {
  //     method: "POST",
  //     body: req.query.file,
  //   }
  // ).then((r) =>
  //   r.json().then((r) => {
  //     console.log("Secure link", r.secure_url);
  //   })
  // );
// }
