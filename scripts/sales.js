const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const initialSupply = hre.ethers.parseUnits("10000000000", 18); // 1000 tokens with 18 decimals

    const Group1 = await hre.ethers.deployContract("Group1", [initialSupply]);
    console.log("Token deployed to:", Group1.target);

    const Sales = await hre.ethers.deployContract("SaleCampaign", [Group1.target, 100])
    console.log("Sales deployed to:", Sales.target);

    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

