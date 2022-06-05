import connectDB from "../../middleware/mongodb";
import process from 'process'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
var ncrypt = require("ncrypt-js");
var _secretKey = "some-super-secret-key";
var ncryptObject = new ncrypt(_secretKey);
const fs=require('fs')
  require('dotenv').config
  const client = new Web3Storage({ token:  process.env.WEB3STORAGE_TOKEN})
  async function storeFiles(files){
    fs.writeFileSync('some.json', files)
    const file = await getFilesFromPath('./some.json')
     const cid = await client.put(file)
     console.log('stored files with cid:', cid)
     return cid
   
   }
   const handler=async(req,res)=>{
       console.log(req.body)
      //  var data=req.body
      var data={ id: "627c69e54bfb9d5f540f3f8a",
      childFirstName: 'Hello ',
      childLastName: 'World',
      fatherName: 'John Doe',
      motherName: 'Jane Doe',
      dateOfBirth: "2022-05-12T00:00:00.000Z",
      placeOfBirth: 'Bambolim',
      address: 'Santa Cruz',
      fatherNationality: 'Indian',
      motherNationality: 'Indian',
      gender: 'male',
      grandFatherName: 'Johnnie Doe',
      grandMotherName: 'Jannie Doe',
      muncipalityLocation: 'PNJ',
      fatherIdentityProof: 'http://res.cloudinary.com/dyuxnrh9a/image/upload/v1652320738/rluzxbkolilwydmjwa3q.pdf',
      motherIdentityProof: 'http://res.cloudinary.com/dyuxnrh9a/image/upload/v1652320740/f7wnkosfyip3qtl07dkm.pdf',
      addressProof: 'http://res.cloudinary.com/dyuxnrh9a/image/upload/v1652320737/pecfpgw9r9o2jqrtv1vf.pdf',       
      birthProof: 'http://res.cloudinary.com/dyuxnrh9a/image/upload/v1652320741/hu6dto8anqnrffmnxp41.pdf',
      applicant_id: '627b869557522419fd1fc8d0'}
       var encryptedObject = ncryptObject.encrypt(data);
       console.log(encryptedObject)
       const hash=await storeFiles(encryptedObject)
       return res.send(hash)
   }
   export default connectDB(handler);

