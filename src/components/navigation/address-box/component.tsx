import { memo } from 'react';
import { Button } from '../../../components';
import { useWallet } from '../../../contexts';
import { trimAddress } from '../../../utils';
import { Avatar } from '../../../components/web3';

type Props = {
  address: string;
};

const Address = memo(
  ({ address }: Props): JSX.Element => (
    <Button style={{ margin: 0, padding: '7px 15px', cursor: 'initial' }}>
      <Avatar address={address} />
      {trimAddress(address)}
    </Button>
  ),
);

export const AddressBox = (): JSX.Element => {
  const { address, connect } = useWallet();

  return address ? (
    <Address address={address} />
  ) : (
    <Button style={{ margin: 0, padding: '7px 15px' }} onClick={() => connect()}>
      Connect Wallet
    </Button>
  );
};
