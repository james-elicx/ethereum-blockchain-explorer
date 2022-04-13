import { FlexBox, Skeleton } from '../../../components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  after?: string;
  before?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  loadingHeight?: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawValue?: any;
  titleStyle?: React.CSSProperties;
};

export const DataBoxRow = ({
  children,
  value,
  before = '',
  after = '',
  loadingHeight = 19,
  rawValue = value,
  titleStyle = {},
  ...rest
}: Props): JSX.Element => (
  <FlexBox className="data-row" direction="row" align="center" wrap="wrap">
    <span className="data-row-title" style={titleStyle}>
      {children}
    </span>
    {value !== undefined ? (
      <span className="data-row-value" title={`${before}${rawValue}${after}`} {...rest}>
        {before}
        {value}
        {after}
      </span>
    ) : (
      <Skeleton height={loadingHeight} className="data-row-value loading" {...rest} />
    )}
  </FlexBox>
);
