import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('value')
  @ApiOperation({ summary: 'Get the latest value from the smart contract' })
  @ApiResponse({ status: 200, description: 'The latest value.' })
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  @Get('events')
  @ApiOperation({ summary: 'Get ValueUpdated events history' })
  @ApiResponse({ status: 200, description: 'List of events.' })
  @ApiQuery({ name: 'fromBlock', required: false, type: Number })
  @ApiQuery({ name: 'toBlock', required: false, type: Number })
  async getEvents(
    @Query('fromBlock') fromBlock?: number,
    @Query('toBlock') toBlock?: number,
  ) {
    return this.blockchainService.getValueUpdatedEvents(
      fromBlock ? BigInt(fromBlock) : undefined,
      toBlock ? BigInt(toBlock) : undefined,
    );
  }
}
