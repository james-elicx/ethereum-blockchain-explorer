import clsx from 'clsx';
import './component.scss';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  fill?: boolean;
};

export const DataBox = ({ children, fill, ...rest }: Props): JSX.Element => (
  <div className={clsx('data-box', fill && 'data-box-max')} {...rest}>
    {children}
  </div>
);
