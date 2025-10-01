// scripts/enableChainKairos.ts

import { network } from "hardhat";

async function main() {
  const connection = await network.connect({
    network: "kairosTestnet"
  });

  const { ethers } = connection;
  const [signer] = await ethers.getSigners();

  console.log(`Using account: ${signer.address}`);

  // Get the contract factory by name
  const CrosschainNFT = await ethers.getContractFactory("CrosschainNFT", signer);

  // Contract addresses and parameters 
  const crosschainNFTAddressKairosTestnet = `0x7dCdaa882603b1CfEEE42D1c382a1EcBA595d87c`;
  const crosschainNFTAddressEthereumSepolia = `0xECDC15B68887211C9D5156D60A69BFcd69DFc6fC`;
  const chainSelectorEthereumSepolia = `16015286601757825753`;
  const ccipExtraArgs = `0x97a657c9000000000000000000000000000000000000000000000000000000000007A120`;

  // Attach to the deployed contract on Kairos
  const crosschainNFTKairos = CrosschainNFT.attach(crosschainNFTAddressKairosTestnet);

  console.log(`Enabling chain for Ethereum Sepolia...`);

  const tx = await crosschainNFTKairos.enableChain(
    chainSelectorEthereumSepolia,         
    crosschainNFTAddressEthereumSepolia,    
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