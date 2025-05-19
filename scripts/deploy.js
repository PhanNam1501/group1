const hre = require("hardhat");
const { upgrades } = require("hardhat");
const fs = require('fs');
require("dotenv").config();
async function main() {
    const Counter = await hre.ethers.deployContract("Counter");
    
    console.log(Counter.target);
     


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

