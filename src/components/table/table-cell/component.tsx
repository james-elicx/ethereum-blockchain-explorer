type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  scope?: string;
  type?: 'data' | 'header';
};

export const TableCell = ({
  children,
  scope = 'col',
  type = 'data',
  ...rest
}: Props): JSX.Element =>
  type === 'header' ? (
    <th scope={scope} className="table-header-cell" {...rest}>
      {children}
    </th>
  ) : (
    <td className="table-contents-cell" {...rest}>
      {children}
    </td>
  );
