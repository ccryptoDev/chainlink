var HDWalletProvider = require("truffle-hdwallet-provider");
const { mnemonic, apiKey } = require('./secrets.json');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*", // Match any network id,
      timeoutBlocks: 2000,
      gas: 6621975,
      gasLimit: 700000,
      skipDryRun: true,
      networkCheckTimeout: 1000000
    },
    testnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s2.binance.org:8545`)
      },
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 2000,
      gas: 20000000,
      gasLimit: 800000,
      skipDryRun: true,
      networkCheckTimeout: 1000000
    },
    kovan: {
      provider() {
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${apiKey}`,
          0
        );
      },
      networkCheckTimeout: 100000,
      network_id: 4,
      gasPrice: 2e10,
      gas: 4712388,
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      },
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: apiKey
  }
};
