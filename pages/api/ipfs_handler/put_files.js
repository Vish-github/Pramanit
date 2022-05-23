import process from 'process'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
  
function makeStorageClient () {
    return new Web3Storage({ token:  process.env.WEB3STORAGE_TOKEN})
  }
exports.storeFiles=async(files)=> {
    console.log(files)
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }
  exports.getFiles=async(path)=>{
    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    return files
  }
//   module.exports=storeFiles