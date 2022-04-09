/* eslint-disable import/no-named-as-default-member */

import { Link } from 'react-router-dom';
import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { utils } from 'ethers';
import moment from 'moment';
import { FlexBox } from '../../../../components';
import './component.scss';
import { trimTransaction } from '../../../../utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tx: TransactionResponse;
};

// eslint-disable-next-line import/no-named-as-default-member
moment.relativeTimeThreshold('ss', 0);

export const TransactionItem = ({ tx, ...rest }: Props): JSX.Element => (
  <div className="block-item" {...rest}>
    <FlexBox direction="col" align="flex-start">
      <Link to={`/tx/${tx.hash}`} className="block-heading">
        {trimTransaction(tx.hash)}
      </Link>
      <span className="block-normal">
        {moment((tx.timestamp || moment.now() / 1000) * 1000).fromNow()}
      </span>
    </FlexBox>

    <FlexBox direction="col" align="flex-end">
      <span className="block-heading">
        {parseFloat((+utils.formatEther(tx.value)).toFixed(5))}{' '}
        <span className="block-normal">ETH</span>
      </span>
      <span className="block-normal">
        {(+utils.formatUnits(tx.gasPrice || 0, 'gwei')).toFixed(2)} Gwei
      </span>
    </FlexBox>
  </div>
);
