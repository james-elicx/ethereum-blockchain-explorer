import clsx from 'clsx';
import { FlexBox, Skeleton } from '../../components';

import './component.scss';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  condition: unknown;
  loadingWidth?: number | string;
  loadingHeight?: number | string;
};

export const PageTitle = ({
  children,
  className,
  condition,
  loadingWidth = 150,
  loadingHeight = 24,
  ...rest
}: Props) => {
  return (
    <FlexBox align="center">
      {condition ? (
        <span className={clsx(className, 'page-title')} {...rest}>
          {children}
        </span>
      ) : (
        <>
          <Skeleton width={loadingWidth} height={loadingHeight} />
        </>
      )}
    </FlexBox>
  );
};
