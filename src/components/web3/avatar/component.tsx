import { memo, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useWallet } from '../../../contexts';

type Props = {
  address: string;
};

export const Avatar = memo(({ address }: Props): JSX.Element => {
  const { metaMask } = useWallet();

  const [avatar, setAvatar] = useState<string | null>(null);

  metaMask?.getAvatar(address).then((data) => {
    if (avatar) setAvatar(data);
  });

  return avatar ? (
    <img style={{ width: 24, height: 24 }} src={avatar} alt="avatar" />
  ) : (
    <Jazzicon diameter={24} seed={jsNumberForAddress(address)} paperStyles={{ marginRight: 10 }} />
  );
});
