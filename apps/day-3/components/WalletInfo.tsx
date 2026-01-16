interface WalletInfoProps {
  isConnected: boolean;
  address?: string;
  chain?: { name: string };
  balanceData?: { decimals: number; symbol: string };
}

export function WalletInfo({
  isConnected,
  address,
  chain,
  balanceData,
}: WalletInfoProps) {
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex flex-col flex-1 gap-4">
      {/* BALANCE SECTION */}
      <div className="bg-[#292929] border border-[#404040] p-4 rounded-[15px] flex justify-between items-center text-sm">
        <span className="text-[#cccccc]">Balance</span>
        <div className="flex items-center gap-3">
          <img src="/avax.png" alt="avax" className="w-6 h-6" />
          <span className="text-lg font-medium">
            {isConnected && balanceData ? balanceData.decimals : "-"}
            <span className="ml-1 text-xs">{balanceData?.symbol}</span>
          </span>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="bg-[#292929] border border-[#404040] p-4 rounded-[15px] flex flex-col gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[#cccccc]">Wallet Address</span>
          <span className="text-right text-[#cccccc] truncate max-w-[150px]">
            {isConnected && address ? truncateAddress(address) : "-"}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#cccccc]">Network Name</span>
          <span className="text-right text-[#cccccc]">
            {isConnected ? chain?.name : "-"}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#cccccc]">Status</span>
          <span
            className={`text-right ${
              isConnected ? "text-[#4dcc7d]" : "text-[#e84142]"
            }`}
          >
            {isConnected ? "Connected" : "Not Connected"}
          </span>
        </div>
      </div>
    </div>
  );
}
