import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import moment from 'moment';
import { FlexBox } from '../../../components';
import { useInfura } from '../../../contexts';
import { TransactionItem } from './transaction-item';

export const Transactions = () => {
  const { loadingInitial, transactions } = useInfura();

  return loadingInitial ? (
    <Skeleton
      baseColor="#24242d"
      highlightColor="#292937"
      count={5}
      width={250}
      height={34.5}
      style={{ margin: 5, padding: 10, border: '1px solid transparent' }}
    />
  ) : (
    <FlexBox direction="col">
      {[...transactions.values()]
        .sort((a, b) => {
          // eslint-disable-next-line import/no-named-as-default-member
          return !b.timestamp || !a.timestamp ? moment.now() : a.timestamp - b.timestamp;
        })
        .slice(1)
        .slice(-5)
        .map((tx) => (
          <TransactionItem key={tx.hash} tx={tx} />
        ))}
    </FlexBox>
  );
};
