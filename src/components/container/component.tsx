import './component.scss';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Container = ({ children, ...rest }: Props): JSX.Element => (
  <div className="container" {...rest}>
    {children}
  </div>
);
