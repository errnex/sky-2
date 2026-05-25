## 🎯 Core Features

### 1. 🔗 Wallet Connect System
Seamless multi-wallet connection with message signature authentication:
- **Supported Wallets**: Rabby, MetaMask, OKX, Phantom, Trust Wallet
- **Connection Flow**: 
  - Detects wallet extension installation
  - Requests wallet connection popup
  - Requests message signature (NOT transactions)
  - Returns: `wallet_address`, `wallet_type`, `chain`

### 2. 🎨 NFT Ownership Checker
On-chain verification of NFT ownership:
- **Check Specific Token**: Queries `ownerOf(tokenId)` 
- **Check Collection**: Queries `balanceOf(address)`
- **Output**: Ownership status with contract and token details

**Example:**
```typescript
await nftChecker.checkOwnership(
  "0x742d...", 
  "0x1234...", 
  "1"
);
```

### 3. 🏆 Wallet Reputation Checker
Analyzes wallet activity and generates trust score (0-100):
- **Metrics**: Wallet age, transaction frequency, NFT activity, staking, DeFi interaction
- **Trust Levels**: Trusted (80+), Good (60-79), Neutral (40-59), Risky (<40)
- **Output**: Score with constructive feedback

**Reputation Levels:**
```
Trusted: 80-100 (Active Web3 participant)
Good: 60-79 (Solid engagement)
Neutral: 40-59 (Moderate participation)
Risky: <40 (New or limited engagement)
```

### 4. 🤖 AI Wallet Assistant
Conversational helper for Web3 guidance:
- **Capabilities**: Explain balances, NFTs, transactions, gas fees, DeFi opportunities
- **Questions Supported**: "What's my balance?", "Do I have NFTs?", "What's gas?", etc.
- **Output**: Human-readable explanations and status reports

### 5. 📝 Transaction Explainer
Translates blockchain transactions into plain English:
- **Detects Transaction Types**: Transfer, Token Swap, Approval, Deposit, Withdrawal
- **Analyzes**: Sender, receiver, token movement, gas fees, contract interaction
- **Output**: Transaction type, summary, gas fee, status

**Example Explanation:**
```
"You swapped ETH for USDC using a decentralized exchange"
```

### 6. 🏦 RealFi Asset Monitor
Tracks tokenized real-world assets and stablecoin positions:
- **Monitors**: Stablecoin balances, RWA exposure, staking positions
- **Tracks**: Protocol usage, cross-chain liquidity, DeFi participation
- **Output**: Stablecoin balance, RealFi exposure level, active protocols

---

## 🛠️ Tech Architecture

```
ASTOR
├── Engine (Pharos Integration)
│   ├── pharos-engine.ts (cast CLI wrapper)
│   └── RPC Manager (Network configuration)
├── Features
│   ├── wallet-connect.ts
│   ├── nft-checker.ts
│   ├── reputation.ts
│   ├── wallet-assistant.ts
│   ├── transaction-explainer.ts
│   └── realfi-monitor.ts
├── Types
│   └── index.ts (TypeScript interfaces)
├── Assets
│   └── networks.json (Network & wallet config)
└── Main Entry (index.ts)
```

### Pharos Engine Rules
- ✅ **Always** use Pharos Skill Engine for blockchain operations
- ✅ **Always** use cast CLI for on-chain verification
- ✅ **Always** prefer on-chain data over external APIs
- ❌ **Never** expose private keys
- ❌ **Never** request transactions during login (signature only)

---

## 🔐 Security Best Practices

### Wallet Connection
- Request signature, NOT transactions
- Always explain why signature is needed
- Never auto-approve actions
- Verify wallet extension installation first

### Data Handling
- Always verify on-chain data
- Use Pharos RPC endpoints
- Log all feature usage
- Implement signature verification

### User Protection
- Never shame users with reputation scores
- Keep feedback constructive
- Explain all technical concepts simply
- Always prioritize transparency

---

## 🎨 UI/UX Theme

**ASTOR Design System:**
- **Aesthetic**: Futuristic glassmorphism
- **Colors**: Dark mode with neon blue/purple accents
- **Typography**: Clean, modern, readable
- **Animation**: Smooth transitions, minimal clutter
- **Tone**: Intelligent, trustworthy, calm

---

