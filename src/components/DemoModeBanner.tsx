import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { isContractDeployed } from "@/lib/contracts";

export const DemoModeBanner = () => {
  if (isContractDeployed()) {
    return null;
  }

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Demo Mode:</strong> The smart contract is not deployed yet. 
        This is a demonstration of the user interface. Connect your wallet to see the full functionality.
      </AlertDescription>
    </Alert>
  );
};
