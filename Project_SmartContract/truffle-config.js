require("dotenv").config();
const WalletHandler = require("@truffle/hdwallet-provider");
console.log(process.env.PRIVATE_KEY, process.env.INFURA_API_KEY);
module.exports = {
  networks: {
    rinkeby: {
      networkCheckTimeout: 10000,
      provider: () =>
        new WalletHandler({
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: process.env.INFURA_API_KEY,
          numberOfAddresses: 1,
        }),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlock: 2000,
      skipDryRun: true,
    },
    // development:{
    //   host:"127.0.0.1",
    //   port:7545,
    //   network_id:"*"
    // }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
