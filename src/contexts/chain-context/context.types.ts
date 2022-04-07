import type { providers } from 'ethers';
import type { BlockWithTransactions } from '@ethersproject/abstract-provider';

export type IChainContext = {
  blocks: Map<number, BlockWithTransactions>;
  infura: providers.InfuraWebSocketProvider | undefined;
  transactions: Map<string, providers.TransactionResponse>;
};
