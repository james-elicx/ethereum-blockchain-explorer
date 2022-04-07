import type { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { providers } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useWallet } from '../../contexts';
import type { IInfuraContext } from './context.types';

const InfuraContext = createContext<IInfuraContext>(undefined as unknown as IInfuraContext);

export const useInfura = () => useContext<IInfuraContext>(InfuraContext);

type Props = {
  children: React.ReactNode;
};

export const InfuraProvider = ({ children }: Props): JSX.Element => {
  const { metaMask } = useWallet();

  const [infura, setInfura] = useState<providers.InfuraWebSocketProvider | undefined>(undefined);

  const [blocks, setBlocks] = useState<BlockWithTransactions[]>([]);
  const [transactions, setTransactions] = useState<providers.TransactionResponse[]>([]);

  useEffect(() => {
    if (!metaMask) return;

    const provider = new providers.InfuraWebSocketProvider(
      providers.getNetwork('homestead'),
      import.meta.env.VITE_INFURA_PROJECT_ID,
    );

    setInfura(provider);

    // Fetch last 5 blocks.
    metaMask.getBlockNumber().then((blockNum) => {
      for (let i = 4; i >= 0; i--) {
        console.debug('New block:', blockNum - i);

        metaMask?.getBlockWithTransactions(blockNum - i).then((block) => {
          setBlocks((prevBlocks) =>
            prevBlocks.includes(block) ? prevBlocks : [...prevBlocks, block],
          );

          setTransactions((prevTransactions) => [
            ...prevTransactions,
            ...block.transactions.map((tx) => ({ timestamp: block.timestamp, ...tx })),
          ]);
        });
      }
    });

    return () => {
      if (provider) {
        provider.destroy();
        setInfura(undefined);
      }
    };
  }, [metaMask]);

  const onBlock = useCallback(
    (blockNum: number) => {
      console.debug('New block:', blockNum);

      metaMask?.getBlockWithTransactions(blockNum).then((block) => {
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
    [metaMask],
  );

  useEffect(() => {
    if (!infura) return;

    infura.on('block', onBlock);

    return () => {
      infura.removeListener('block', onBlock);
    };
  }, [infura, onBlock]);

  return (
    <InfuraContext.Provider value={{ blocks, infura, transactions }}>
      {children}
    </InfuraContext.Provider>
  );
};
