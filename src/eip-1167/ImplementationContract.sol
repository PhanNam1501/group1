// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImplementationContract{
    bool private isInitialized;
    uint256 private count;
    function initializer() external {
        require(!isInitialized);
        isInitialized = true;
    }
    function getCount() external view returns(uint256) {
        return count;
    }
}