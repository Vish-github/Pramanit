import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dyuxnrh9a",
  api_key: "744456297138184",
  api_secret: "cV7LRCW6hOH_LPb6Ss5bZPKOFdk",
});

export default async function handler(req, res) {
  console.log("in backend");
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

  await fetch(
    `https://api.cloudinary.com/v1_1/dyuxnrh9a/image/upload -X POST --data 'file=${req.query.file}&timestamp=<TIMESTAMP>&api_key=744456297138184&signature=cV7LRCW6hOH_LPb6Ss5bZPKOFdk`,
    {
      method: "POST",
      body: req.query.file,
    }
  ).then((r) =>
    r.json().then((r) => {
      console.log("Secure link", r.secure_url);
    })
  );
}
