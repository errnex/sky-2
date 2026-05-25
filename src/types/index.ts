/**
 * Types for ASTOR Web3 Assistant
 * Defines interfaces for wallet connections, transactions, and blockchain interactions
 */

export interface WalletConnection {
  status: "connected" | "error" | "rejected";
  wallet_address?: string;
  wallet_type?: string;
  chain?: string;
  message?: string;
}

export interface NFTOwnershipResult {
  feature: string;
  ownership_status: boolean;
  wallet: string;
  contract: string;
  token_id?: string;
  message: string;
}

export interface WalletReputation {
  feature: string;
  score: number;
  level: "Trusted" | "Good" | "Neutral" | "Risky";
  summary: string;
}

export interface TransactionExplanation {
  feature: string;
  transaction_type: string;
  summary: string;
  gas_fee: string;
  status: "success" | "failed" | "pending";
}

export interface RealFiAssetMonitor {
  feature: string;
  stablecoin_balance: string;
  realfi_exposure: string;
  active_protocols: string[];
  summary: string;
}

export interface NetworkConfig {
  name: string;
  chainId: number;
  rpc: string;
  explorer: string;
  currency: string;
}

export interface WalletConfig {
  name: string;
  id: string;
  icon: string;
}
