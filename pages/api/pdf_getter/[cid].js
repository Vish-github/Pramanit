// bafybeigyqvlvg2tylq372c3kujnej4h33a44gug57n4bnmbk6lphbxhwfu
import connectDB from "../../../middleware/mongodb";
import process from "process";
import {Web3Storage, getFilesFromPath} from "web3.storage";
import axios from "axios";
import english from "./data/english";
import konkani from "./data/konkani";
// import poppins from "./fonts/Poppins.ttf";
const pdfDoc = require("pdfkit");
const path = require("path");

var ncrypt = require("ncrypt-js");
var _secretKey = "some-super-secret-key";
var ncryptObject = new ncrypt(_secretKey);
const fs = require("fs");
require("dotenv").config;
const client = new Web3Storage({token: process.env.WEB3STORAGE_TOKEN});
async function getFile(cid) {
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    return "No file found";
  } else {
    const file = await res.files(0);
    const link = await file.toLocaleString();
    console.log(file[0]);
    // file.values()
    return file[0];
  }
}
const pdfbuilder = async (data, res) => {
  const poppinsFont = fs.readFileSync(
    path.resolve("./", "./pages/api/pdf_getter/fonts/Poppins.ttf")
  );
  const poppinsBoldFont = fs.readFileSync(
    path.resolve("./", "./pages/api/pdf_getter/fonts/Poppins-Bold.ttf")
  );
  const doc = new pdfDoc({bufferPages: true});
  doc.pipe(res);
  // const stream = doc.pipe(blobStream());
  // doc.on('data',startCall)
  // doc.on('end',endCall)
  doc
    .font(poppinsFont)
    .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
    .stroke();
  const govtlogo = await axios.get(
    "https://upload.wikimedia.org/wikipedia/en/8/8a/Seal_of_Goa.png",
    {responseType: "arraybuffer"}
  );
  doc.image(govtlogo.data, 25, 25, {
    fit: [100, 100],
    align: "center",
    valign: "center",
  });

  const birthdeathdeptlogo = await axios.get(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW8Lfahh7ZS8AYtyg8jhn64PT_W3RZm5hTm-pOMuZ6-9LEDl0Q6DT7iOacEwfglBZKszM&usqp=CAU",
    {responseType: "arraybuffer"}
  );
  doc.image(birthdeathdeptlogo.data, doc.page.width - 125, 25, {
    fit: [100, 100],
    align: "center",
    valign: "center",
  });

  doc
    .fontSize(12)
    .text(konkani.statename, {align: "center"})
    .text(english.statename, {align: "center"});
  doc.moveDown();

  doc
    .fontSize(14)
    .text(konkani.deptname, {
      align: "center",
    })
    .text(english.deptname, {
      align: "center",
    });
  doc.moveDown();

  doc
    .font(poppinsBoldFont)
    .fontSize(13)
    .text(konkani.birthcertificate, {align: "center"})
    .text(english.birthcertificate, {align: "center"});
  doc.moveDown();
  doc.moveDown();

  doc
    .font(poppinsFont)
    .fontSize(11)
    .text(
      `${konkani.name}/${english.name}: ${data.childFirstName} ${data.childLastName} `,
      {
        align: `justify`,
      }
    );
  doc.moveDown();

  doc.text(`${konkani.sex}/${english.sex}: ${data.gender} `, {
    align: `justify`,
  });
  doc.moveDown();

  doc.text(
    `${konkani.dob}/${english.dob}: ${data.dateOfBirth.split("T")[0]} `,
    {
      align: `justify`,
    }
  );
  doc.moveDown();

  doc.text(`${konkani.nom}/${english.nom}: ${data.motherName} `, {
    align: `justify`,
  });
  doc.moveDown();

  doc.text(`${konkani.nof}/${english.nof}: ${data.fatherName} `, {
    align: `justify`,
  });
  doc.moveDown();

  doc.text(`${konkani.nogf}/${english.nogf}: ${data.grandFatherName} `, {
    align: `justify`,
  });
  doc.moveDown();

  doc.text(`${konkani.nogm}/${english.nogm}: ${data.grandMotherName} `, {
    align: `justify`,
  });
  doc.moveDown();

  doc.text(`${konkani.address}/${english.address}: ${data.address} `, {
    align: `justify`,
  });
  doc.moveDown();

  doc.text(`${konkani.regno}/${english.regno}: ${data.certiid}`, {
    align: `justify`,
  });
  doc.text(
    `${konkani.dor}/${
      english.dor
    }: ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    {
      align: `justify`,
    }
  );

  doc.moveDown();
  doc.moveDown();

  const registrarsign = await axios.get(
    "https://i.etsystatic.com/14605561/r/il/b28b7b/1923258197/il_570xN.1923258197_t7ei.jpg",
    {responseType: "arraybuffer"}
  );
  doc.image(registrarsign.data, 50, doc.page.height - 200, {
    fit: [100, 100],
    align: "center",
    valign: "center",
  });
  doc
    .fontSize(8)
    .text(`${konkani.soi}/`, 70, doc.page.height - 120)
    .text(`${english.soi}`)
    .text(`${konkani.aoi}/`)
    .text(`${english.aoi}`);

  const stamp = await axios.get(
    "https://image.shutterstock.com/z/stock-vector-blue-municipal-distressed-rubber-stamp-with-grunge-texture-1209316840.jpg",
    {responseType: "arraybuffer"}
  );
  doc.image(stamp.data, doc.page.width / 2 - 50, doc.page.height - 140, {
    fit: [100, 100],
    align: "center",
    valign: "center",
  });

  const chiefregistrar = await axios.get(
    "https://image.shutterstock.com/image-vector/autograph-hand-drawn-handwritten-signature-260nw-2055413072.jpg",
    {responseType: "arraybuffer"}
  );
  doc.image(chiefregistrar.data, doc.page.width - 150, doc.page.height - 200, {
    fit: [80, 80],
    align: "center",
    valign: "center",
  });
  doc
    .text(
      `${konkani.cr}/${english.cr}`,
      doc.page.width - 150,
      doc.page.height - 140
    )
    .text(`${konkani.fs}/${english.fs}`);

  doc.end();
};
const handler = async (req, res) => {
  const cid = req.query.cid;
  const file = await getFile(cid);
  const data = await axios.get(
    `https://dweb.link/ipfs/${file.cid}/?filename${file._name}`
  );
  console.log(data.data);
  var decryptedObject = ncryptObject.decrypt(data.data);
  const myPdf = await pdfbuilder(decryptedObject, res);
  console.log(decryptedObject);
};

export default connectDB(handler);
