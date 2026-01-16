import { useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

interface ConnectButtonProps {
  isConnected: boolean;
}

export function ConnectButton({ isConnected }: ConnectButtonProps) {
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: injected() })}
        disabled={isConnecting}
        className="w-full mt-auto bg-[#e84142] hover:bg-[#d13a3b] text-white py-[12.8px] rounded-[15px] font-medium text-sm tracking-[-1.5%] border border-[#e84142] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <button
      onClick={() => disconnect()}
      className="w-full mt-auto bg-transparent hover:bg-[#e84142]/10 text-[#e84142] py-[12.8px] rounded-[15px] font-medium text-sm tracking-[-1.5%] border border-[#e84142] transition-all duration-300"
    >
      Disconnect
    </button>
  );
}
