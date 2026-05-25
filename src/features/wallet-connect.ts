/**
 * Wallet Connect System
 * Handles connection flow for multiple wallet types
 * Supported: Rabby, MetaMask, OKX, Phantom, Trust Wallet
 */

import { WalletConnection } from "../types";

export class WalletConnect {
  private supportedWallets = ["rabby", "metamask", "okx", "phantom", "trust"];

  /**
   * Connect wallet by type
   * @param walletType - Type of wallet to connect
   */
  async connect(walletType: string): Promise<WalletConnection> {
    // Validate wallet type
    if (!this.supportedWallets.includes(walletType.toLowerCase())) {
      return {
        status: "error",
        message: `Wallet type ${walletType} not supported. Supported: ${this.supportedWallets.join(", ")}`,
      };
    }

    try {
      // Check if wallet extension is installed
      const walletExists = await this.checkWalletInstalled(walletType);

      if (!walletExists) {
        return {
          status: "error",
          message: "Wallet extension not detected. Please install the selected wallet first.",
        };
      }

      // Request wallet connection
      const connection = await this.requestConnection(walletType);
      return connection;
    } catch (error) {
      return {
        status: "error",
        message: `Connection failed: ${error}`,
      };
    }
  }

  /**
   * Check if wallet extension is installed
   * @param walletType - Wallet type to check
   */
  private async checkWalletInstalled(walletType: string): Promise<boolean> {
    // Browser environment check
    if (typeof window === "undefined") return false;

    const walletProviders: Record<string, string> = {
      rabby: "rabby",
      metamask: "ethereum",
      okx: "okxwallet",
      phantom: "solana",
      trust: "trustwallet",
    };

    const provider = walletProviders[walletType.toLowerCase()];
    return !!(provider && (window as any)[provider]);
  }

  /**
   * Request wallet connection
   * @param walletType - Wallet type
   */
  private async requestConnection(walletType: string): Promise<WalletConnection> {
    // Simulated wallet connection
    // In production, this would interact with actual wallet APIs

    // Simulate message signing for authentication
    const wallet = (window as any)[walletType.toLowerCase()];

    if (!wallet || !wallet.request) {
      return {
        status: "rejected",
        message: "Signature request cancelled by user.",
      };
    }

    try {
      const accounts = await wallet.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        return {
          status: "rejected",
          message: "Signature request cancelled by user.",
        };
      }

      // Request message signature (not transaction)
      const message = "Sign in to ASTOR\n\nThis action does not cost gas.";
      const signature = await wallet.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      });

      if (!signature) {
        return {
          status: "rejected",
          message: "Signature request cancelled by user.",
        };
      }

      return {
        status: "connected",
        wallet_address: accounts[0],
        wallet_type: walletType,
        chain: "pharos",
      };
    } catch (error) {
      return {
        status: "rejected",
        message: `Connection rejected: ${error}`,
      };
    }
  }
}

export default new WalletConnect();
