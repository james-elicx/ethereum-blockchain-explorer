import { memo, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useWallet } from '../../../contexts';

type Props = {
  address: string;
  diameter?: number;
  style?: React.CSSProperties;
};

export const Avatar = memo(
  ({ address, diameter = 24, style = { marginRight: 10 } }: Props): JSX.Element => {
    const { metaMask } = useWallet();

    const [avatar, setAvatar] = useState<string | null>(null);

    metaMask?.getAvatar(address).then((data) => {
      if (avatar) setAvatar(data);
    });

    return avatar ? (
      <img style={{ width: diameter, height: diameter, ...style }} src={avatar} alt="avatar" />
    ) : (
      <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} paperStyles={style} />
    );
  },
);
