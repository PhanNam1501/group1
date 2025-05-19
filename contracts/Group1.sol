// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Group1 is ERC20 {
    constructor (uint256 amount) ERC20("Group1", "GP1") {
        _mint(msg.sender, amount);
    }
}