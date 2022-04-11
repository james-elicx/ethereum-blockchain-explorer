type Props = React.HTMLAttributes<HTMLSpanElement>;

export const DataBoxTitle = ({ children, ...rest }: Props): JSX.Element => (
  <span className="data-box-title" {...rest}>
    {children}
  </span>
);
