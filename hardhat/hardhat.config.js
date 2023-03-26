require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337, // default is 31337
    },
    // scrollTestnet: {
    //   url: process.env.SCROLL_TESTNET_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    scrollTestnet: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [
        "bb135cbe9c7af0c586dc9e3388c6c7aaa2f636dbb15cbe01d12be23bc9384c24",
      ],
    },
  },
};
