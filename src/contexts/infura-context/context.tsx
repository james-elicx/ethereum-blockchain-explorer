import type { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { providers } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useCloudflare } from '../../contexts';
import type { IInfuraContext } from './context.types';

const InfuraContext = createContext<IInfuraContext>(undefined as unknown as IInfuraContext);

export const useInfura = () => useContext<IInfuraContext>(InfuraContext);

type Props = {
  children: React.ReactNode;
};

export const InfuraProvider = ({ children }: Props): JSX.Element => {
  const { cloudflare } = useCloudflare();

  const [infura, setInfura] = useState<providers.InfuraWebSocketProvider | undefined>(undefined);

  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [blocks, setBlocks] = useState<Map<number, BlockWithTransactions>>(new Map());
  const [transactions, setTransactions] = useState<Map<string, providers.TransactionResponse>>(
    new Map(),
  );

  /**
   * Setup a websocket connection with Infura and fetch the last 5 blocks.
   */
  useEffect(() => {
    if (!cloudflare) return;

    const provider = new providers.InfuraWebSocketProvider(
      providers.getNetwork('homestead'),
      import.meta.env.VITE_INFURA_PROJECT_ID,
    );

    setInfura(provider);

    // Fetch the last 5 blocks.
    cloudflare
      .getBlockNumber()
      .then((blockNum) => {
        for (let i = 4; i >= 0; i--) {
          console.debug('New block:', blockNum - i);

          provider
            .getBlockWithTransactions(blockNum - i)
            .then((block) => {
              setBlocks((prev) => prev.set(block.number, block));

              setTransactions((prev) => {
                const newTransactions = new Map(prev);

                block.transactions.forEach((tx) => {
                  tx.timestamp = block.timestamp;
                  newTransactions.set(tx.hash, tx);
                });

                return newTransactions;
              });
            })
            .catch((e) => console.error('Cloudflare Ethereum Gateway Error:', e))
            .finally(() => setLoadingInitial(false));
        }
      })
      .catch((e) => console.error('Cloudflare Ethereum Gateway Error:', e));

    return () => {
      if (provider) {
        provider.destroy();
        setInfura(undefined);
      }
    };
  }, [cloudflare]);

  /**
   * Fetch the data for a block and add it to the relevant maps.
   *
   * @param {number} blockNum The block number to fetch.
   */
  const onBlock = useCallback(
    (blockNum: number) => {
      if (!cloudflare) return;
      console.debug('New block:', blockNum);

      cloudflare.getBlockWithTransactions(blockNum).then((block) => {
        setBlocks((prevBlocks) => prevBlocks.set(block.number, block));

        setTransactions((prev) => {
          const newTransactions = block.transactions.length > 5 ? new Map() : new Map(prev);

          block.transactions.forEach((tx) => {
            tx.timestamp = block.timestamp;
            newTransactions.set(tx.hash, tx);
          });

          return newTransactions;
        });
      });
    },
    [cloudflare],
  );

  /**
   * Add listener for new blocks.
   */
  useEffect(() => {
    if (!infura) return;

    infura.on('block', onBlock);

    return () => {
      infura.removeListener('block', onBlock);
    };
  }, [infura, onBlock]);

  return (
    <InfuraContext.Provider value={{ blocks, infura, loadingInitial, transactions }}>
      {children}
    </InfuraContext.Provider>
  );
};
