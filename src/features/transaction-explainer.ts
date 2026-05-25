/**
 * Transaction Explainer
 * Translates blockchain transactions into human-readable explanations
 */

import pharosEngine from "../engine/pharos-engine";
import { TransactionExplanation } from "../types";

export class TransactionExplainer {
  /**
   * Explain a blockchain transaction
   * @param txHash - Transaction hash to explain
   */
  async explain(txHash: string): Promise<TransactionExplanation> {
    try {
      const txData = await pharosEngine.getTransaction(txHash);
      const explanation = this.parseTransaction(txData);

      return explanation;
    } catch (error) {
      throw new Error(`Transaction explanation failed: ${error}`);
    }
  }

  /**
   * Parse transaction data and generate explanation
   * @param txData - Transaction data from blockchain
   */
  private parseTransaction(txData: any): TransactionExplanation {
    const transactionType = this.detectTransactionType(txData);
    const summary = this.generateSummary(txData, transactionType);
    const gasFee = this.calculateGasFee(txData);
    const status = txData.status === "0x1" ? "success" : "failed";

    return {
      feature: "Transaction Explainer",
      transaction_type: transactionType,
      summary,
      gas_fee: gasFee,
      status,
    };
  }

  /**
   * Detect transaction type (swap, transfer, mint, etc)
   * @param txData - Transaction data
   */
  private detectTransactionType(txData: any): string {
    // Simplified detection logic
    // In production, would analyze function selectors and logs

    if (!txData.input || txData.input === "0x") {
      return "Transfer";
    }

    const functionSig = txData.input.slice(0, 10);

    const types: Record<string, string> = {
      "0xa9059cbb": "Token Transfer",
      "0x095ea7b3": "Token Approval",
      "0x2e1a7d4d": "Withdrawal",
      "0xd0e30db0": "Deposit",
    };

    return types[functionSig] || "Contract Interaction";
  }

  /**
   * Generate human-readable transaction summary
   * @param txData - Transaction data
   * @param type - Transaction type
   */
  private generateSummary(txData: any, type: string): string {
    const summaries: Record<string, string> = {
      Transfer: `Transferred funds from ${txData.from.slice(0, 6)}... to ${txData.to?.slice(0, 6)}...`,
      "Token Transfer": `Transferred tokens from ${txData.from.slice(0, 6)}... to ${txData.to?.slice(0, 6)}...`,
      "Token Approval": `Approved token spending on ${txData.to?.slice(0, 6)}...`,
      Withdrawal: `Withdrew funds from contract`,
      Deposit: `Deposited funds to contract`,
      "Contract Interaction": `Interacted with contract at ${txData.to?.slice(0, 6)}...`,
    };

    return summaries[type] || "Unknown transaction type";
  }

  /**
   * Calculate gas fee in human-readable format
   * @param txData - Transaction data
   */
  private calculateGasFee(txData: any): string {
    if (!txData.gasUsed || !txData.gasPrice) {
      return "Unable to calculate";
    }

    // Gas fee = gasUsed * gasPrice (in wei)
    const gasUsed = parseInt(txData.gasUsed, 16);
    const gasPrice = parseInt(txData.gasPrice, 16);
    const totalWei = gasUsed * gasPrice;

    // Convert to ETH (1 ETH = 10^18 wei)
    const totalEth = totalWei / 1e18;

    return `${totalEth.toFixed(6)} ETH`;
  }
}

export default new TransactionExplainer();
