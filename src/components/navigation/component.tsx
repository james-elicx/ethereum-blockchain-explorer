import { Link } from 'react-router-dom';
import { AddressBox } from './address-box';

import './component.scss';

export const Navigation = (): JSX.Element => {
  return (
    <nav className="navigation">
      <Link to="/">Ethereum Explorer</Link>

      <AddressBox className="connect-btn" />
    </nav>
  );
};
