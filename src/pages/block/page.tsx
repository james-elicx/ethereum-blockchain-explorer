import type {
  Block as IBlock,
  TransactionResponse as ITransaction,
} from '@ethersproject/abstract-provider';
import { utils } from 'ethers';
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
  PageTitle,
  SearchBox,
  Skeleton,
  Table,
  TableCell,
  TableContents,
  TableHeader,
  TableRow,
} from '../../components';
import { Avatar } from '../../components/web3';
import { useChainData, useToast } from '../../contexts';
import { averageFeeOfTxs, trimAddress, valueOfTxs } from '../../utils';

// eslint-disable-next-line import/no-named-as-default-member
moment.relativeTimeThreshold('ss', 0);

export const Block = (): JSX.Element => {
  const { chainData } = useChainData();
  const { sendToast } = useToast();
  const { id } = useParams();

  const [block, setBlock] = useState<Omit<IBlock, 'transactions'> | undefined>(undefined);
  const [transactions, setTransactions] = useState<
    (ITransaction & { to: string; timestamp: number })[] | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  /**
   * Fetch the block and its transactions.
   */
  useEffect(() => {
    if (!id || !chainData) {
      if (!id) sendToast('Invalid block');
      return;
    }

    let cancel = false;

    console.debug('Getting data for block', id);

    chainData
      .getBlockWithTransactions(id.startsWith('0x') ? id : parseInt(id, 10))
      .then((newBlock) => {
        if (cancel) return;

        if (newBlock) {
          const { transactions: txs, ...blockData } = newBlock;

          setBlock(blockData);
          setTransactions(
            txs.map((tx) => ({
              ...tx,
              timestamp: blockData.timestamp,
              to: tx.to || '0x0000000000000000000000000000000000000000',
            })),
          );

          console.debug('Retrieved data for block', id, newBlock);
        } else {
          throw new Error('Failed to retrieve block');
        }
      })
      .catch((err) => {
        if (cancel) return;

        console.error(err);
        sendToast('Failed to retrieve block');
        setError('Failed to retrieve block');
      })
      .finally(() => {
        if (cancel) return;
        setLoading(false);
      });

    setLoading(false);

    return () => {
      cancel = true;
      setError(false);
      setLoading(true);
      setBlock(undefined);
      setTransactions(undefined);
    };
  }, [id, sendToast, chainData]);

  return error ? (
    <>
      <SearchBox style={{ marginTop: 'auto', marginBottom: '2em' }} />
      <span style={{ marginBottom: 'auto', fontSize: 18 }}>{error}</span>
    </>
  ) : loading ? (
    <Loading>Loading block...</Loading>
  ) : (
    <FlexBox direction="col" style={{ width: '70%', margin: '15px 0' }}>
      <PageTitle condition={block}>Block {block?.number.toLocaleString()}</PageTitle>

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
              rawValue={block ? moment(block.timestamp * 1000).fromNow() : undefined}
            >
              Timestamp
            </DataBoxRow>

            <DataBoxRow
              value={
                transactions
                  ? transactions.length > 0
                    ? valueOfTxs(transactions).toLocaleString()
                    : 0
                  : undefined
              }
              after=" ETH"
            >
              Value
            </DataBoxRow>

            <DataBoxRow
              value={
                transactions
                  ? transactions.length > 0
                    ? averageFeeOfTxs(transactions).toLocaleString()
                    : 0
                  : undefined
              }
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
                    <Link to={`/address/${block.miner}`}>
                      <Avatar
                        address={block.miner}
                        diameter={19}
                        style={{ verticalAlign: 'text-bottom', marginRight: 10 }}
                      />
                      {trimAddress(block.miner)}
                    </Link>
                  ) : (
                    'No address'
                  )
                ) : undefined
              }
              rawValue={block?.miner as string}
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

        <DataBox fill>
          <DataBoxTitle>Transactions</DataBoxTitle>

          <DataBoxContents scrollX scrollY>
            <Table>
              <TableHeader>
                <TableCell type="header" minWidth={250} width={270}>
                  Hash
                </TableCell>
                <TableCell type="header" minWidth={115} width={125}>
                  Age
                </TableCell>
                <TableCell type="header" minWidth={135} width={140}>
                  From
                </TableCell>
                <TableCell type="header" minWidth={135} width={140}>
                  To
                </TableCell>
                <TableCell type="header" minWidth={100} width={120}>
                  Value
                </TableCell>
                <TableCell type="header" minWidth={100} width={120}>
                  Gas Price
                </TableCell>
              </TableHeader>

              <TableContents>
                {transactions ? (
                  transactions.length > 0 ? (
                    transactions?.map((tx) => (
                      <TableRow key={tx.hash}>
                        <TableCell title={tx.hash}>
                          <span className="table-truncate" style={{ maxWidth: 250 }}>
                            <Link to={`/tx/${tx.hash}`}>{tx.hash}</Link>
                          </span>
                        </TableCell>
                        <TableCell
                          title={moment(tx.timestamp * 1000).format('MMM Do, YYYY (hh:mm:ss A)')}
                        >
                          {tx.timestamp ? moment(tx.timestamp * 1000).fromNow() : 'No timestamp'}
                        </TableCell>
                        <TableCell title={tx.from}>
                          <Link to={`/address/${tx.from}`}>
                            <Avatar
                              address={tx.from}
                              diameter={19}
                              style={{ verticalAlign: 'text-bottom', marginRight: 10 }}
                            />
                            {trimAddress(tx.from)}
                          </Link>
                        </TableCell>
                        <TableCell title={tx.to}>
                          <Link to={`/address/${tx.to}`}>
                            <Avatar
                              address={tx.to}
                              diameter={19}
                              style={{ verticalAlign: 'text-bottom', marginRight: 10 }}
                            />
                            {trimAddress(tx.to)}
                          </Link>
                        </TableCell>
                        <TableCell title={`${utils.formatEther(tx.value)} ETH`}>
                          {parseFloat((+utils.formatEther(tx.value)).toFixed(5))} ETH
                        </TableCell>
                        <TableCell title={`${utils.formatUnits(tx.gasPrice || 0, 'gwei')} Gwei`}>
                          {(+utils.formatUnits(tx.gasPrice || 0, 'gwei')).toFixed(2)} Gwei
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <span>No transactions found.</span>
                  )
                ) : (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={`table-loading-${i}`}>
                      <TableCell>
                        <Skeleton height={19} />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={19} />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={19} />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={19} />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={19} />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={19} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableContents>
            </Table>
          </DataBoxContents>
        </DataBox>
      </FlexBox>
    </FlexBox>
  );
};
