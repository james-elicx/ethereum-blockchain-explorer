import { memo } from 'react';
import { Button } from '../../../components';
import { useWallet } from '../../../contexts';
import { trimAddress } from '../../../utils';
import { Avatar } from '../../../components/web3';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  address: string;
};

const Address = memo(
  ({ address, ...rest }: Props): JSX.Element => (
    <Button style={{ margin: 0, padding: '7px 15px', cursor: 'initial' }} {...rest}>
      <Avatar address={address} />
      {trimAddress(address)}
    </Button>
  ),
);

export const AddressBox = (rest: React.HTMLAttributes<HTMLButtonElement>): JSX.Element => {
  const { address, connect } = useWallet();

  return address ? (
    <Address address={address} {...rest} />
  ) : (
    <Button style={{ margin: 0, padding: '7px 15px' }} onClick={() => connect()} {...rest}>
      Connect Wallet
    </Button>
  );
};