## 📋 Project Structure

```
sky-2/
├── src/
│   ├── engine/
│   │   └── pharos-engine.ts          # Blockchain operations
│   ├── features/
│   │   ├── wallet-connect.ts         # Multi-wallet support
│   │   ├── nft-checker.ts            # NFT verification
│   │   ├── reputation.ts             # Trust scoring
│   │   ├── wallet-assistant.ts       # Conversational AI
│   │   ├── transaction-explainer.ts  # TX analysis
│   │   └── realfi-monitor.ts         # RWA tracking
│   ├── types/
│   │   └── index.ts                  # TypeScript definitions
│   └── index.ts                      # Main application
├── assets/
│   └── networks.json                 # Network config
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add Pharos Skill Engine
npx skills add https://github.com/PharosNetwork/pharos-skill-engine

# 3. Configure environment
cp .env.example .env

# 4. Build TypeScript
npm run build

# 5. Start ASTOR
npm start
```

---

## 📦 API Reference

### Wallet Connect
```typescript
const result = await walletConnect.connect("metamask");
// {
//   status: "connected",
//   wallet_address: "0x...",
//   wallet_type: "metamask",
//   chain: "pharos"
// }
```

### NFT Checker
```typescript
const result = await nftChecker.checkOwnership(
  walletAddress,
  contractAddress,
  tokenId
);
```

### Reputation Checker
```typescript
const result = await reputationChecker.generateReputation(walletAddress);
// {
//   feature: "Wallet Reputation Checker",
//   score: 85,
//   level: "Trusted",
//   summary: "..."
// }
```

### Wallet Assistant
```typescript
const help = await walletAssistant.answerQuestion(
  "What NFTs do I own?",
  walletAddress
);
```

### Transaction Explainer
```typescript
const explanation = await transactionExplainer.explain(txHash);
// {
//   feature: "Transaction Explainer",
//   transaction_type: "Token Transfer",
//   summary: "...",
//   gas_fee: "0.005 ETH",
//   status: "success"
// }
```

### RealFi Monitor
```typescript
const realfi = await realfiMonitor.monitor(walletAddress);
// {
//   feature: "RealFi Asset Monitor",
//   stablecoin_balance: "1000 USDC",
//   realfi_exposure: "Moderate",
//   active_protocols: ["Pharos RealFi", "RWA Marketplace"],
//   summary: "..."
// }
```

---

## 🌐 Supported Networks

| Network | Chain ID | RPC | Currency |
|---------|----------|-----|----------|
| Pharos | 1 | https://rpc.pharos.network | PHA |
| Ethereum | 1 | https://eth.pharos.network | ETH |
| Polygon | 137 | https://polygon.pharos.network | MATIC |

---

## 💡 Design Philosophy

**ASTOR is built on these principles:**

1. **Beginner-Friendly**: Explain concepts in simple language
2. **Safety First**: Prioritize user security and transparency
3. **Web3-Native**: Built for the decentralized ecosystem
4. **Trust-Based**: Build reputation, not shame
5. **Intelligent**: AI-powered guidance and analysis
6. **Transparent**: Always explain what's happening

---

## 📝 Global Rules

- ✅ Always explain actions clearly
- ✅ Never initiate transactions automatically
- ✅ Never expose private keys
- ✅ Use clean JSON outputs
- ✅ Keep responses concise and friendly
- ✅ Use Pharos Skill Engine exclusively
- ❌ Never request transactions during login
- ❌ Never use external APIs unless explicitly allowed

---

## 🔗 Integration with Pharos Agent Center

ASTOR integrates seamlessly with Pharos Agent Center through:
- **Skill Engine**: `npx skills add https://github.com/PharosNetwork/pharos-skill-engine`
- **RPC Configuration**: Load networks from `assets/networks.json`
- **Cast CLI**: Direct access to blockchain operations
- **Signature Verification**: On-chain message validation

---

## 📚 Resources

- **Pharos Network**: https://pharos.network
- **Pharos Agent Center**: https://pharos.network/agent-center
- **Skill Engine**: https://github.com/PharosNetwork/pharos-skill-engine
- **Documentation**: `/docs` directory

---

**ASTOR** - Your intelligent navigator for Web3 and RealFi ✨

Created with ❤️ for the Pharos Network
