import './component.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const DataBox = ({ children, ...rest }: Props): JSX.Element => (
  <div className="data-box" {...rest}>
    {children}
  </div>
);
