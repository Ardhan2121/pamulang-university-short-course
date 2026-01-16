import { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, SIMPLE_STORAGE_ABI } from "@/constants";

export function useSimpleStorage() {
  const [inputValue, setInputValue] = useState("");

  const {
    data: value,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "getValue",
  });

  const { writeContract, isPending: isWriting } = useWriteContract();

  const handleSetValue = async () => {
    if (!inputValue) return;

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "setValue",
      args: [BigInt(inputValue)],
    });
  };

  return {
    value,
    isReading,
    refetch,
    inputValue,
    setInputValue,
    handleSetValue,
    isWriting,
  };
}
