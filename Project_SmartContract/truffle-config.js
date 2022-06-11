require('dotenv').config()
const WalletHandler=require('@truffle/hdwallet-provider')
console.log(process.env.PRIVATE_KEY,process.env.INFURA_API_KEY)
module.exports = {

  networks: {
    // rinkeby:{
    //   networkCheckTimeout: 10000,
    //   provider:()=>new WalletHandler({
    //     privateKeys:['f7c4e680ae9ebc56fb5a315a053385712451a3713c870bf63a5e8da3d057005d'],
    //     providerOrUrl:"wss://rinkeby.infura.io/ws/v3/b7e67459e49e4367babd70cc44f9a462",
    //     numberOfAddresses:1
    //   }),
    //   network_id:4,
    //   gas:5500000,
    //   confirmations:2,
    //   timeoutBlock:2000,
    //   skipDryRun:true
    // },
    development:{
      host:"127.0.0.1",
      port:7545,
      network_id:"*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
