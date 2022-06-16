import connectDB from "../../middleware/mongodb";
import process from "process";
import {Web3Storage, getFilesFromPath} from "web3.storage";
var ncrypt = require("ncrypt-js");
var _secretKey = "some-super-secret-key";
var ncryptObject = new ncrypt(_secretKey);
const fs = require("fs");
require("dotenv").config;
const client = new Web3Storage({token: process.env.WEB3STORAGE_TOKEN});
async function storeFiles(files) {
  fs.writeFileSync("some.json", files);
  const file = await getFilesFromPath("./some.json");
  const cid = await client.put(file);
  console.log("stored files with cid:", cid);
  return cid;
}
const handler = async (req, res) => {
  var data = req.body;
  var encryptedObject = ncryptObject.encrypt(data);
  console.log(encryptedObject);
  const hash = await storeFiles(encryptedObject);
  return res.send(hash);
};
export default connectDB(handler);
