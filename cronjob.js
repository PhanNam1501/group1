const cron = require("node-cron");
const { ethers } = require("ethers");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY_1 || "";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);

async function getETHBalance() {
  const balance = await provider.getBalance(wallet.address);
  const ethBalance = ethers.formatEther(balance);
  console.log(`Số ETH trong ví ${wallet.address}: ${ethBalance} ETH`);
}
getETHBalance();

// cron.schedule("*/30 * * * * *", () => {
//   console.log("Cronjob đang chạy mỗi 30 giây:", new Date().toLocaleTimeString());

// });
