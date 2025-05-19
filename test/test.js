const hre = require("hardhat");
const { upgrades } = require("hardhat");
const fs = require('fs');
const { ethers } = require("hardhat");
require("dotenv").config();
async function main() {
    
    const [signer] = await ethers.getSigners();





    const router = await hre.ethers.getContractAt("SaleCampaign", "0x396ef30dD5AD1A6DFBDCFcBA79c312e1D598a32E", signer);
    console.log("Sales_address: ", await router.getAddress());
    const amountADesired = 100;

    const tokenA = await hre.ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", "0x2e1Bf1A5f92198b459F4c73F71136161De339917", signer);

    await tokenA.approve(router.getAddress(), amountADesired);
  
    console.log(1);
    const price = await router.getTokenPrice();
    console.log("Price: ", price);
   
     


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

