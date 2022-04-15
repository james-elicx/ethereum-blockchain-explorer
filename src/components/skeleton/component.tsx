import clsx from 'clsx';
import { default as BaseSkeleton } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    baseColor="var(--color-darkerish)"
    highlightColor="var(--color-darkish)"
    count={count}
    height={height}
    width={width}
    containerClassName={clsx(className)}
    style={style ? style : {}}
  />
);
