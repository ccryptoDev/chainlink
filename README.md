<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contract">Current Contract Explain</a></li>
    <li><a href="#test-scenario">Test Scenario</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
CardNFT contract is NFT contract implemented from ERC1155.

### Built With

* Solidity
* Truffle
* Openzeppelin
* Web3
* Node.js


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
1. Install the latest Node.js (If you already have it, you can skip it)
2. Install the truffle
   ```sh
   npm install -g truffle
   ```
3. Download Ganache & install for local development (https://www.trufflesuite.com/ganache)
### Installation

1. Clone the repo
   ```sh
   git clone https://gitlab.com/kardashi/nft-factory-contract.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
## Usage
Before deployment contract, Need to confirm Ganache is working or not.
1. truffle build
2. truffle deploy
3. truffle test

After deployment or test, you can find created blocks from Ganache.
## Contract
 NFT contract holds all required informations for factory & auction contract.
- ERC1155.sol
  It holds ERC1155's codebase.
- CardNFT.sol
  It has main concept of NFT contract and  hold the required for all informations for name, symbol, hash, token owner.
  Also it has simply functionality like minting.
- Migrations.sol
  It is for deployment and auto generated filed from truffle.
## Test Scenario
To test the contract, you need to run truffle test simply.
It will shows the test result baesd on testcase and testcase is built in Chai.

It tests following stuff.
1. Deployment
  It test the deployment and will compare the values if it is not null.
2. minting.
  It tests minting functionality for new token.
3. Indexing.
  It mints 3 more conracts and confirm count and hashes are working.
4. URI
  It is test for URI mainly setTokenUri and this function is inheried. it tests setting uri functionality.
