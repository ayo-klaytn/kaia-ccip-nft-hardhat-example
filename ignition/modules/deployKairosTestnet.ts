// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KAIROS_TESTNET_ROUTER_ADDRESS = `0x41477416677843fCE577748D2e762B6638492755`;
const KAIROS_TESTNET_LINK_TOKEN_ADDRESS = `0xAF3243f975afe2269Da8Ffa835CA3A8F8B6A5A36`;
const KAIROS_TESTNET_CHAIN_SELECTOR = `2624132734533621656`;

const CrosschainNFTKairosModule = buildModule("CrosschainNFTKairosModule", (m) => {

  const crosschainNFTKairos = m.contract("CrosschainNFT", [KAIROS_TESTNET_ROUTER_ADDRESS, KAIROS_TESTNET_LINK_TOKEN_ADDRESS, KAIROS_TESTNET_CHAIN_SELECTOR], {

  });

  return { crosschainNFTKairos };
});

export default CrosschainNFTKairosModule;
