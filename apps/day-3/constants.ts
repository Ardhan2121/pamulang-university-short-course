import storageData from "@/data/SimpleStorage.json";
import type { SimpleStorage$Type } from "@/data/SimpleStorage";

const data = storageData as SimpleStorage$Type;

export const CONTRACT_ADDRESS = "0xcdbbc9cc8401e81ab89bd5b6522dd879b7a21427";
export const SIMPLE_STORAGE_ABI = data.abi;
