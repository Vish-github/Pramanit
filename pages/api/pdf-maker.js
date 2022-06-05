// import {Document,Page,Text,Image,Stylesheet} from '@react-pdf/renderer'

import connectDB from "../../middleware/mongodb";
import axios from 'axios'
import process from 'process'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
  require('dotenv').config
  const fs=require('fs')
  // function makeStorageClient () {
//     return new Web3Storage({ token:  process.env.WEB3STORAGE_TOKEN})
//   }
const client = new Web3Storage({ token:  process.env.WEB3STORAGE_TOKEN})
 async function storeFiles(files){
    console.log(files)
    fs.writeFileSync('some.pdf', files)
    const file = await getFilesFromPath('./some.pdf')
  // const files = new File([blob], 'output.pdf')
    const cid = await client.put(file)
    console.log('stored files with cid:', cid)
    return cid
  
  }


const pdfDoc=require('pdfkit')

const getStream = require('get-stream')

const pdfbuilder=async(startCall,endCall)=>{

    const doc=new pdfDoc({bufferPages: true,})
    // doc.pipe(storeFiles());
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
    .text('Register for: Senta-cruz taluka:Tiswadi of district:North Goa',{align:'justify'} );
    doc.moveDown();
    doc
    .fontSize(11)
    .text('Name:Riddhi Rajendra Siddharkar  ',{align:'justify'})
    doc.moveDown();
    doc
    .fontSize(11)
    .text('sex:Female Date of Birth:20/10/2000  Date of Registration:7/11/2000',{align:'justify',})
    //'sex:Female DOB:20/10/2000  DOR:7/11/2000',
    doc.moveDown();
    doc
    .fontSize(11)
    .text(' Fathers name:Rajendra Siddharkar',{align:'justify'})

    doc.moveDown();
    doc
    .fontSize(11)
    .text(' Mothers name:Preeti Siddharkar',{align:'justify'})
    
    doc.moveDown();
    doc
    .fontSize(11)
    .text('Nationality of mother:Indian',{align:'justify'})

    doc.moveDown();
    doc
    .fontSize(11)
    .text('Nationality of Father:Indian',{align:'justify'})

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
      return await getStream.buffer(doc)


}
const handler=async(req,res)=>{
   const myPdf=await pdfbuilder()
   const pdfBase64string =await myPdf.toString('base64')
  //  console.log(pdfBase64string)

   const data=await storeFiles(myPdf)
   console.log(data)
    //   console.log(res)
    //   res.contentType("application/pdf");
    // const stream =await res.writeHead(200, {
    //     'Content-Type': 'application/pdf',
    //     'Content-disposition': 'attachment;filename=output.pdf',
    // });
    // pdfbuilder(
    //       (chunk)=>stream.write(chunk),
    //       ()=>stream.end()
    //   )
  res.send('Done')
      // console.log(file)
     

}
export default connectDB(handler);