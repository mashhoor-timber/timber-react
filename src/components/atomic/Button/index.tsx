import {
  extendVariants,
  Button as NextButton,
} from '@heroui/react';
import type { ComponentProps } from 'react';

// Get base props without color
type BaseProps = Omit<ComponentProps<typeof NextButton>, 'color'>;

// Define new color values
type CustomColor =
  | 'white'
  | 'primary'
  | 'secondary'
  | 'text'
  | 'transparent'
  | 'icon';

// Define final props
type CustomButtonProps = BaseProps & {
  color?: CustomColor;
};

const Button = extendVariants(NextButton, {
  variants: {
    color: {
      white:
        'bg-light border border-primary text-primary hover:text-primary hover:border-primary',
      primary: 'bg-primary text-light hover:bg-primary',
      secondary:
        'bg-light font-medium border border-transparent text-secondary hover:text-primary hover:border-primary',
      text: 'text-primary bg-transparent',
      transparent: 'bg-transparent border border-divider',
      icon: 'bg-transparent text-white',
    },
    size: {
      xs: 'px-2 min-w-12 h-6 text-tiny gap-1 rounded-small',
      sm: 'px-4 min-w-16 h-8 text-tiny gap-2 rounded-small',
      md: 'px-4 min-w-24 h-10 text-small gap-2 rounded-medium font-medium',
      lg: 'px-4 min-w-24 h-12 text-small gap-2 font-medium',
      xl: 'px-8 min-w-28 h-[60px] text-large gap-4 rounded-medium font-medium',
      fit: 'p-0 h-10 min-w-10',
    },
    radius: {
      full: 'rounded-full',
      medium: 'rounded-medium',
      small: 'rounded-small',
    },
  },
  defaultVariants: {
    color: 'white',
    size: 'lg',
    radius: 'medium',
  },
}) as React.FC<CustomButtonProps>;

export default Button;
