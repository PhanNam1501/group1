const hre = require("hardhat");
const { upgrades } = require("hardhat");
const fs = require('fs');
const { ethers } = require("hardhat");
require("dotenv").config();
async function main() {

  const [signer] = await ethers.getSigners();

  const cex = await hre.ethers.getContractAt("CEX", process.env.CEX, signer);
  console.log("Cex_address: ", await cex.getAddress());
  const amountADesired = 10000;

  const token = await hre.ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", process.env.NAM_TOKEN, signer);

  //Test1: Buy token
  const balanceBefore = await token.balanceOf(signer);
  console.log(balanceBefore);
  const balance = await cex.getCurrentTokenPrice()
  if (balance > 10 ** 18) {
    console.log(balance);
  }
  console.log(balance);
  const value = 50_000_000_000n;
  const amount = value * 10n ** 9n / balance;
  console.log(amount);
  console.log("Done1");
  
  const tx1 = await cex.buyToken({value: value});
  await tx1.wait();
  console.log("Done2");

  const balanceAfter = await token.balanceOf(signer);
  console.log(balanceAfter);

  if (balanceAfter > balanceBefore) {
    console.log("Test1 is true");
  }

  //Test2: Sell token
  const balanceBefore1 = await token.balanceOf(signer);
  console.log(balanceBefore);
  console.log("Done3");

  const tx2 = await token.approve(process.env.CEX, 2);
  await tx2.wait();

  const tx3 = await cex.sellToken(2);
  await tx3.wait();
  console.log("Done4");

  const balanceAfter1 = await token.balanceOf(signer);
  console.log(balanceAfter1);

  if (balanceAfter1 < balanceBefore1) {
    console.log("Test2 is true");
  }



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

