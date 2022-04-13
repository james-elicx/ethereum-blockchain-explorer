type Props = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableContents = ({ children, ...rest }: Props): JSX.Element => (
  <tbody className="table-contents" {...rest}>
    {children}
  </tbody>
);
