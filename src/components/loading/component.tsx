import { FlexBox } from '../../components';
import './component.scss';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'width' & 'height'> & {
  width?: number | string;
  height?: number | string;
};

export const Loading = ({ children, width = 13, height = 13, ...rest }: Props): JSX.Element => {
  return (
    <FlexBox direction="col" justify="center" align="center" style={{ margin: 'auto' }}>
      {children && <h3 style={{ marginBottom: 20 }}>{children}</h3>}
      <FlexBox direction="row" justify="center" className="loading-dots" {...rest}>
        <div style={{ width, height }}></div>
        <div style={{ width, height }}></div>
        <div style={{ width, height }}></div>
      </FlexBox>
    </FlexBox>
  );
};
