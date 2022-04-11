import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { Container, FlexBox, SearchBox } from '../../components';
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

  useEffect(() => {
    if (!id || !cloudflare) {
      if (!id) sendToast('Invalid address');
      return;
    }

    if (id.endsWith('.eth')) {
      cloudflare
        ?.resolveName(id)
        .then((resolved) => {
          if (resolved) {
            setAddress(resolved);
          } else {
            console.error('Invalid address');
            sendToast('Invalid address');
            setError('Invalid address');
          }
        })
        .catch((err) => {
          sendToast(err.message);
          setError(err.message);
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      console.log('else');
      try {
        const addy = utils.getAddress(id);
        console.log(addy);
        if (addy) {
          setAddress(addy);
          setLoading(false);
        } else {
          console.error('Invalid address');
          sendToast('Invalid address');
          setError('Invalid address');
        }
      } catch (err) {
        console.error(err);
        sendToast('Invalid address');
        setError('Invalid address');
      }
    }

    return () => {
      setError(false);
      setLoading(true);
      setAddress(undefined);
    };
  }, [id, sendToast, cloudflare]);

  useEffect(() => {
    if (!address || !cloudflare) return;

    cloudflare
      .getBalance(address)
      .then((bal) => {
        setBalance(parseFloat((+utils.formatEther(bal)).toFixed(5)));
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

  // TODO: Change back to flex boxes and do responsiveness like etherscan does

  return error ? (
    <>
      <SearchBox style={{ marginTop: 'auto', marginBottom: '2em' }} />
      <span style={{ marginBottom: 'auto', fontSize: 18 }}>{error}</span>
    </>
  ) : loading ? (
    <span>Loading</span>
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
            <Skeleton
              baseColor="#24242d"
              highlightColor="#292937"
              count={1}
              width={30}
              height={30}
              circle
              style={{ marginRight: 10 }}
            />
            <Skeleton
              baseColor="#24242d"
              highlightColor="#292937"
              count={1}
              height={25}
              width="100%"
              containerClassName="skeleton-text-container"
            />
          </>
        )}
      </FlexBox>

      <FlexBox wrap="wrap" justify="space-between">
        <Container className="container container-flex">
          <table className="data-table">
            <tr>
              <th>Balance:</th>
              <td>
                {!balance ? (
                  balance + ' ETH'
                ) : (
                  <Skeleton
                    baseColor="#24242d"
                    highlightColor="#292937"
                    count={1}
                    height={20.5}
                    width="100%"
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>Transactions:</th>
              <td>
                {txCount ? (
                  txCount
                ) : (
                  <Skeleton
                    baseColor="#24242d"
                    highlightColor="#292937"
                    count={1}
                    height={20.5}
                    width="100%"
                  />
                )}
              </td>
            </tr>
          </table>
        </Container>

        <Container className="container container-flex">
          <table className="data-table">
            <tr>
              <th>Balance:</th>
              <td>
                {balance ? (
                  balance + ' ETH'
                ) : (
                  <Skeleton
                    baseColor="#24242d"
                    highlightColor="#292937"
                    count={1}
                    height={20.5}
                    width="100%"
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>Transactions:</th>
              <td>
                {txCount ? (
                  txCount
                ) : (
                  <Skeleton
                    baseColor="#24242d"
                    highlightColor="#292937"
                    count={1}
                    height={20.5}
                    width="100%"
                  />
                )}
              </td>
            </tr>
          </table>
        </Container>
      </FlexBox>
    </FlexBox>
  );
};
