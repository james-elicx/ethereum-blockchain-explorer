/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExternalProvider, Listener, Web3Provider } from '@ethersproject/providers';

export type IWalletContext = {
  address: string;
  connect: () => void;
  metaMask: WrappedProvider | undefined;
};

type Eip1193Events = 'chainChanged' | 'accountsChanged' | 'connect' | 'disconnect';

/**
 * Provider wrapper is adapted from ethers GitHub discussion.
 * https://github.com/ethers-io/ethers.js/discussions/1560#discussioncomment-736449
 */
type Eip1193Provider = ExternalProvider & {
  on: (event: Eip1193Events, listener: Listener) => void;
  removeListener: (event: Eip1193Events, listener: Listener) => void;
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;
};

export type WrappedProvider = Web3Provider & {
  provider: Eip1193Provider;
};
