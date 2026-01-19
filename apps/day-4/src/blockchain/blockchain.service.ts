import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { createPublicClient, http } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { abi } from './simple-storage.abi';

@Injectable()
export class BlockchainService {
  private client;
  private contractAddress: `0x${string}`;

  constructor() {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http(
        process.env.RPC_URL || 'https://avalanche-fuji.drpc.org',
        {
          timeout: 10_000,
        },
      ),
    });

    if (!process.env.CONTRACT_ADDRESS) {
      throw new Error('CONTRACT_ADDRESS environment variable is not set');
    }

    this.contractAddress =
      (process.env.CONTRACT_ADDRESS as `0x${string}`) ||
      ('0xcdbbc9cc8401e81ab89bd5b6522dd879b7a21427' as `0x${string}`);
  }

  async getLatestValue() {
    try {
      const value = await this.client.readContract({
        address: this.contractAddress,
        abi: abi,
        functionName: 'getValue',
        fromBlock: 5738123n,
      });

      return {
        value: value.toString(),
      };
    } catch (error: any) {
      this.handleRpcError(error);
    }
  }

  async getValueUpdatedEvents(
    fromBlock?: bigint,
    toBlock: 'latest' | bigint = 'latest',
  ) {
    try {
      const events = await this.client.getLogs({
        address: this.contractAddress,
        event: {
          type: 'event',
          name: 'ValueUpdated',
          inputs: [{ name: 'newValue', type: 'uint256', indexed: false }],
        },
        fromBlock,
        toBlock,
      });

      return events.map((event) => ({
        blockNumber: event.blockNumber?.toString(),
        value: event.args.newValue.toString(),
        txHash: event.transactionHash,
      }));
    } catch (error: any) {
      this.handleRpcError(error);
    }
  }

  private handleRpcError(error: any): never {
    const message = error?.message?.toLowerCase() || '';

    if (message.includes('timeout')) {
      throw new ServiceUnavailableException(
        'RPC timeout. Silakan coba beberapa saat lagi.',
      );
    }

    if (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('failed')
    ) {
      throw new ServiceUnavailableException(
        'Tidak dapat terhubung ke blockchain RPC.',
      );
    }

    throw new InternalServerErrorException(
      'Terjadi kesalahan saat membaca data blockchain.',
    );
  }
}
