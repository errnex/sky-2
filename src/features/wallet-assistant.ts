/**
 * AI Wallet Assistant
 * Helps users understand wallet assets and activity
 * Explains balances, NFTs, transactions, gas usage, and token activity
 */

import pharosEngine from "../engine/pharos-engine";

export class WalletAssistant {
  /**
   * Get wallet asset summary
   * @param walletAddress - Wallet address
   */
  async getAssetSummary(walletAddress: string): Promise<string> {
    try {
      const balance = await pharosEngine.getBalance(walletAddress);
      const summary = `Your wallet has a balance of ${balance} units. You can use this to interact with dApps and make transactions.`;

      return summary;
    } catch (error) {
      return `Unable to fetch wallet summary: ${error}`;
    }
  }

  /**
   * Explain wallet holdings
   * @param walletAddress - Wallet address
   */
  async explainHoldings(walletAddress: string): Promise<string> {
    try {
      const balance = await pharosEngine.getBalance(walletAddress);
      const balanceNum = parseInt(balance) / 1e18; // Convert to ETH

      if (balanceNum === 0) {
        return `Your wallet appears to be empty. You have no holdings at the moment. Consider acquiring some tokens to start your Web3 journey!`;
      }

      return `You're holding ${balanceNum.toFixed(4)} ETH in this wallet. This gives you access to swap, lend, and other DeFi opportunities on supported protocols.`;
    } catch (error) {
      return `Unable to explain holdings: ${error}`;
    }
  }

  /**
   * Answer common wallet questions
   * @param question - User question
   * @param walletAddress - User's wallet address
   */
  async answerQuestion(question: string, walletAddress?: string): Promise<string> {
    const lowercaseQ = question.toLowerCase();

    // Balance-related questions
    if (
      lowercaseQ.includes("balance") ||
      lowercaseQ.includes("how much") ||
      lowercaseQ.includes("holdings")
    ) {
      return walletAddress
        ? await this.explainHoldings(walletAddress)
        : "Please connect your wallet first to check your balance.";
    }

    // NFT-related questions
    if (lowercaseQ.includes("nft") || lowercaseQ.includes("collectible")) {
      return "To check your NFT collection, connect your wallet and use the NFT Ownership Checker feature.";
    }

    // Transaction questions
    if (lowercaseQ.includes("transaction") || lowercaseQ.includes("tx")) {
      return "Use the Transaction Explainer to understand any transaction. Paste the transaction hash to get a human-readable explanation.";
    }

    // Gas-related questions
    if (lowercaseQ.includes("gas") || lowercaseQ.includes("fee")) {
      return "Gas fees depend on network congestion and your transaction complexity. The Transaction Explainer will show your actual fees.";
    }

    // DeFi questions
    if (lowercaseQ.includes("defi") || lowercaseQ.includes("swap") || lowercaseQ.includes("liquidity")) {
      return "ASTOR helps you navigate DeFi. Connect your wallet, check your reputation, and explore opportunities on supported protocols.";
    }

    // Default response
    return "I'm here to help you navigate Web3! Ask me about balances, NFTs, transactions, gas fees, or DeFi opportunities.";
  }

  /**
   * Get wallet status report
   * @param walletAddress - Wallet address
   */
  async getStatusReport(walletAddress: string): Promise<string> {
    try {
      const balance = await pharosEngine.getBalance(walletAddress);
      const balanceNum = parseInt(balance) / 1e18;

      let status = `📊 **Wallet Status Report**\n\n`;
      status += `Address: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}\n`;
      status += `Balance: ${balanceNum.toFixed(4)} ETH\n`;
      status += `Status: ${balanceNum > 0 ? "✅ Active" : "⚠️ Empty"}\n\n`;
      status += `Next Steps:\n`;
      status += `- Check your reputation score\n`;
      status += `- Verify your NFT ownership\n`;
      status += `- Explore DeFi opportunities\n`;

      return status;
    } catch (error) {
      return `Unable to generate status report: ${error}`;
    }
  }
}

export default new WalletAssistant();
