import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`w-full bg-white mx-auto flex items-center gap-8 rounded-lg leading-relaxed ${className}`}
    >
      {children}
    </div>
  );
}
