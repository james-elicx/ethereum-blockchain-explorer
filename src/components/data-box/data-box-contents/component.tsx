type Props = React.HTMLAttributes<HTMLDivElement>;

export const DataBoxContents = ({ children, ...rest }: Props): JSX.Element => (
  <div className="data-box-contents" {...rest}>
    {children}
  </div>
);
