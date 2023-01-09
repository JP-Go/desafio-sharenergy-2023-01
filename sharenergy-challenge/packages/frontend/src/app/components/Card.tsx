import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="w-full bg-white mx-auto flex items-center gap-8 p-4 rounded-lg leading-relaxed">
      {children}
    </div>
  );
}
