import type { providers } from 'ethers';
import type { BlockWithTransactions } from '@ethersproject/abstract-provider';

export type IChainContext = {
  blocks: BlockWithTransactions[];
  infura: providers.InfuraWebSocketProvider | undefined;
  transactions: providers.TransactionResponse[];
};
