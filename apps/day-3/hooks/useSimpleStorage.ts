import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
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

  const {
    data: hash,
    writeContract,
    isPending: isWriting,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed! Value updated.");
      setInputValue("");
      refetch();
    }
  }, [isConfirmed, refetch]);

  const handleSetValue = async () => {
    if (!inputValue) return;

    writeContract(
      {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: SIMPLE_STORAGE_ABI,
        functionName: "setValue",
        args: [BigInt(inputValue)],
      },
      {
        onSuccess: () => {
          toast.info("Transaction submitted...");
        },
        onError: (error) => {
          toast.error(`Error submitting transaction: ${error.message}`);
        },
      }
    );
  };

  return {
    value,
    isReading,
    refetch,
    inputValue,
    setInputValue,
    handleSetValue,
    isWriting: isWriting || isConfirming,
  };
}
