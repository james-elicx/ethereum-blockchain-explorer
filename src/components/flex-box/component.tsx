import clsx from 'clsx';

import './component.scss';

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
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | 'initial' | 'inherit';
};

export const FlexBox = ({
  align = undefined,
  children,
  className,
  direction = 'row',
  justify = undefined,
  wrap = undefined,
  ...rest
}: Props): JSX.Element => {
  return (
    <div
      className={clsx(
        className,
        'f-flexbox',
        justify && `f-justify-${justify}`,
        align && `f-align-${align}`,
        wrap && `f-wrap-${wrap}`,
        direction && `f-dir-${direction}`,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export type { Props as FlexBoxProps };
