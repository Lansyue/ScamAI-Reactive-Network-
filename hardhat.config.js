require("@nomicfoundation/hardhat-ethers");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RELAYER_PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY;

function accountsFor(...keys) {
  return keys.filter(Boolean);
}

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: accountsFor(PRIVATE_KEY, RELAYER_PRIVATE_KEY)
    },
    destination: {
      url: process.env.POLYGON_RPC_URL || "",
      accounts: accountsFor(PRIVATE_KEY, RELAYER_PRIVATE_KEY)
    },
    reactive: {
      url: process.env.REACTIVE_RPC_URL || "https://lasna-rpc.rnk.dev/",
      accounts: accountsFor(PRIVATE_KEY, RELAYER_PRIVATE_KEY)
    }
  }
};
