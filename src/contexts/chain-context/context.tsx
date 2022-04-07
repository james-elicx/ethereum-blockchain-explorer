import type { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { providers } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useWallet } from '../../contexts';
import type { IChainContext } from './context.types';

const ChainContext = createContext<IChainContext>(undefined as unknown as IChainContext);

export const useChain = () => useContext<IChainContext>(ChainContext);

type Props = {
  children: React.ReactNode;
};

export const ChainProvider = ({ children }: Props): JSX.Element => {
  const { metaMask } = useWallet();

  const [infura, setInfura] = useState<providers.InfuraWebSocketProvider | undefined>(undefined);
  const [cloudflare, setCloudflare] = useState<providers.CloudflareProvider | undefined>(undefined);

  const [blocks, setBlocks] = useState<BlockWithTransactions[]>([]);
  const [transactions, setTransactions] = useState<providers.TransactionResponse[]>([]);

  useEffect(() => {
    if (!metaMask) return;

    const cf = new providers.CloudflareProvider(providers.getNetwork('homestead'));

    const provider = new providers.InfuraWebSocketProvider(
      providers.getNetwork('homestead'),
      import.meta.env.VITE_INFURA_PROJECT_ID,
    );

    setInfura(provider);
    setCloudflare(cf);

    // Fetch last 5 blocks.
    cf.getBlockNumber()
      .then((blockNum) => {
        for (let i = 4; i >= 0; i--) {
          console.debug('New block:', blockNum - i);

          cf.getBlockWithTransactions(blockNum - i)
            .then((block) => {
              setBlocks((prevBlocks) =>
                prevBlocks.includes(block) ? prevBlocks : [...prevBlocks, block],
              );

              setTransactions((prevTransactions) => [
                ...prevTransactions,
                ...block.transactions.map((tx) => ({ timestamp: block.timestamp, ...tx })),
              ]);
            })
            .catch((e) => console.error('CloudFlare Ethereum Gateway Error:', e));

          // metaMask?.getBlockWithTransactions(blockNum - i).then((block) => {
          //   setBlocks((prevBlocks) =>
          //     prevBlocks.includes(block) ? prevBlocks : [...prevBlocks, block],
          //   );

          //   setTransactions((prevTransactions) => [
          //     ...prevTransactions,
          //     ...block.transactions.map((tx) => ({ timestamp: block.timestamp, ...tx })),
          //   ]);
          // });
        }
      })
      .catch((e) => console.error('CloudFlare Ethereum Gateway Error:', e));

    return () => {
      if (provider) {
        provider.destroy();
        setInfura(undefined);
        setCloudflare(undefined);
      }
    };
  }, [metaMask]);

  const onBlock = useCallback(
    (blockNum: number) => {
      console.debug('New block:', blockNum);

      cloudflare?.getBlockWithTransactions(blockNum).then((block) => {
        setBlocks((prevBlocks) =>
          prevBlocks.includes(block) ? prevBlocks : [...prevBlocks, block],
        );

        if (block.transactions.length > 5) {
          setTransactions(block.transactions.map((tx) => ({ timestamp: block.timestamp, ...tx })));
        } else {
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            ...block.transactions.map((tx) => ({ timestamp: block.timestamp, ...tx })),
          ]);
        }
      });
    },
    [cloudflare],
  );

  useEffect(() => {
    if (!infura) return;

    infura.on('block', onBlock);

    return () => {
      infura.removeListener('block', onBlock);
    };
  }, [infura, onBlock]);

  return (
    <ChainContext.Provider value={{ blocks, infura, transactions }}>
      {children}
    </ChainContext.Provider>
  );
};
