import { AddressBox } from './address-box';

import './component.scss';

export const Navigation = (): JSX.Element => {
  return (
    <nav className="navigation">
      <span>Ethereum Explorer</span>

      <AddressBox className="connect-btn" />
    </nav>
  );
};
