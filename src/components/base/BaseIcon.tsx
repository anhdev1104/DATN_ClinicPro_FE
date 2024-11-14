import { cva, VariantProps } from 'cva';
import { cn } from '@/helpers/utils';
import { Icon, IconProps } from '@tabler/icons-react';
import { memo } from 'react';
const iconVariants = cva('', {
  variants: {
    size: {
      xxs: 12,
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28,
      '2xl': 32,
      '3xl': 36,
      '4xl': 40,
      '5xl': 44,
      '6xl': 48,
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});
interface BaseIconProps extends Omit<IconProps, 'size'>, VariantProps<typeof iconVariants> {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}
const BaseIcon: React.FC<BaseIconProps> = ({ icon: Icon, size, ...props }) => {
  return <Icon size={cn(iconVariants({ size }))} {...props} />;
};

export default memo(BaseIcon);
