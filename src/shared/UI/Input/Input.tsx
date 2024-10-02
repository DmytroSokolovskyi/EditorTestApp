import { ComponentPropsWithoutRef, FC, SVGProps, forwardRef, useId } from 'react';
import './Input.scss';

import { Icon } from '@/shared/UI/Icon';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  errorMessage?: string;
  label?: string;
  type?: string;
  IconLeft?: FC<SVGProps<SVGSVGElement>>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, IconLeft, type = 'string', ...rest }, ref) => {
    const id = useId();

    return (
      <>
        {!!label && <label htmlFor={id}>{label}</label>}
        <div className="input-wrapper">
          {IconLeft && <Icon Svg={IconLeft} width={18} fill="var(--plum-smoke)" className="leftIcon" />}
          <input {...rest} type={type} ref={ref} id={id} />
        </div>
        {!!errorMessage && <span className="input-error">{errorMessage}</span>}
      </>
    );
  },
);

export default Input;
