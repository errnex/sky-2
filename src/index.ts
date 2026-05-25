/**
 * ASTOR - AI Web3 & RealFi Assistant
 * Main entry point for the application
 * Integrates all features and manages the Pharos Agent Center
 */

import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import features
import walletConnect from "./features/wallet-connect";
import nftChecker from "./features/nft-checker";
import reputationChecker from "./features/reputation";
import walletAssistant from "./features/wallet-assistant";
import transactionExplainer from "./features/transaction-explainer";
import realfiMonitor from "./features/realfi-monitor";

/**
 * ASTOR Assistant Class
 * Orchestrates all Web3 and RealFi features
 */
export class ASTOR {
  constructor() {
    this.initializeLogo();
  }

  /**
   * Display ASTOR logo on startup
   */
  private initializeLogo(): void {
    console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║                    🌟 ASTOR 🌟                        ║
    ║      AI-Powered Web3 & RealFi Assistant               ║
    ║         Pharos Agent Center Integration               ║
    ╚═══════════════════════════════════════════════════════╝
    `);
    console.log(
      "✨ Starting ASTOR... Your intelligent Web3 navigator is ready!\n"
    );
  }

  /**
   * Connect wallet
   * @param walletType - Type of wallet to connect
   */
  async connectWallet(walletType: string) {
    return await walletConnect.connect(walletType);
  }

  /**
   * Check NFT ownership
   * @param walletAddress - Wallet address
   * @param contractAddress - NFT contract address
   * @param tokenId - Optional token ID
   */
  async checkNFTOwnership(
    walletAddress: string,
    contractAddress: string,
    tokenId?: string
  ) {
    return await nftChecker.checkOwnership(walletAddress, contractAddress, tokenId);
  }

  /**
   * Generate wallet reputation
   * @param walletAddress - Wallet address
   */
  async generateReputation(walletAddress: string) {
    return await reputationChecker.generateReputation(walletAddress);
  }

  /**
   * Get wallet assistant help
   * @param question - User question
   * @param walletAddress - Wallet address
   */
  async getHelp(question: string, walletAddress?: string) {
    return await walletAssistant.answerQuestion(question, walletAddress);
  }

  /**
   * Explain transaction
   * @param txHash - Transaction hash
   */
  async explainTransaction(txHash: string) {
    return await transactionExplainer.explain(txHash);
  }

  /**
   * Monitor RealFi assets
   * @param walletAddress - Wallet address
   */
  async monitorRealFi(walletAddress: string) {
    return await realfiMonitor.monitor(walletAddress);
  }

  /**
   * Get wallet status report
   * @param walletAddress - Wallet address
   */
  async getWalletStatus(walletAddress: string) {
    return await walletAssistant.getStatusReport(walletAddress);
  }

  /**
   * Display all available features
   */
  displayFeatures(): void {
    console.log(`
    📋 **ASTOR Features:**
    
    1. 🔗 Wallet Connect
       Connect: Rabby, MetaMask, OKX, Phantom, Trust Wallet
    
    2. 🎨 NFT Ownership Checker
       Verify NFT and collection ownership on-chain
    
    3. 🏆 Wallet Reputation Checker
       Analyze wallet activity and trust score (0-100)
    
    4. 🤖 AI Wallet Assistant
       Ask questions about balances, NFTs, transactions, and gas
    
    5. 📝 Transaction Explainer
       Get human-readable explanations of blockchain transactions
    
    6. 🏦 RealFi Asset Monitor
       Track stablecoins, RWA tokens, and DeFi participation
    `);
  }
}

// Export singleton instance
export const astor = new ASTOR();

// Export features for direct access
export {
  walletConnect,
  nftChecker,
  reputationChecker,
  walletAssistant,
  transactionExplainer,
  realfiMonitor,
};

// Log startup info
if (require.main === module) {
  astor.displayFeatures();
  console.log("\n🚀 ASTOR is ready to assist with your Web3 journey!\n");
}