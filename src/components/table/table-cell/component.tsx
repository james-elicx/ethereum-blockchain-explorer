type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  scope?: string;
  minWidth?: number | string;
  type?: 'data' | 'header';
  width?: number | string;
};

export const TableCell = ({
  children,
  scope = 'col',
  minWidth,
  type = 'data',
  width,
  ...rest
}: Props): JSX.Element =>
  type === 'header' ? (
    <th
      scope={scope}
      className="table-cell table-header-cell"
      style={{ ...(minWidth ? { minWidth: minWidth } : {}), ...(width ? { width: width } : {}) }}
      {...rest}
    >
      {children}
    </th>
  ) : (
    <td className="table-cell table-contents-cell" {...rest}>
      {children}
    </td>
  );
