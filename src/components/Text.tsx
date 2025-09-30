import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TxKeyPath } from '../i18n/i18n';
import { TOptions } from "i18next";
import { translate } from '../i18n/translate';

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
      price: [
        'text-2xl',
        'sm:text-3xl',
        'font-mono',
        'text-green-400',
      ],
      carPageName: [
        'text-2xl',
        'sm:text-3xl',
        'font-bold',
        'text-white',
        'mb-2',
      ],
      carPageBrand: [
        'text-lg',
        'sm:text-xl',
      ],
      carPageClass: [
        'text-gray-400',
      ],
      carPageTitleStats: [
        'text-gray-400',
        'text-sm'
      ],
      carPageStats: [
        'text-white'
      ],
      colorTitle: [
        'text-white',
        'text-lg',
        'mb-4',
        'text-center'
      ],
      carPageDescription: [
        'text-gray-300',
        'text-center',
        'italic',
        'leading-relaxed'
      ],
      weaponSystemTitle: [
        'text-white',
        'text-xl',
        'font-bold',
        'mb-6',
        'text-center',
        'flex',
        'items-center',
        'justify-center',
        'gap-2'
      ],
      weaponSystemTitleStats: [
        'text-gray-400',
        'text-xs',
      ],
      weaponSystemSubtitle: [
        'text-white',
        'font-semibold',
        'text-lg',
      ],
      filterTitleAndCarGridModel: [
        'text-xl',
        'font-bold',
        'text-white'
      ],
      filterSubtitle: [
        'text-white',
        'mb-2'
      ],
      filterByPrice: [
        'text-green-400',
        'font-mono',
        'whitespace-nowrap',
        'text-xs'
      ],
      carCardPrice: [
        'text-green-400',
        'font-mono',
        'whitespace-nowrap',
      ],
      carCardBrand: [
        'text-red-500',
      ],
      carCardStat: [
        'flex',
        'items-center',
        'gap-2',
        'text-gray-400', //investigate of why on some cars it goes a line under the text.
      ],
    },
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof TextVariants> {
  as?: React.ElementType;
  children?: React.ReactNode;
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions;
  className?: string;
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
    | 'price'
    | 'carPageName'
    | 'carPageBrand'
    | 'carPageClass'
    | 'carPageTitleStats'
    | 'carPageStats'
    | 'colorTitle'
    | 'carPageDescription'  
    | 'weaponSystemTitle'
    | 'weaponSystemTitleStats'
    | 'weaponSystemSubtitle'
    | 'filterTitleAndCarGridModel'
    | 'filterSubtitle'  
    | 'filterByPrice'
    | 'carCardPrice'
    | 'carCardBrand'
    | 'carCardStat'
    | undefined;
}

export function Text(props: TextProps) {
  const {
    tx,
    txOptions,
    children,
    variant = "p1",
    className,
    as = 'p',
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || children;  
  
  const Component = as;

  return (
    <Component className={TextVariants({ className, variant })} {...rest}>
      {content}
    </Component>
  );
};
