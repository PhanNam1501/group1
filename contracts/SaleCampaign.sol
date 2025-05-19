// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGroup1 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract SaleCampaign {
    address public owner;
    IGroup1 public token;
    uint256 public saleStartTime;
    uint256 public totalSold;
    uint256 public maxSaleAmount;
    uint256 public totalSupply;

    constructor(address _token, uint256 _totalSupply) {
        owner = msg.sender;
        token = IGroup1(_token);
        saleStartTime = block.timestamp;
        totalSupply = _totalSupply;
        maxSaleAmount = _totalSupply / 2;
    }


    function buyTokens(uint256 amount) external payable {
        require(block.timestamp <= saleStartTime + 30 days, "Sale ended");
        require(amount + totalSold <= maxSaleAmount, "Over maxSaleAmount");

        uint256 price = getTokenPrice();

        require(msg.value == price * amount, "Incorrect ETH sent");
        totalSold += amount;

        (bool sent, ) = payable(owner).call{value: msg.value}("");
        require(sent, "ETH transfer to owner failed");
        token.transferFrom(owner, msg.sender, amount);
    }

    function getTokenPrice() public view returns (uint256) {
        if (totalSold < maxSaleAmount / 4) {
            return 5;
        } else {
            return 10;
        }
    }

    // function withdrawTokens() external payable {
    //     require(msg.sender == owner, "Not owner");
    //     token.transfer(owner, token.balanceOf(address(this)));
    // }
}