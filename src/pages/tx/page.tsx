import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type {
  Block as IBlock,
  TransactionResponse as ITransaction,
  TransactionReceipt as IReceipt,
} from '@ethersproject/abstract-provider';
import { useChainData, useToast } from '../../contexts';
import {
  DataBox,
  DataBoxContents,
  DataBoxRow,
  DataBoxTitle,
  FlexBox,
  Loading,
  PageTitle,
  SearchBox,
} from '../../components';
import moment from 'moment';
import { parseEther, trimAddress } from '../../utils';
import { Avatar } from '../../components/web3';
import { utils } from 'ethers';

export const Tx = () => {
  const { chainData } = useChainData();
  const { sendToast } = useToast();
  const { id } = useParams();

  const [transaction, setTransaction] = useState<(ITransaction & { to: string }) | undefined>(
    undefined,
  );
  const [receipt, setReceipt] = useState<IReceipt | undefined>(undefined);
  const [block, setBlock] = useState<IBlock | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingReceipt, setLoadingReceipt] = useState<boolean>(true);
  const [loadingBlock, setLoadingBlock] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  /**
   * Fetch the transaction info and if the transaction has been mined, fetch the receipt.
   */
  useEffect(() => {
    if (!id || !chainData) {
      if (!id) sendToast('Invalid block');
      return;
    }

    let cancel = false;

    console.debug('Getting data for transaction', id);

    chainData
      .getTransaction(id)
      .then((tx) => {
        if (cancel) return;

        if (tx) {
          setTransaction({
            ...tx,
            to: tx.to || '0x0000000000000000000000000000000000000000',
          });

          console.debug('Retrieved data for transaction', id, tx);

          // Get the tranascation receipt if the transaction has been mined.
          if (tx.confirmations >= 1 && tx.blockNumber && tx.blockNumber > 0) {
            console.debug('Getting receipt for transaction', id);

            chainData
              .getTransactionReceipt(id)
              .then((txReceipt) => {
                if (cancel) return;

                if (txReceipt) {
                  setReceipt({
                    ...txReceipt,
                    to: txReceipt.to || '0x0000000000000000000000000000000000000000',
                  });
                  console.debug('Retrieved receipt for transaction', id, txReceipt);
                } else {
                  throw new Error('Failed to retrieve transaction receipt');
                }
              })
              .catch((err) => {
                if (cancel) return;
                console.error(err);
                sendToast('Failed to retrieve transaction receipt');
              })
              .finally(() => {
                if (cancel) return;
                setLoadingReceipt(false);
              });
          } else {
            setLoadingReceipt(false);
          }
        } else {
          throw new Error('Failed to retrieve transaction');
        }
      })
      .catch((err) => {
        if (cancel) return;

        console.error(err);
        sendToast('Failed to retrieve transaction');
        setError('Failed to retrieve transaction');
      })
      .finally(() => {
        if (cancel) return;
        setLoading(false);
      });

    return () => {
      cancel = true;
      setError(false);
      setLoading(true);
      setLoadingReceipt(true);
      setTransaction(undefined);
      setReceipt(undefined);
    };
  }, [id, chainData, sendToast]);

  /**
   * Fetch the block for the transaction.
   */
  useEffect(() => {
    if (!chainData || !transaction) return;

    let cancel = false;

    if (transaction.blockNumber && transaction.blockNumber > 0) {
      chainData
        .getBlock(transaction.blockNumber)
        .then((newBlock) => {
          if (cancel) return;

          if (newBlock) {
            setBlock(newBlock);
          }
        })
        .catch((err) => {
          if (cancel) return;

          console.error(err);
          sendToast('Failed to retrieve block');
        })
        .finally(() => {
          if (cancel) return;
          setLoadingBlock(false);
        });
    } else {
      setLoadingBlock(false);
    }

    return () => {
      cancel = true;
      setLoadingBlock(true);
      setBlock(undefined);
    };
  }, [transaction, chainData, sendToast]);

  return error ? (
    <>
      <SearchBox style={{ marginTop: 'auto', marginBottom: '2em' }} />
      <span style={{ marginBottom: 'auto', fontSize: 18 }}>{error}</span>
    </>
  ) : loading ? (
    <Loading>Loading transaction...</Loading>
  ) : (
    <FlexBox direction="col" style={{ width: '70%', margin: '15px 0' }}>
      <PageTitle condition={transaction}>Transaction {transaction?.hash}</PageTitle>

      <FlexBox wrap="wrap" justify="space-between" style={{ marginTop: 15 }}>
        <DataBox>
          <DataBoxTitle>Transaction Data</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow
              value={
                loadingBlock
                  ? undefined
                  : block
                  ? moment(block.timestamp * 1000).format('MMM Do, YYYY (hh:mm:ss A)')
                  : 'No timestamp'
              }
              rawValue={
                loadingBlock
                  ? undefined
                  : block
                  ? moment(block.timestamp * 1000).fromNow()
                  : 'No timestamp'
              }
            >
              Timestamp
            </DataBoxRow>

            <DataBoxRow
              value={
                transaction ? (
                  transaction.from ? (
                    <Link to={`/address/${transaction.from}`}>
                      <Avatar
                        address={transaction.from}
                        diameter={19}
                        style={{ verticalAlign: 'text-bottom', marginRight: 10 }}
                      />
                      {trimAddress(transaction.from)}
                    </Link>
                  ) : (
                    'No address'
                  )
                ) : undefined
              }
              rawValue={transaction?.from as string}
            >
              From
            </DataBoxRow>

            <DataBoxRow
              value={
                transaction ? (
                  transaction.to ? (
                    <Link to={`/address/${transaction.to}`}>
                      <Avatar
                        address={transaction.to}
                        diameter={19}
                        style={{ verticalAlign: 'text-bottom', marginRight: 10 }}
                      />
                      {trimAddress(transaction.to)}
                    </Link>
                  ) : (
                    'No address'
                  )
                ) : undefined
              }
              rawValue={transaction?.to as string}
            >
              To
            </DataBoxRow>

            <DataBoxRow
              value={
                transaction
                  ? transaction.confirmations === 0
                    ? 'Pending'
                    : transaction.confirmations.toLocaleString()
                  : undefined
              }
            >
              Confirmations
            </DataBoxRow>

            <DataBoxRow
              value={transaction ? parseEther(transaction.value, 10) : undefined}
              rawValue={utils.formatEther(transaction?.value || 0)}
              after=" ETH"
            >
              Value
            </DataBoxRow>
          </DataBoxContents>
        </DataBox>

        <DataBox>
          <DataBoxTitle>Additional Info</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow
              value={
                transaction ? (
                  transaction.blockNumber && transaction.blockNumber > 0 ? (
                    <Link to={`/block/${transaction.blockNumber}`}>
                      {transaction.blockNumber.toLocaleString()}
                    </Link>
                  ) : (
                    'Pending'
                  )
                ) : undefined
              }
              rawValue={
                transaction?.blockNumber ? transaction.blockNumber.toLocaleString() : 'Pending'
              }
            >
              Block
            </DataBoxRow>

            <DataBoxRow
              value={
                transaction
                  ? (+utils.formatUnits(transaction.gasPrice || 0, 'gwei')).toFixed(2)
                  : undefined
              }
              rawValue={+utils.formatUnits(transaction?.gasPrice || 0, 'gwei')}
              after=" Gwei"
            >
              Gas Price
            </DataBoxRow>

            <DataBoxRow
              value={transaction ? transaction.gasLimit.toBigInt().toLocaleString() : undefined}
              rawValue={transaction?.gasLimit.toBigInt().toLocaleString() || 0}
            >
              Gas Limit
            </DataBoxRow>

            <DataBoxRow
              value={
                loadingReceipt
                  ? undefined
                  : receipt
                  ? receipt.gasUsed.toBigInt().toLocaleString()
                  : 'Unknown'
              }
              rawValue={
                loadingReceipt
                  ? undefined
                  : receipt
                  ? receipt.gasUsed.toBigInt().toLocaleString()
                  : 'Unknown'
              }
            >
              Gas Used
            </DataBoxRow>

            <DataBoxRow
              value={
                loadingReceipt
                  ? undefined
                  : receipt
                  ? parseEther(receipt.gasUsed.mul(receipt.effectiveGasPrice), 10)
                  : 'Unknown'
              }
              rawValue={
                loadingReceipt
                  ? undefined
                  : receipt
                  ? utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
                  : 'Unknown'
              }
              after=" ETH"
            >
              Fee Paid
            </DataBoxRow>
          </DataBoxContents>
        </DataBox>
      </FlexBox>
    </FlexBox>
  );
};
