import { FlexBox, Skeleton } from '../../../components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  after?: string;
  before?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  loadingHeight?: number | string;
  titleStyle?: React.CSSProperties;
};

export const DataBoxRow = ({
  children,
  value,
  before = '',
  after = '',
  loadingHeight = 20.5,
  titleStyle = {},
  ...rest
}: Props): JSX.Element => (
  <FlexBox className="data-row" direction="row" align="center" wrap="wrap">
    <span className="data-row-title" style={titleStyle}>
      {children}
    </span>
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
