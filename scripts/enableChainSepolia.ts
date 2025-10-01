// scripts/enableChainSepolia.ts

import { network } from "hardhat";

async function main() {
  const connection = await network.connect({
    network: "ethereumSepolia"
  });

  const { ethers } = connection;
  const [signer] = await ethers.getSigners();

  console.log(`Using account: ${signer.address}`);

  // Get the contract factory by name
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);

  // Contract addresses and parameters
  const crosschainNFTAddressEthereumSepolia = `0xECDC15B68887211C9D5156D60A69BFcd69DFc6fC`;
  const crosschainNFTAddressKairosTestnet = `0x7dCdaa882603b1CfEEE42D1c382a1EcBA595d87c`;
  const chainSelectorKairosTestnet = `2624132734533621656`;
  const ccipExtraArgs = `0x97a657c9000000000000000000000000000000000000000000000000000000000007A120`;

  // Attach to the deployed contract
  const crosschainNFTSepolia = CrosschainNFT.attach(crosschainNFTAddressEthereumSepolia);

  console.log(`Enabling chain for Kairos Testnet...`);

  const tx = await crosschainNFTSepolia.enableChain(
    chainSelectorKairosTestnet,
    crosschainNFTAddressKairosTestnet,
    ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
  console.log(`Waiting for confirmation...`);

  const receipt = await tx.wait();
  
  console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
  console.log(`Chain enabled successfully!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});