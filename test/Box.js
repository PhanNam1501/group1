const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");

describe("Box Contract", function () {
    let box;

    beforeEach(async function () {
        
        box = await ethers.getContractAt("Box", "0x4c4772Dd3Ddfd8a54CC842029cbc975214455862");
    });

    it("Should retrieve the value correctly", async function () {
        expect(await box.retrieve()).to.equal(0);
        await box.store(42);
        expect(await box.retrieve()).to.equal(42);
    });
});