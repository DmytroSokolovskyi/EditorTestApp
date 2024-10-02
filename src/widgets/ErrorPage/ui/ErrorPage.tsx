import './ErrorPage.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/UI/Button';

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames('ErrorPage', {}, [className])}>
      <p>An error occurred</p>
      <Button onClick={reloadPage}>Refresh the page</Button>
    </div>
  );
};
