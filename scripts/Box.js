const hre = require("hardhat");
const { upgrades } = require("hardhat");
const fs = require('fs');

async function main() {
    const Box = await hre.ethers.getContractFactory("Box")
    console.log("Deploying Box...");
    const box = await upgrades.deployProxy(Box,[42], { initializer: 'store' });
    console.log(box.target," box(proxy) address");
    console.log(await upgrades.erc1967.getImplementationAddress(box.target)," getImplementationAddress");
    console.log(await upgrades.erc1967.getAdminAddress(box.target)," getAdminAddress")  ;  


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

