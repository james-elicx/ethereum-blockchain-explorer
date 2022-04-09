import { providers } from 'ethers';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ICloudflareContext } from './context.types';

const CloudflareContext = createContext<ICloudflareContext>(
  undefined as unknown as ICloudflareContext,
);

export const useCloudflare = () => useContext<ICloudflareContext>(CloudflareContext);

type Props = {
  children: React.ReactNode;
};

export const CloudflareProvider = ({ children }: Props): JSX.Element => {
  const [cloudflare, setCloudflare] = useState<providers.CloudflareProvider | undefined>(undefined);

  /**
   * Setup a new Cloudflare Ethereum Gateway provider.
   */
  useEffect(() => {
    const provider = new providers.CloudflareProvider(providers.getNetwork('homestead'));
    setCloudflare(provider);

    return () => {
      if (provider) {
        setCloudflare(undefined);
      }
    };
  }, []);

  return <CloudflareContext.Provider value={{ cloudflare }}>{children}</CloudflareContext.Provider>;
};
