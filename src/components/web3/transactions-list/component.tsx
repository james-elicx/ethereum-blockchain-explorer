import moment from 'moment';
import { FlexBox } from '../../../components';
import { useInfura } from '../../../contexts';
import { trimAddress } from '../../../utils';

export const Transactions = () => {
  const { transactions } = useInfura();

  return (
    <FlexBox direction="col">
      {transactions
        .sort((a, b) => {
          // eslint-disable-next-line import/no-named-as-default-member
          return !b.timestamp || !a.timestamp ? moment.now() : b.timestamp - a.timestamp;
        })
        .slice(1)
        .slice(-5)
        .map((tx) => (
          <span key={tx.hash}>{trimAddress(tx.hash)}</span>
        ))}
    </FlexBox>
  );
};