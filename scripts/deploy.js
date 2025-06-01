const hre = require("hardhat");
const { upgrades } = require("hardhat");
const fs = require('fs');
require("dotenv").config();
async function main() {
  const Token = await hre.ethers.deployContract("NamToken", [1000000000000]);

  console.log(Token.target);

  const CEX = await hre.ethers.deployContract("CEX", [Token.target, 100000]);

  console.log(CEX.target);

  const [signer] = await ethers.getSigners();

  const cex = await hre.ethers.getContractAt("CEX", CEX.target, signer);
  console.log("Cex_address: ", await cex.getAddress());
  const amountADesired = 10000;

  const token = await hre.ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", Token.target, signer);
  const tx = await token.approve(CEX.target, 100000);
  await tx.wait();
  console.log("Deploy Done");

  const tx1 = await signer.sendTransaction({
    to: CEX.target,
    value: ethers.parseEther("0.1"),  // 0.5 ETH
  });
  await tx1.wait();
  console.log("Sent 0.5 ETH to contract address");




}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

