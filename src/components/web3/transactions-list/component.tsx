import { now } from 'moment';
import { FlexBox } from '../../../components';
import { useInfura } from '../../../contexts';
import { trimAddress } from '../../../utils';

export const Transactions = () => {
  const { transactions } = useInfura();

  return (
    <FlexBox direction="col">
      {transactions
        .sort((a, b) => {
          return !b.timestamp || !a.timestamp ? now() : b.timestamp - a.timestamp;
        })
        .slice(1)
        .slice(-5)
        .map((tx) => (
          <span key={tx.hash}>{trimAddress(tx.hash)}</span>
        ))}
    </FlexBox>
  );
};
