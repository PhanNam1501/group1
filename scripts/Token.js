const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Token = await hre.ethers.deployContract("Token");
  console.log("Token deployed to:", Token.target);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

