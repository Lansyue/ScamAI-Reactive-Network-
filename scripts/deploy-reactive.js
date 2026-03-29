const { ethers } = require("hardhat");

async function main() {
  const origin = process.env.ORIGIN_CONTRACT;
  const destination = process.env.DESTINATION_CONTRACT;

  if (!origin || !destination) {
    throw new Error("Missing ORIGIN_CONTRACT or DESTINATION_CONTRACT");
  }

  const Reactive = await ethers.getContractFactory("Reactive");
  const reactive = await Reactive.deploy(origin, destination);
  await reactive.waitForDeployment();

  console.log("Reactive deployed:", await reactive.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
