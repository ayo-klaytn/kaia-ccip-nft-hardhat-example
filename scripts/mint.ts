// scripts/mint.ts

import { network } from "hardhat";

async function main() {
  // Connect to the network
  const connection = await network.connect({
    network: "ethereumSepolia"
  });

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


  const crosschainNFTAddressEthereumSepolia = `0xb1fe42BBd7842703820C7480c22409b872319B22`

  // Attach to the deployed contract
  const crosschainNFT = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);

  console.log(`Minting NFT...`);

  const tx = await crosschainNFT.mint();

  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);

  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`NFT minted successfully!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});