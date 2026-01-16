"use client";

import { useAccount, useBalance } from "wagmi";
import { WalletInfo } from "@/components/WalletInfo";
import { StorageControl } from "@/components/StorageControl";
import { ConnectButton } from "@/components/ConnectButton";
import { useState, useEffect } from "react";

export default function Page() {
  const { address, isConnected, chain } = useAccount();
  const [mounted, setMounted] = useState(false);
  const { data: balanceData } = useBalance({
    address: address,
  });

  useEffect(() => {
    setMounted(true);
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
      <div className="flex flex-col items-center w-full px-8 py-10">
        <img src="/avax.png" alt="logo" className="w-[55px] mb-[44px]" />

        <div className="card w-[350px] min-h-[380px] p-[33.6px] bg-[#1f1f1f] rounded-[30px] border border-[#4d4d4d] flex flex-col shadow-2xl">
          <h5 className="text-[28px] tracking-[-1%] font-medium mb-[30px]">
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
