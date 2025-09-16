# Vercel Deployment Guide for Secure Poll Vault

This guide provides step-by-step instructions for deploying the Secure Poll Vault application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment Process

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub repositories

### 3. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select your `secure-poll-vault` repository
3. Click "Import"

### 4. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**To add environment variables:**
1. In the project settings, go to "Environment Variables"
2. Click "Add New"
3. Add each variable with its value
4. Make sure to select "Production", "Preview", and "Development" for each variable

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your application will be available at the provided Vercel URL

### 6. Custom Domain (Optional)

1. In your project dashboard, go to "Settings" > "Domains"
2. Click "Add Domain"
3. Enter your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Configuration

### 1. Update Contract Address

After deploying your smart contract to Sepolia:
1. Update the contract address in `src/lib/contracts.ts`
2. Commit and push the changes
3. Vercel will automatically redeploy

### 2. Test the Application

1. Visit your deployed URL
2. Connect a wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia testnet
4. Test creating and voting on polls

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure environment variables are set correctly
   - Check the build logs in Vercel dashboard

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Ensure RPC URL is accessible
   - Check that the chain ID matches Sepolia (11155111)

3. **Contract Interaction Issues**
   - Verify contract is deployed to Sepolia
   - Check contract address in configuration
   - Ensure user has Sepolia ETH for gas fees

### Build Logs

To view build logs:
1. Go to your project in Vercel dashboard
2. Click on the latest deployment
3. Check the "Build Logs" tab for any errors

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Ethereum Sepolia chain ID |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/...` | RPC endpoint for Sepolia |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID |
| `NEXT_PUBLIC_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key |

## Security Notes

- Never commit private keys or sensitive data to the repository
- Use environment variables for all configuration
- Regularly rotate API keys and project IDs
- Monitor deployment logs for any security issues

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Contact support: timothywatson@trinitylab.store
