import { useEffect } from 'react';

export interface SnackBarProps {
  message: string;
  variant: 'warn' | 'error';
  onClose: () => void;
  shouldOpen: boolean;
  durationInMs: number;
}

export default function SnackBar({
  message,
  shouldOpen,
  variant,
  onClose,
  durationInMs,
}: SnackBarProps) {
  useEffect(() => {
    if (shouldOpen) {
      setTimeout(() => {
        onClose();
      }, durationInMs);
    }
  }, [shouldOpen]);

  const bgColor = variant === 'warn' ? 'bg-indigo-700/70' : 'bg-red-700/70';
  const shouldTranslate = shouldOpen ? '' : '-translate-x-full left-0';

  function clickHandle() {}

  return (
    <div
      onClick={clickHandle}
      className={`snackbar-base ${shouldTranslate} ${bgColor}`}
    >
      {message}
    </div>
  );
}
