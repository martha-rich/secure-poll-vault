# Secure Poll Vault

A decentralized voting platform built with Fully Homomorphic Encryption (FHE) to ensure complete privacy and security of votes. This application allows users to create polls, vote anonymously, and view results while maintaining the confidentiality of individual voting choices.

## Features

- **Privacy-First Voting**: All votes are encrypted using FHE technology
- **Decentralized**: Built on Ethereum Sepolia testnet
- **Wallet Integration**: Support for multiple wallet providers via RainbowKit
- **Real-time Results**: View poll results without compromising voter privacy
- **Reputation System**: Voter reputation tracking for enhanced security
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

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
