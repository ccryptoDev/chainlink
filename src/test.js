const Web3 = require('web3');
const ethers = require('ethers');
const factory = require('../build/contracts/NFTFactory.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { mnemonic, privateKey, walletAddress } = require('../secrets.json');
const {
  expectRevert,
  expectEvent,
  BN,
  ether,
  constants,
  balance,
  send
} = require('@openzeppelin/test-helpers');

const main = async () => {
  console.log('here executed');
  try {
    let provider = new HDWalletProvider({
      mnemonic: {
        phrase: mnemonic
      },
      providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
    });
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(factory.abi, '0x064b5Fbb1697464b50C430e6E42bde2cFF7634d4');
    web3.eth.accounts.wallet.add({
      privateKey: privateKey,
      address: walletAddress
    });
    const tx = await contract.methods.create(2, true, web3.utils.toWei('0.01'), 20, 2, []).send({
      from: walletAddress,
      value: ether('0.01'),
      gas: 4600000,
      gasLimit: 800000,
    });
    // console.log('tx finished', tx);
    // const nftInfo = await contract.methods.getNFTInfo(1).call();
    // console.log('nftInfo', nftInfo);
    // const upgradeTx = await contract.methods.upgradeCards([11, 12, 13, 14, 15, 16], 2, []).send({
    //   from: walletAddress,
    //   gas: 4600000,
    //   gasLimit: 80000
    // });
    // console.log('upgrade tx', upgradeTx);
  } catch(e) {
    console.log('this is error', e);
  }
}
module.exports = async function(callback) {
  // perform actions
  await main();
}