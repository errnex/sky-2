/**
 * NFT Ownership Checker
 * Verifies whether a wallet owns a specific NFT or collection
 * Uses on-chain verification via cast CLI
 */

import pharosEngine from "../engine/pharos-engine";
import { NFTOwnershipResult } from "../types";

export class NFTChecker {
  /**
   * Check if wallet owns an NFT token
   * @param walletAddress - Wallet address to check
   * @param nftContractAddress - NFT contract address
   * @param tokenId - Optional token ID for specific NFT
   */
  async checkOwnership(
    walletAddress: string,
    nftContractAddress: string,
    tokenId?: string
  ): Promise<NFTOwnershipResult> {
    try {
      let ownershipStatus = false;

      if (tokenId) {
        // Check ownership for specific token
        ownershipStatus = await this.checkTokenOwnership(
          walletAddress,
          nftContractAddress,
          tokenId
        );
      } else {
        // Check balance for collection
        ownershipStatus = await this.checkCollectionBalance(walletAddress, nftContractAddress);
      }

      return {
        feature: "NFT Ownership Checker",
        ownership_status: ownershipStatus,
        wallet: walletAddress,
        contract: nftContractAddress,
        token_id: tokenId,
        message: "NFT verification completed successfully.",
      };
    } catch (error) {
      throw new Error(`NFT ownership check failed: ${error}`);
    }
  }

  /**
   * Check ownership of a specific NFT token
   * @param walletAddress - Wallet address
   * @param contractAddress - NFT contract address
   * @param tokenId - Token ID
   */
  private async checkTokenOwnership(
    walletAddress: string,
    contractAddress: string,
    tokenId: string
  ): Promise<boolean> {
    try {
      // Call ownerOf(tokenId) to get the owner
      const owner = await pharosEngine.call(
        contractAddress,
        "ownerOf(uint256)",
        tokenId
      );

      // Compare owner with wallet address (accounting for checksums)
      return owner.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
      console.error(`Token ownership check failed: ${error}`);
      return false;
    }
  }

  /**
   * Check balance for NFT collection
   * @param walletAddress - Wallet address
   * @param contractAddress - NFT contract address
   */
  private async checkCollectionBalance(
    walletAddress: string,
    contractAddress: string
  ): Promise<boolean> {
    try {
      // Call balanceOf(address) to get balance
      const balance = await pharosEngine.call(
        contractAddress,
        "balanceOf(address)",
        walletAddress
      );

      // Parse balance (handle hex encoding)
      const balanceNum = parseInt(balance, 16);
      return balanceNum > 0;
    } catch (error) {
      console.error(`Balance check failed: ${error}`);
      return false;
    }
  }
}

export default new NFTChecker();
