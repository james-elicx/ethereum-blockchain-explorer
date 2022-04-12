import type {
  Block as IBlock,
  TransactionResponse as ITransaction,
} from '@ethersproject/abstract-provider';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  DataBox,
  DataBoxContents,
  DataBoxRow,
  DataBoxTitle,
  FlexBox,
  Loading,
  SearchBox,
  Skeleton,
} from '../../components';
// import { Avatar } from '../../components/web3';
import { useCloudflare, useToast } from '../../contexts';
import { averageFeeOfTxs, trimAddress, valueOfTxs } from '../../utils';

import './page.scss';

// eslint-disable-next-line import/no-named-as-default-member
moment.relativeTimeThreshold('ss', 0);

export const Block = (): JSX.Element => {
  const { cloudflare } = useCloudflare();
  const { sendToast } = useToast();
  const { id } = useParams();

  const [block, setBlock] = useState<Omit<IBlock, 'transactions'> | undefined>(undefined);
  const [transactions, setTransactions] = useState<ITransaction[] | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  /**
   * Fetch the block and it's transactions.
   */
  useEffect(() => {
    if (!id || !cloudflare) {
      if (!id) sendToast('Invalid block');
      return;
    }

    let cancel = false;

    console.debug('Getting data for block', id);

    cloudflare
      .getBlockWithTransactions(id.startsWith('0x') ? id : parseInt(id, 10))
      .then((newBlock) => {
        if (cancel) return;

        if (newBlock) {
          const { transactions: txs, ...blockData } = newBlock;

          setBlock(blockData);
          setTransactions(txs.map((tx) => ({ ...tx, timestamp: blockData.timestamp })));

          console.debug('Retrieved data for block', id, newBlock);
        } else {
          throw new Error('Failed to retrieve block');
        }
      })
      .catch((err) => {
        console.error(err);
        sendToast('Failed to retrieve block');
        setError('Failed to retrieve block');
      })
      .finally(() => setLoading(false));

    setLoading(false);

    return () => {
      cancel = true;
      setError(false);
      setLoading(true);
      setBlock(undefined);
      setTransactions(undefined);
    };
  }, [id, sendToast, cloudflare]);

  return error ? (
    <>
      <SearchBox style={{ marginTop: 'auto', marginBottom: '2em' }} />
      <span style={{ marginBottom: 'auto', fontSize: 18 }}>{error}</span>
    </>
  ) : loading ? (
    <Loading>Loading block...</Loading>
  ) : (
    <FlexBox direction="col" style={{ width: '70%', margin: '15px 0' }}>
      <FlexBox align="center">
        {block ? (
          <span className="page-title">Block {block.number}</span>
        ) : (
          <>
            <Skeleton width={140} height={24} />
          </>
        )}
      </FlexBox>

      <FlexBox wrap="wrap" justify="space-between" style={{ marginTop: 15 }}>
        <DataBox>
          <DataBoxTitle>Block Data</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow
              value={
                block
                  ? moment(block.timestamp * 1000).format('MMM Do, YYYY (hh:mm:ss A)')
                  : undefined
              }
            >
              Timestamp
            </DataBoxRow>

            <DataBoxRow
              value={transactions ? valueOfTxs(transactions).toLocaleString() : undefined}
              after=" ETH"
            >
              Value
            </DataBoxRow>

            <DataBoxRow
              value={transactions ? averageFeeOfTxs(transactions).toLocaleString() : undefined}
              after=" Gwei"
            >
              Average Fee
            </DataBoxRow>

            <DataBoxRow value={transactions?.length}>Transactions</DataBoxRow>
          </DataBoxContents>
        </DataBox>

        <DataBox>
          <DataBoxTitle>Additional Info</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow value={block?._difficulty.toBigInt().toLocaleString()}>
              Difficulty
            </DataBoxRow>

            <DataBoxRow
              value={
                block ? (
                  block?.miner ? (
                    <Link to={`/address/${block.miner}`}>{trimAddress(block.miner)}</Link>
                  ) : (
                    'No address'
                  )
                ) : undefined
              }
            >
              Miner
            </DataBoxRow>

            <DataBoxRow value={block ? block.gasUsed.toBigInt().toLocaleString() : undefined}>
              Gas Used
            </DataBoxRow>

            <DataBoxRow value={block ? block.gasLimit.toBigInt().toLocaleString() : undefined}>
              Gas Limit
            </DataBoxRow>
          </DataBoxContents>
        </DataBox>
      </FlexBox>
    </FlexBox>
  );
};
