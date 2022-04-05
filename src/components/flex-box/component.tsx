type Props = React.HTMLAttributes<HTMLDivElement> & {
  direction?: 'col' | 'column' | 'row';
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
  align?:
    | 'start'
    | 'end'
    | 'center'
    | 'baseline'
    | 'stretch'
    | 'initial'
    | 'inherit'
    | 'flex-start'
    | 'flex-end';
};

export const FlexBox = ({
  align = 'initial',
  children,
  direction = 'row',
  justify = 'initial',
  style,
  ...rest
}: Props): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'col' ? 'column' : direction,
        justifyContent: justify,
        alignItems: align,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export type { Props as FlexBoxProps };
