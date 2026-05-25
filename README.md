# ASTOR - AI Web3 & RealFi Assistant

**ASTOR** is an intelligent blockchain assistant powered by the **Pharos Agent Center** and integrated with the **Pharos Skill Engine**. It provides a seamless, beginner-friendly experience for users interacting with wallets, NFTs, transactions, and RealFi assets.

## 🌟 Core Features

1. **Wallet Connect System** - Support for Rabby, MetaMask, OKX, Phantom, Trust Wallet
2. **NFT Ownership Checker** - Verify NFT and collection ownership on-chain
3. **Wallet Reputation Checker** - Analyze wallet activity and generate trust scores
4. **AI Wallet Assistant** - Understand balances, NFTs, and transactions
5. **Transaction Explainer** - Human-readable blockchain transaction analysis
6. **RealFi Asset Monitor** - Track RealFi and RWA-related activity

## 🎯 Design Philosophy

- **Beginner-Friendly**: Explain blockchain concepts in simple language
- **Safety First**: Prioritize user security and transparency
- **Web3-Native**: Built for the decentralized ecosystem
- **Futuristic UI**: Glassmorphism design with neon accents

## 🚀 Quick Start

```bash
# Install Pharos Skill Engine
npx skills add https://github.com/PharosNetwork/pharos-skill-engine

# Install dependencies
npm install

# Start the assistant
npm start
```

## 📦 Tech Stack

- **Runtime**: Node.js / TypeScript
- **Blockchain Engine**: Pharos Skill Engine (cast CLI, forge-compatible)
- **RPC**: On-chain verification via Pharos network configuration
- **UI**: Futuristic theme with dark mode

## 📋 Project Structure

```
.
├── src/
│   ├── features/
│   │   ├── wallet-connect.ts
│   │   ├── nft-checker.ts
│   │   ├── reputation.ts
│   │   ├── wallet-assistant.ts
│   │   ├── transaction-explainer.ts
│   │   └── realfi-monitor.ts
│   ├── engine/
│   │   ├── pharos-engine.ts
│   │   └── rpc-manager.ts
│   ├── ui/
│   │   └── astor-theme.ts
│   └── index.ts
├── assets/
│   └── networks.json
├── package.json
└── tsconfig.json
```

## 🔐 Security & Rules

- Never request transactions during login (signature only)
- Always use on-chain verification
- Never expose private keys
- Always explain actions clearly
- Use Pharos Skill Engine exclusively for blockchain operations

## 📚 Documentation

See `/docs` for detailed feature documentation and integration guides.

---

**ASTOR** - Your intelligent navigator for Web3 and RealFi ✨
