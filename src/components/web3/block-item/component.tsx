import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { BlockWithTransactions, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, utils } from 'ethers';
import moment from 'moment';
import { FlexBox } from '../../../components';
import './component.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  block: BlockWithTransactions;
};

// eslint-disable-next-line import/no-named-as-default-member
moment.relativeTimeThreshold('ss', 0);

const Transactions = memo(({ txs }: { txs: TransactionResponse[] }) => (
  <span className="block-normal">
    {(+utils.formatEther(
      txs.reduce((val, tx) => {
        return val.add(tx.value);
      }, BigNumber.from(0)),
    )).toFixed(2)}{' '}
    ETH
  </span>
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
