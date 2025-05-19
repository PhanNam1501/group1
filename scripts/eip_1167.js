const hre = require("hardhat");
const { upgrades } = require("hardhat");
const fs = require('fs');

async function main() {
    // const Box = await hre.ethers.getContractFactory("Box")
    // console.log("Deploying Box...");
    // const box = await upgrades.deployProxy(Box,[42], { initializer: 'store' });
    // console.log(box.target," box(proxy) address");
    // console.log(await upgrades.erc1967.getImplementationAddress(box.target)," getImplementationAddress");
    // console.log(await upgrades.erc1967.getAdminAddress(box.target)," getAdminAddress")  ;  

    const ImplementationContract = await hre.ethers.deployContract(
        "ImplementationContract"
    );
    console.log("Implementation contract ", ImplementationContract.target);
    
    const MinimalProxyFactory = await hre.ethers.deployContract(
        "MinimalProxyFactory"
    );
    console.log("Minimal proxy factory contract ", MinimalProxyFactory.target);

    const deployCloneContract = await MinimalProxyFactory.deployClone(
        ImplementationContract.target
      );
    deployCloneContract.wait();

    const ProxyAddress = await MinimalProxyFactory.proxies(0);
    console.log("Proxy contract ", ProxyAddress);

    const proxy = await hre.ethers.getContractAt(
        "ImplementationContract",
        ProxyAddress
    );
    console.log("Proxy contract ", proxy);
    // await proxy.initializer()
    console.log("Proxy is initialized == ", await proxy.getCount());


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

