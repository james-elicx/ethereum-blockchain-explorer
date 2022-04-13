type Props = React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = ({ children, ...rest }: Props): JSX.Element => (
  <tr className="table-contents-row" {...rest}>
    {children}
  </tr>
);
