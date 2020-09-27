// require("dotenv").config();
// const HDWalletProvider = require("truffle-hdwallet-provider");

// var mnemonic = process.env.MNENOMIC;

module.exports = {
    networks: {
         development: {
              host: "localhost",
              port: 8545,
              network_id: "*" // Match any network id
            }
       },
       ropsten: {
        // provider: () =>
        //   new HDWalletProvider(process.env.MNENOMIC, process.env.ROPSTEN
        //     ),
        // network_id: "3",
        // skipDryRun: true
        // gasPrice: 1000000000 * 10, // 10 GWEI

        // gas: 4700000
      },
};
