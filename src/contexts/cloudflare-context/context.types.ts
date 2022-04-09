import type { providers } from 'ethers';

export type ICloudflareContext = {
  cloudflare: providers.CloudflareProvider | undefined;
};
