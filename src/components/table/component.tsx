import './component.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Table = ({ children, ...rest }: Props): JSX.Element => (
  <table className="table" {...rest}>
    {children}
  </table>
);
