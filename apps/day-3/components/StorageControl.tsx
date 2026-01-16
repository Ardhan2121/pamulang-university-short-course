import { useSimpleStorage } from "@/hooks/useSimpleStorage";

interface StorageControlProps {
  isConnected: boolean;
}

export function StorageControl({ isConnected }: StorageControlProps) {
  const {
    value,
    isReading,
    refetch,
    inputValue,
    setInputValue,
    handleSetValue,
    isWriting,
  } = useSimpleStorage();

  if (!isConnected) return null;

  return (
    <div className="bg-[#292929] border border-[#404040] p-4 rounded-[15px] flex flex-col gap-3 text-sm mt-2">
      <div className="flex justify-between items-center">
        <span className="text-[#cccccc]">Contract Value</span>
        <span className="text-lg font-bold text-white">
          {isReading ? "..." : value?.toString() ?? "0"}
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="New Value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-[#171717] border border-[#404040] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#e84142]"
        />
        <button
          onClick={handleSetValue}
          disabled={isWriting}
          className="bg-[#e84142] text-xs px-3 py-1 rounded-lg hover:bg-[#d13a3b] transition-colors disabled:opacity-50"
        >
          {isWriting ? "..." : "Set"}
        </button>
      </div>
      <button
        onClick={() => refetch()}
        className="text-[10px] text-[#cccccc] hover:text-white uppercase tracking-wider text-center"
      >
        Refresh Data
      </button>
    </div>
  );
}
