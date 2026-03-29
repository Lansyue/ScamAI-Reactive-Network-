const { ethers } = require("hardhat");

async function main() {
  const callbackProxy = process.env.CALLBACK_PROXY || ethers.ZeroAddress;
  const reactive = process.env.REACTIVE_CONTRACT || ethers.ZeroAddress;
  const rewardAmount = process.env.REWARD_AMOUNT || ethers.parseEther("0.005");

  const Destination = await ethers.getContractFactory("Destination");
  const destination = await Destination.deploy(callbackProxy, reactive, rewardAmount, {
    value: ethers.parseEther(process.env.INITIAL_PRIZE_POOL || "0.1")
  });
  await destination.waitForDeployment();

  console.log("Destination deployed:", await destination.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
