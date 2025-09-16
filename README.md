# 🗳️ SecurePoll Vault

> **The Future of Anonymous Voting is Here**

A revolutionary decentralized voting platform powered by **Fully Homomorphic Encryption (FHE)** technology. Experience the next generation of secure, private, and transparent democratic participation where your voice matters and your privacy is guaranteed.

## ✨ What Makes Us Different

- 🔐 **Zero-Knowledge Voting**: Your choices remain encrypted even during computation
- 🌐 **Truly Decentralized**: No central authority can manipulate or access your votes
- 🚀 **Lightning Fast**: Vote and see results in real-time without compromising privacy
- 🎯 **Smart Contracts**: Automated, transparent, and tamper-proof voting processes
- 🔗 **Multi-Wallet Support**: Connect with your preferred Web3 wallet seamlessly
- 📊 **Live Analytics**: Real-time poll statistics with complete voter anonymity

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Blockchain**: Ethereum, Wagmi, RainbowKit
- **Encryption**: Zama FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity ^0.8.24

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/martha-rich/secure-poll-vault.git
cd secure-poll-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contract Deployment

The smart contract uses FHE for encrypted voting. Deploy to Sepolia testnet:

```bash
# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Deploy the contract
forge build
forge create --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY contracts/SecurePollVault.sol:SecurePollVault --constructor-args $VERIFIER_ADDRESS
```

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to link your Web3 wallet
2. **Create Poll**: Create a new poll with title, description, and voting options
3. **Vote**: Cast your vote (encrypted using FHE)
4. **View Results**: See poll results after voting ends
5. **Verify**: Verified polls show additional trust indicators

## Security Features

- **FHE Encryption**: All votes are encrypted and remain private
- **Reputation System**: Voter reputation tracking prevents spam
- **Verification**: Polls can be verified by trusted verifiers
- **Time-based**: Polls have defined start and end times
- **One Vote Per Address**: Each address can only vote once per poll

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email timothywatson@trinitylab.store or create an issue in the repository.
