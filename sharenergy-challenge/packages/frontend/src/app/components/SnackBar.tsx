import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  const timeoutHandle = () =>
    setTimeout(() => {
      onClose();
    }, durationInMs);
  useEffect(() => {
    if (shouldOpen) {
      timeoutHandle();
    }
  }, [shouldOpen]);

  const bgColor = variant === 'warn' ? 'bg-indigo-700/70' : 'bg-red-700/70';
  const shouldTranslate = shouldOpen ? '' : '-translate-x-full left-0';

  function clickHandle() {
    clearTimeout(timeoutHandle());
    onClose();
  }

  return createPortal(
    <div
      onClick={clickHandle}
      className={`snackbar-base ${shouldTranslate} ${bgColor}`}
    >
      {message}
    </div>,
    document.body
  );
}
