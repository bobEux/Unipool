require('dotenv').config();
const request = require('sync-request');
const web3 = require('web3');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const ethgasstation = "https://ethgasstation.info/api/ethgasAPI.json";

let mainnetGasPrice = 10;
try {
  const res = request('GET', ethgasstation);
  // Unit is 10*gwei
  mainnetGasPrice = (JSON.parse(res.getBody('utf8')).safeLow / 10).toString();
  console.log("Gas price: " + mainnetGasPrice);
} catch {
  console.log("Unable to fetch gas prices.");
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      gas: 8000000,
      gasPrice: 1000000000, // web3.eth.gasPrice
    },
    coverage: {
      host: 'localhost',
      port: 8555,
      network_id: '*',
      gas: 8000000,
      gasPrice: 1000000000, // web3.eth.gasPrice
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.infura.io/v3/` + process.env.INFURA_API_KEY),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      gas: 1223446,
      gasPrice: web3.utils.toWei(mainnetGasPrice, 'gwei'),
    },
  },
  compilers: {
    solc: {
      version: '0.5.12',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        }
      }
    },
  },
  mocha: { // https://github.com/cgewecke/eth-gas-reporter
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      gasPrice: 10,
      onlyCalledMethods: true,
      showTimeSpent: true,
      excludeContracts: ['Migrations']
    }
  }
};
