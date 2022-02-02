const CardNFT = artifacts.require("CardNFT");
const AccessControl = artifacts.require('CardNFTAccessControls');
const NFTFactory = artifacts.require('NFTFactory');

module.exports = async function(deployer) {
  await deployer.deploy(AccessControl);
  const accessControl = await AccessControl.deployed();
  console.log('accessc ontrol deployed', accessControl.address);

  await deployer.deploy(CardNFT, 'TEST', 'NFT', 'https://baseuri.com', accessControl.address);
  const nft = await CardNFT.deployed();
  console.log('NFT deployed', nft.address);

  await deployer.deploy(NFTFactory, accessControl.address, nft.address, '0xD387098B3CA4C6D592Be0cE0B69E83BE86011c50');
  const factory = await NFTFactory.deployed();
  console.log('all are deployed', factory.address);

  await accessControl.addMinterRole(factory.address);
};
