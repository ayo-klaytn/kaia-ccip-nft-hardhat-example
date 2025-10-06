// scripts/crossChainTransferNFT.ts

import { network } from "hardhat";

async function main() {
  // Connect to the network
  const connection = await network.connect({
    network: "ethereumSepolia"
  });

    // Check if we're on the correct network
  if (connection.networkName !== "ethereumSepolia") {
    console.error(`Must be called from Ethereum Sepolia`);
    process.exitCode = 1;
    return;
  }

  const { ethers } = connection;
  const [signer] = await ethers.getSigners();

  console.log(`Using account: ${signer.address}`);

  // Get the contract factory
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);

  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`;

  // Transfer parameters
  const from = `0x7b467A6962bE0ac80784F131049A25CDE27d62Fb`;
  const to = `0x7b467A6962bE0ac80784F131049A25CDE27d62Fb`;
  const tokenId = 0; // Put NFT token id here
  const destinationChainSelector = "2624132734533621656"; // Kairos Testnet
  const payFeesIn = 1; // 0 - Native, 1 - LINK

  // Attach to the deployed contract
  const crosschainNFT = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);

  const tx = await crosschainNFT.crossChainTransferFrom(
    from,
    to,
    tokenId,
    destinationChainSelector,
    payFeesIn
  );

  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);

  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Cross-chain transfer initiated successfully!`);
  console.log(`Note: The NFT will arrive on Kairos Testnet after CCIP processes the message.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});