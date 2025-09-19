import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

export const TextVariants = cva(['text-pretty'], {
  defaultVariants: {
    variant: 'p1',
  },
  variants: {
    variant: {
      h1: [
        'text-white',
        'text-4xl',
        'font-extrabold',
        'tracking-tight',
        'sm:text-5xl',
        'md:text-6xl',
        'lg:text-5xl',
        'xl:text-6xl',
      ],
      h2: [
        'text-white',
        'text-3xl',
        'font-bold',
        'tracking-tight',
        'sm:text-4xl',
        'md:text-5xl',
        'lg:text-4xl',
        'xl:text-5xl',
      ],
      h3: [
        'text-white',
        'text-2xl',
        'font-bold',
        'tracking-tight',
        'sm:text-3xl',
        'md:text-4xl',
        'lg:text-3xl',
        'xl:text-4xl',
      ],
      h4: [
        'text-white',
        'text-xl',
        'font-bold',
        'tracking-tight',
        'sm:text-2xl',
        'md:text-3xl',
        'lg:text-2xl',
        'xl:text-3xl',
      ],
      s1: [
        'text-white',
        'text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl',
      ],
      s2: [
        'text-white',
        'text-lg',
        'sm:text-xl',
        'md:text-2xl',
        'lg:text-xl',
        'xl:text-2xl',
      ],      
      c1: ['text-white', 'text-base'],
      c2: [
        'text-white',
        'text-sm',
        'font-medium',
      ],      
      p1: [
        'text-white',
        'text-base',
        'sm:text-lg',
        'md:text-xl',
        'lg:text-lg',
        'xl:text-xl',
      ],
      p2: [
        'text-white',
        'text-sm',
        'font-medium',
        'sm:text-base',
        'md:text-lg',
        'lg:text-base',
        'xl:text-lg',
      ],
    },
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof TextVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 's1'
    | 's2'
    | 'p1'
    | 'p2'
    | 'c1'
    | 'c2'
    | undefined;
}

export const Text: React.FC<TextProps> = ({
  as: Element = 'p',
  children,
  className,
  variant = 'p1',
  ...rest
}) => {
  return (
    <Element className={TextVariants({ className, variant })} {...rest}>
      {children}
    </Element>
  );
};
