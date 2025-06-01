// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface INamToken {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external returns (uint256);
}

contract CEX {
    uint256 public constant INITIAL_SUPPLY = 100_000 * 1e18;
    uint256 public constant INITIAL_PRICE = 5 ether;
    uint256 public deploymentTime;
    INamToken public token;
    uint256 public totalSupply;
    uint256 public totalSold;

    address public owner;

    constructor(address _token, uint256 _totalSupply) {
        owner = msg.sender;
        token = INamToken(_token);
        totalSupply = _totalSupply;
    }

    receive() external payable {}


    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function getCurrentTokenPrice() public view returns (uint256) {
        uint256 ethBalance = owner.balance;

        uint256 interestRate = (ethBalance)/ (2 * 10 ** 9); 

        uint256 newPrice = INITIAL_PRICE +
            (INITIAL_PRICE * interestRate  / 1e18);
        return newPrice;
    }

    /// @notice Buy token by sending ETH
    function buyToken() external payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 price = getCurrentTokenPrice();
        uint256 amountToBuy = msg.value * 10 ** 9 / price;

        require(totalSupply >= amountToBuy + totalSold, "Not enough tokens");

        (bool sent, ) = payable(owner).call{value: msg.value}("");
        require(sent, "ETH transfer to owner failed");
        totalSold += amountToBuy;
        
        token.transferFrom(owner, msg.sender, amountToBuy);
    }

    /// @notice Sell token and receive ETH
    function sellToken(uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, "Not enough tokens");

        uint256 price = getCurrentTokenPrice();
        uint256 ethToTransfer = amount * price / (10 ** 9);

        require(address(this).balance >= ethToTransfer, "Contract lacks ETH");
        totalSold -= amount;
        token.transferFrom(msg.sender, owner, amount);
        payable(msg.sender).transfer(ethToTransfer);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }



}
