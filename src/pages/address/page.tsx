import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { Avatar } from '../../components/web3';
import { useChainData, useToast } from '../../contexts';

import './page.scss';

export const Address = (): JSX.Element => {
  const { chainData } = useChainData();
  const { sendToast } = useToast();
  const { id } = useParams();

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [txCount, setTxCount] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  /**
   * Fetch the address if a user inputs an ENS domain, otherwise parse the address.
   */
  useEffect(() => {
    if (!id || !chainData) {
      if (!id) sendToast('Invalid address');
      return;
    }

    let cancel = false;

    if (id.endsWith('.eth')) {
      console.debug('Resolving the ENS domain', id);

      chainData
        .resolveName(id)
        .then((resolved) => {
          if (cancel) return;

          if (resolved) {
            setAddress(resolved);
          } else {
            throw new Error('Failed to resolve ENS domain');
          }
        })
        .catch((err) => {
          console.error(err);
          sendToast('Failed to resolve ENS domain');
          setError('Failed to resolve ENS domain');
        })
        .finally(() => setLoading(false));
    } else {
      console.debug('Resolving the address', id);

      try {
        const addy = utils.getAddress(id);

        if (cancel) return;

        if (addy) {
          setAddress(addy);
        } else {
          throw new Error('Failed to resolve address');
        }
      } catch (err) {
        console.error(err);
        sendToast('Failed to resolve address');
        setError('Failed to resolve address');
      }

      setLoading(false);
    }

    return () => {
      cancel = true;
      setError(false);
      setLoading(true);
      setAddress(undefined);
    };
  }, [id, sendToast, chainData]);

  /**
   * Fetch balance and transaction count for an address.
   */
  useEffect(() => {
    if (!address || !chainData) return;

    let cancel = false;

    console.debug('Fetching the balance for', address);

    chainData
      .getBalance(address)
      .then((bal) => {
        if (cancel) return;

        setBalance(parseFloat((+utils.formatEther(bal)).toFixed(10)));
      })
      .catch((err) => {
        console.error('Error getting balance:', err);
        sendToast('Error getting balance.');
      });

    console.debug('Fetching the tx count for', address);

    chainData
      .getTransactionCount(address)
      .then((count) => {
        if (cancel) return;

        setTxCount(count);
      })
      .catch((err) => {
        console.error('Error getting transaction count:', err);
        sendToast('Error getting transaction count.');
      });

    return () => {
      cancel = true;
      setBalance(undefined);
      setTxCount(undefined);
    };
  }, [address, chainData, sendToast]);

  return error ? (
    <>
      <SearchBox style={{ marginTop: 'auto', marginBottom: '2em' }} />
      <span style={{ marginBottom: 'auto', fontSize: 18 }}>{error}</span>
    </>
  ) : loading ? (
    <Loading>Loading address...</Loading>
  ) : (
    <FlexBox direction="col" style={{ width: '70%', margin: '15px 0' }}>
      <FlexBox align="center">
        {address ? (
          <>
            <Avatar address={address} diameter={24} />
            <span className="address-text">{address}</span>
          </>
        ) : (
          <>
            <Skeleton width={30} height={30} style={{ marginRight: 10 }} />
          </>
        )}
      </FlexBox>

      <FlexBox wrap="wrap" justify="space-between" style={{ marginTop: 15 }}>
        <DataBox>
          <DataBoxTitle>Address Data</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow value={balance} after=" ETH">
              Balance
            </DataBoxRow>

            <DataBoxRow value={txCount?.toLocaleString()}>Transactions</DataBoxRow>
          </DataBoxContents>
        </DataBox>

        <DataBox>
          <DataBoxTitle>Additional Info</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow value={<a href={`https://etherscan.io/address/${address}`}>Click here</a>}>
              Etherscan Link
            </DataBoxRow>
          </DataBoxContents>
        </DataBox>
      </FlexBox>
    </FlexBox>
  );
};
