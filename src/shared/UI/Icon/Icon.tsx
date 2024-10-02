import { FC, memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Icon.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  color?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
  clickable?: true;
  onClick?: ((e: any) => void) | undefined;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
  const { className, color = 'var(--hopeful-dream)', Svg, width = 32, height = 32, clickable, ...otherProps } = props;

  const icon = (
    <Svg
      className={classNames('icon', {}, [className])}
      width={width}
      height={height}
      fill={color}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button type="button" className="icon__button" onClick={props.onClick} style={{ height, width }}>
        {icon}
      </button>
    );
  }

  return icon;
});
