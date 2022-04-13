import { providers } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';
import type { IChainDataContext } from './context.types';

const ChainDataContext = createContext<IChainDataContext>(
  undefined as unknown as IChainDataContext,
);

export const useChainData = () => useContext<IChainDataContext>(ChainDataContext);

type Props = {
  children: React.ReactNode;
};

export const ChainDataProvider = ({ children }: Props): JSX.Element => {
  const [chainData, setChainData] = useState<
    providers.CloudflareProvider | providers.InfuraProvider | undefined
  >(undefined);

  /**
   * Setup a new Chain Data provider.
   *
   * Initialized as either a Cloudflare Ethereum Gateway provider, or Infura provider.
   * Using Infura over Cloudflare due to excessive 'Worker threw exception' responses.
   */
  useEffect(() => {
    // Cloudflare Ethereum Gateway Provider.
    // const provider = new providers.CloudflareProvider(providers.getNetwork('homestead'));

    // Infura Provider.
    const provider = new providers.InfuraProvider(
      providers.getNetwork('homestead'),
      import.meta.env.VITE_INFURA_PROJECT_ID,
    );

    setChainData(provider);

    return () => {
      if (provider) {
        setChainData(undefined);
      }
    };
  }, []);

  return <ChainDataContext.Provider value={{ chainData }}>{children}</ChainDataContext.Provider>;
};
