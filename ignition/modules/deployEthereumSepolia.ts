// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ETHEREUM_SEPOLIA_ROUTER_ADDRESS = `0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59`;
const ETHEREUM_SEPOLIA_LINK_TOKEN_ADDRESS = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
const ETHEREUM_SEPOLIA_CHAIN_SELECTOR = `16015286601757825753`;

const CrosschainNFTSepoliaModule = buildModule("CrosschainNFTSepoliaModule", (m) => {

  const crosschainNFTSepolia = m.contract("CrosschainNFT", [ETHEREUM_SEPOLIA_ROUTER_ADDRESS, ETHEREUM_SEPOLIA_LINK_TOKEN_ADDRESS, ETHEREUM_SEPOLIA_CHAIN_SELECTOR], {

  });

  return { crosschainNFTSepolia };
});

export default CrosschainNFTSepoliaModule;
