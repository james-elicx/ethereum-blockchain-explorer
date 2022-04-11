import { FlexBox, Skeleton } from '../../../components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  after?: string;
  before?: string;
  value: any;
  loadingHeight?: number | string;
};

export const DataBoxRow = ({
  children,
  value,
  before = '',
  after = '',
  loadingHeight = 20.5,
  ...rest
}: Props): JSX.Element => (
  <FlexBox className="data-row" direction="row" align="center" wrap="wrap">
    <span className="data-row-title">{children}</span>
    {value !== undefined ? (
      <span className="data-row-value" {...rest}>
        {before}
        {value}
        {after}
      </span>
    ) : (
      <Skeleton height={loadingHeight} className="data-row-value loading" {...rest} />
    )}
  </FlexBox>
);
