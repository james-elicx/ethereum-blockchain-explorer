import type { providers } from 'ethers';

export type IChainDataContext = {
  chainData: providers.CloudflareProvider | providers.InfuraProvider | undefined;
};
