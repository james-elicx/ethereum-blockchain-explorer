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
import { useCloudflare, useToast } from '../../contexts';

import './page.scss';

export const Address = (): JSX.Element => {
  const { cloudflare } = useCloudflare();
  const { sendToast } = useToast();
  const { id } = useParams();

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [txCount, setTxCount] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  useEffect(() => console.log(address), [address]);

  /**
   * Fetch the address if a user inputs an ENS domain, otherwise parse the address.
   */
  useEffect(() => {
    if (!id || !cloudflare) {
      if (!id) sendToast('Invalid address');
      return;
    }

    if (id.endsWith('.eth')) {
      cloudflare
        .resolveName(id)
        .then((resolved) => {
          if (resolved) {
            setAddress(resolved);
          } else {
            throw new Error('Invalid address');
          }
        })
        .catch((err) => {
          console.error(err);
          sendToast(err.message);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else {
      try {
        const addy = utils.getAddress(id);

        if (addy) {
          setAddress(addy);
        } else {
          throw new Error('Invalid address');
        }
      } catch (err) {
        console.error(err);
        sendToast('Invalid address');
        setError('Invalid address');
      }

      setLoading(false);
    }

    return () => {
      setError(false);
      setLoading(true);
      setAddress(undefined);
    };
  }, [id, sendToast, cloudflare]);

  /**
   * Fetch balance and transaction count for an address.
   */
  useEffect(() => {
    if (!address || !cloudflare) return;

    cloudflare
      .getBalance(address)
      .then((bal) => {
        setBalance(parseFloat((+utils.formatEther(bal)).toFixed(10)));
      })
      .catch((err) => {
        console.error('Error getting balance:', err);
        sendToast('Error getting balance.');
      });

    cloudflare
      .getTransactionCount(address)
      .then((count) => {
        setTxCount(count);
      })
      .catch((err) => {
        console.error('Error getting transaction count:', err);
        sendToast('Error getting transaction count.');
      });

    return () => {
      setBalance(undefined);
      setTxCount(undefined);
    };
  }, [address, cloudflare, sendToast]);

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
          <DataBoxTitle>Address Info</DataBoxTitle>

          <DataBoxContents>
            <DataBoxRow value={balance} after=" ETH">
              Balance
            </DataBoxRow>

            <DataBoxRow value={txCount}>Transactions</DataBoxRow>
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
