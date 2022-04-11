import clsx from 'clsx';
import { default as BaseSkeleton } from 'react-loading-skeleton';

type Props = {
  className?: string;
  count?: number;
  height: number | string;
  style?: React.CSSProperties;
  width?: number | string;
};

export const Skeleton = ({
  className,
  count = 1,
  height,
  style,
  width = '100%',
}: Props): JSX.Element => (
  <BaseSkeleton
    baseColor="#24242d"
    highlightColor="#292937"
    count={count}
    height={height}
    width={width}
    containerClassName={clsx(className)}
    style={style ? style : {}}
  />
);
