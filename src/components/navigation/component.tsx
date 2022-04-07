import { FlexBox } from '../../components';
import { AddressBox } from './address-box';

import './component.scss';

export const Navigation = (): JSX.Element => {
  return (
    <FlexBox justify="space-between" align="center" className="navigation">
      <span>Ethereum Explorer</span>

      <AddressBox />
    </FlexBox>
  );
};
