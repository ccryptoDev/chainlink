const {
  expectRevert,
  expectEvent,
  BN,
  ether,
  constants,
  balance,
  send
} = require('@openzeppelin/test-helpers');

const {expect} = require('chai');

const CardNFT = artifacts.require('CardNFT');
const AccessControl = artifacts.require('CardNFTAccessControls');
const NFTFactory = artifacts.require('NFTFactory');

contract('NFTFactory', (accounts) => {
  const admin = '0x85406ca586a83f5e8ed51b252206d327e107b48d';
  const platformFeeAddress = '0xD387098B3CA4C6D592Be0cE0B69E83BE86011c50';
  const minter = '0x2e83d1613be6906e0b1c203e75a383699333cfed';
  
  beforeEach(async () => {
    this.accessControl = await AccessControl.deployed();
    await this.accessControl.addAdminRole(minter);
    
    this.nft = await CardNFT.deployed();
    this.factory = await NFTFactory.deployed();

    await this.accessControl.addMinterRole(this.factory.address, { from: admin });
  });

  describe('Contract deployment', () => {
  //   it('Reverts when access controls is zero', async () => {
  //     await expectRevert(
  //       NFTFactory.new(
  //         constants.ZERO_ADDRESS,
  //         this.nft.address,
  //         platformFeeAddress,
  //         { from : admin }
  //       ),
  //       "NFTFactory: Invalid Access Controls"
  //     );
  //   });

  //   it('Reverts when nft is zero', async () => {
  //     await expectRevert(
  //       NFTFactory.new(
  //         this.accessControl.address,
  //         constants.ZERO_ADDRESS,
  //         platformFeeAddress,
  //         { from : admin }
  //       ),
  //       "NFTFactory: Invalid NFT"
  //     );
  //   });

  //   it('Reverts when platform fee recipient is zero', async () => {
  //     await expectRevert(
  //       NFTFactory.new(
  //         this.accessControl.address,
  //         this.nft.address,
  //         constants.ZERO_ADDRESS,
  //         { from: admin }
  //       ),
  //       'NFTFactory: Invalid platform Fee recipient'
  //     );
  //   });
  });

  describe('Factory contract feature', () => {
    beforeEach(async () => {

    });

    it('mint 1 NFT', async () => {
      const tx = await this.factory.generateNFTInfoTest(
        new BN('0x1D7B9F97D13FB45CCCAF8870234EB6BDC20DC8E9595D3693AE92D4428E6320D1'),
        {
          from: minter
        }
      );
      console.log(tx);

      // console.log(await this.factory.getRandomResult());
      const detail = await this.factory.getNFTInfo(1);
      console.log('detail is here', detail);

      // const balance = await this.nft.balanceOf(minter, 1);
      // expect(balance).to.be.bignumber.equal('1');
    });

    // it('mint 4 NFTs', async () => {
    //   await this.factory.create(
    //     8,
    //     false,
    //     new BN('1'),
    //     4,
    //     [],
    //     {
    //       from: minter,
    //       value: ether('1')
    //     }
    //   );
    //   const balance1 = await this.nft.balanceOf(minter, 1);
    //   const balance2 = await this.nft.balanceOf(minter, 2);
    //   const balance3 = await this.nft.balanceOf(minter, 3);
    //   const balance4 = await this.nft.balanceOf(minter, 4);
    //   expect(balance1).to.be.bignumber.equal('1');
    //   expect(balance2).to.be.bignumber.equal('1');
    //   expect(balance3).to.be.bignumber.equal('1');
    //   expect(balance4).to.be.bignumber.equal('1');
    // });

    // it('Revert if payment is below price', async () => {
    //   expectRevert(
    //     this.factory.create(
    //       new BN('1'),
    //       1,
    //       [],
    //       {
    //         from: minter,
    //         value: ether('0.5')
    //       }
    //     ),
    //     'Factory.create: payment should be same to original price'
    //   );
    // });
  });
});
