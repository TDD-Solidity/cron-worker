require('dotenv').config()
var cron = require('node-cron');

const Web3 = require("web3");
const { ethers } = require("ethers");
const SillySqauresABI = require('./contract-ABIs/Silly_Squares_NFT_ABI.json');

Web3.providers.HttpProvider("https://ropsten.infura.io");

cron.schedule('* * * * *', async () => {

  await sendTx();

});

async function sendTx() {

  const infuraProvider = new ethers.providers.InfuraProvider("rinkeby", {
    projectId: process.env.INFURA_ID,
    projectSecret: process.env.INFURA_API_KEY
  });

  const wallet = new ethers.Wallet(process.env.PRIVATE_WALLET_KEY, infuraProvider);

  const signer = wallet.connect(infuraProvider);
  console.log('my address (signer): ', signer.address)

  const silly_squares_club_address = '0xec1788ebe33186e91aa281029025671b553e166c';

  const sillySquaresContract = new ethers.Contract(silly_squares_club_address, SillySqauresABI, signer);

  const sillySquareCost = (await sillySquaresContract.cost()).toString();
  console.log({ sillySquareCost })

  const startingTotalSupply = (await sillySquaresContract.totalSupply()).toString();
  console.log({ startingTotalSupply })
  
  const mintResult = (await sillySquaresContract.mint(wallet.address, 1));
  console.table(mintResult)
  
  const postMintTotalSupply = (await sillySquaresContract.totalSupply()).toString();
  console.log({ postMintTotalSupply })

}