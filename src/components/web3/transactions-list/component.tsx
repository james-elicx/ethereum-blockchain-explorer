import moment from 'moment';
import { FlexBox, Skeleton } from '../../../components';
import { useInfura } from '../../../contexts';
import { TransactionItem } from './transaction-item';

export const Transactions = () => {
  const { loadingInitial, transactions } = useInfura();

  return loadingInitial ? (
    <Skeleton
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
        .map((tx) => tx && tx.hash && <TransactionItem key={tx.hash} tx={tx} />)}
    </FlexBox>
  );
};
