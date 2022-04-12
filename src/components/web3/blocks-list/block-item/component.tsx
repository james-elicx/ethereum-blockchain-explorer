import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { BlockWithTransactions, TransactionResponse } from '@ethersproject/abstract-provider';
import moment from 'moment';
import { valueOfTxs } from '../../../../utils';
import { FlexBox } from '../../../../components';
import './component.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  block: BlockWithTransactions;
};

// eslint-disable-next-line import/no-named-as-default-member
moment.relativeTimeThreshold('ss', 0);

const Transactions = memo(({ txs }: { txs: TransactionResponse[] }) => (
  <span className="block-normal">{valueOfTxs(txs)} ETH</span>
));

export const BlockItem = ({ block, ...rest }: Props): JSX.Element => (
  <div className="block-item" {...rest}>
    <FlexBox direction="col" align="flex-start">
      <Link to={`/block/${block.number}`} className="block-heading">
        {block.number}
      </Link>
      <span className="block-normal">{moment(block.timestamp * 1000).fromNow()}</span>
    </FlexBox>

    <FlexBox direction="col" align="flex-end">
      <span className="block-heading">
        {block.transactions.length} <span className="block-normal">transactions</span>
      </span>
      <Transactions txs={block.transactions} />
    </FlexBox>
  </div>
);
