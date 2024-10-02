import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const { className, disabled, children, loading = false, ...otherProps } = props;

  return (
    <button
      disabled={loading}
      type="button"
      className={classNames('button', { disabled: disabled }, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
