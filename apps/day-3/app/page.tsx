"use client";

import { useAccount, useBalance } from "wagmi";
import { WalletInfo } from "@/components/WalletInfo";
import { StorageControl } from "@/components/StorageControl";
import { ConnectButton } from "@/components/ConnectButton";
import { useState, useEffect } from "react";
import {
  getBlockchainValue,
  getBlockchainEvents,
} from "@/services/blockchain.service";

export default function Page() {
  const { address, isConnected, chain } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [blockchainValue, setBlockchainValue] = useState<any>(null);
  const [blockchainEvents, setBlockchainEvents] = useState<any>(null);

  const { data: balanceData } = useBalance({
    address: address,
  });

  useEffect(() => {
    setMounted(true);
    // Fetch blockchain data on client side
    getBlockchainValue().then(setBlockchainValue).catch(console.error);
    getBlockchainEvents().then(setBlockchainEvents).catch(console.error);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#171717] text-white font-['Outfit',sans-serif]"
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center w-full px-8 py-10 overflow-y-auto max-h-screen">
        <img src="/avax.png" alt="logo" className="w-[55px] mb-[44px]" />

        <div className="card w-[350px]  p-[33.6px] bg-[#1f1f1f] rounded-[30px] border border-[#4d4d4d] flex flex-col shadow-2xl space-y-6 h-fit">
          <h5 className="text-[28px] tracking-[-1%] font-medium mb-[10px]">
            {isConnected ? "DApp Dashboard" : "Connect Wallet"}
          </h5>

          <div className="flex flex-col flex-1 gap-4">
            <WalletInfo
              isConnected={isConnected}
              address={address}
              chain={chain}
              balanceData={balanceData}
            />

            <StorageControl isConnected={isConnected} />

            {/* Blockchain Data Section */}

            <div className="flex flex-col gap-2 p-4 bg-[#2a2a2a] rounded-xl border border-[#4d4d4d]">
              <h6 className="text-sm font-semibold text-[#cccccc]">
                Blockchain Data
              </h6>
              <div className="text-xs">
                <span className="text-[#888888]">Value: </span>
                <span className="text-white font-mono">
                  {blockchainValue
                    ? JSON.stringify(blockchainValue, null, 2)
                    : "Loading..."}
                </span>
              </div>
              <div className="text-xs">
                <span className="text-[#888888]">Events: </span>
                <span className="text-white font-mono">
                  {blockchainEvents
                    ? JSON.stringify(blockchainEvents, null, 2)
                    : "Loading..."}
                </span>
              </div>
            </div>

            <ConnectButton isConnected={isConnected} />

            <div className="flex justify-center mt-4">
              <span className="text-[12px] text-[#cccccc]">
                Ardhan Novealdio - 241011401771
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
