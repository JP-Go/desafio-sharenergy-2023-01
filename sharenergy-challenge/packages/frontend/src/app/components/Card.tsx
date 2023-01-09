import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card(props: CardProps) {
  const { className, children, ...rest } = props;
  return (
    <div className={`bg-white w-full rounded-lg ${className}`} {...rest}>
      {children}
    </div>
  );
}
