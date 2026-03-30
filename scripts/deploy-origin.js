const { ethers } = require("hardhat");

async function main() {
  const relayer = process.env.RELAYER_ADDRESS;
  if (!relayer) {
    throw new Error("Missing RELAYER_ADDRESS");
  }

  const Origin = await ethers.getContractFactory("Origin");
  const origin = await Origin.deploy(relayer);
  await origin.waitForDeployment();

  console.log("Origin deployed:", await origin.getAddress());
  console.log("Origin deployment tx:", origin.deploymentTransaction()?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
