import { Button } from "@/components/ui/button";
import { Wallet, CheckCircle } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const WalletConnect = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex items-center gap-4">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button 
                      onClick={openConnectModal}
                      className="wallet-connect flex items-center gap-2"
                    >
                      <Wallet size={20} />
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button 
                      onClick={openChainModal}
                      className="wallet-connect flex items-center gap-2"
                    >
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={openAccountModal}
                      className="wallet-connect flex items-center gap-2"
                    >
                      <Wallet size={20} />
                      {account.displayName}
                    </Button>
                    
                    <div className="privacy-badge flex items-center gap-1">
                      <CheckCircle size={16} />
                      <span>Connected</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WalletConnect;