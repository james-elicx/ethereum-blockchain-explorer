import type { providers } from 'ethers';
import type { BlockWithTransactions } from '@ethersproject/abstract-provider';

export type IInfuraContext = {
  blocks: Map<number, BlockWithTransactions>;
  infura: providers.InfuraWebSocketProvider | undefined;
  loadingInitial: boolean;
  transactions: Map<string, providers.TransactionResponse>;
};
