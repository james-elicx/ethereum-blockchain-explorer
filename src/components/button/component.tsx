import './component.scss';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  invertColor?: boolean;
  disabled?: boolean;
};

export const Button = ({
  children,
  className = '',
  disabled = false,
  invertColor = false,
  ...rest
}: Props): JSX.Element => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`${className} ${invertColor ? 'invert-color' : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
