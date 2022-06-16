// bafybeigyqvlvg2tylq372c3kujnej4h33a44gug57n4bnmbk6lphbxhwfu
import connectDB from "../../../middleware/mongodb";
import process from 'process'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import axios from 'axios'
const pdfDoc=require('pdfkit')

var ncrypt = require("ncrypt-js");
var _secretKey = "some-super-secret-key";
var ncryptObject = new ncrypt(_secretKey);
const fs=require('fs')
  require('dotenv').config
  const client = new Web3Storage({ token:  process.env.WEB3STORAGE_TOKEN})
  async function getFile(cid){
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    return('No file found') 
  }
  else{
        const file=await res.files(0)
        const link=await file.toLocaleString()
        console.log(file[0])
        // file.values()
        return file[0]
  }
}
const pdfbuilder=async(data,res)=>{

    const doc=new pdfDoc({bufferPages: true,})
    doc.pipe(res);
    // const stream = doc.pipe(blobStream());
    // doc.on('data',startCall)
    // doc.on('end',endCall)
    doc
    .fontSize(12)
    .text('GOVERMENT OF GOA', {align:'center'});
    doc.moveDown();
    doc
    .fontSize(14)
    .text('DIRECTORATE OF PLANNING,STATISTIC AND EVALUATION',{align:'center'});
    doc.moveDown();
    doc
    .fontSize(13)
    .text('Form No.9', {align:'center'});
    doc.moveDown();
    doc
    .fontSize(13)
    .text('(see Rule 9)', {align:'center'});
    doc.moveDown();
    doc
    .fontSize(11)
    .text(`Register for: ${data.address} taluka:${data.muncipalityLocation} of district:North Goa`,{align:`justify`} );
    doc.moveDown();
    doc
    .fontSize(11)
    .text(`Name:${data.childFirstName} ${data.childLastName} `,{align:`justify`})
    doc.moveDown();
    doc
    .fontSize(11)
    .text(`sex:${data.gender} Date of Birth:${data.dateOfBirth.split('T')[0]} Date of Registration:${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,{align:`justify`,})
    //`sex:Female DOB:20/10/2000  DOR:7/11/2000`,
    doc.moveDown();
    doc
    .fontSize(11)
    .text(` Fathers name:${data.fatherName}`,{align:`justify`})

    doc.moveDown();
    doc
    .fontSize(11)
    .text(` Mothers name:${data.motherName}`,{align:`justify`})
    
    doc.moveDown();
    doc
    .fontSize(11)
    .text(`Nationality of mother:${data.fatherNationality}`,{align:`justify`})

    doc.moveDown();
    doc
    .fontSize(11)
    .text(`Nationality of Father:${data.motherNationality}`,{align:`justify`})

    doc.moveDown();
    doc.moveDown();
    //  Nationality of father:Indian
    const signature=await axios.get('https://image.shutterstock.com/image-vector/autograph-hand-drawn-handwritten-signature-260nw-2055413072.jpg', {responseType: 'arraybuffer'})

    doc.image(signature.data, {
        width:50,
        height:50,
        align: 'left',
        valign: 'center'
      });   
      doc.moveDown();
      doc
      .fontSize(11)
      .text('signature of Authority', {align:'left'});
      const stamp=await axios.get('https://static6.depositphotos.com/1003153/570/v/950/depositphotos_5705314-stock-illustration-certified-stamp.jpg',{responseType: 'arraybuffer'})
      doc.image(stamp.data, {
        width:150,
        height:150,
        align: 'center',
        valign: 'center'
      });


      doc.end()
      
}
const handler=async(req,res)=>{
    const cid=req.query.cid
    const file=await getFile(cid)
    const data=await axios.get(`https://dweb.link/ipfs/${file.cid}/?filename${file._name}`)
    console.log(data.data)
    var decryptedObject = ncryptObject.decrypt(data.data);
    const myPdf=await pdfbuilder(decryptedObject,res)
    console.log(decryptedObject)
}

export default connectDB(handler);
