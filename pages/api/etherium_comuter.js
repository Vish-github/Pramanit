var myAddress = '0x760C594dA0f73077f938aA2ceff6D872C6fa652A';
var privateKey = Buffer.from('f7c4e680ae9ebc56fb5a315a053385712451a3713c870bf63a5e8da3d057005d', 'hex')
const Web3 = require("web3")
const MyContract = require('./../../Project_SmartContract/build/contracts/Muncipality.json')
const infuraUrl = 'wss://rinkeby.infura.io/ws/v3/b7e67459e49e4367babd70cc44f9a462'

const init1 = async () => {
    const web3 = new Web3(infuraUrl);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );
    const tx = myContract.methods.setData(1);
    const gas = await tx.estimateGas({from: myAddress});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(myAddress);
    const signedTx = await web3.eth.accounts.signTransaction (
        {
        to : myContract.options.address ,
        data ,
        gas ,
        gasPrice ,
        nonce ,
        chainId : networkId
        } ,
        privateKey
        ) ;
        console.log ( `Old data value : $ { await myContract.methods.data ( ) . call ( ) } `) ;
        const receipt = await web3.eth.sendTransaction ( signedTx.rawTransaction ) ;
        console.log (`Transaction hash : ${ receipt.transactionHash } `) ;
        console.log ( `New data value : ${await myContract.methods.data().call()}`) ;
}
init1()

