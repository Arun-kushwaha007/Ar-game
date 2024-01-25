const hre = require("hardhat");
const { PUBLIC_KEY_OWNER } = require("../constants");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const initial_owner = PUBLIC_KEY_OWNER;
  const nftContract = await hre.ethers.deployContract("FlappyBird", [
    initial_owner,
  ]);

  // wait for the contract to deploy
  await nftContract.waitForDeployment();

  // print the address of the deployed contract
  console.log("NFT Contract Address:", nftContract.target);

  // Sleep for 20 seconds while Etherscan indexes the new contract deployment
  await sleep(5 * 1000);

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [initial_owner],
  });

  const leaderboardContract = await hre.ethers.deployContract(
    "AddressValueMap"
  );

  await leaderboardContract.waitForDeployment();

  console.log("Leaderboard Contract Address:", leaderboardContract.target);

  await sleep(5 * 1000);

  await hre.run("verify:verify", {
    address: leaderboardContract.target,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
