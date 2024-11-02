import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { cva, VariantProps } from 'cva';
import Fallback from '@/assets/icons/fallback.svg?react';

const iconVariants = cva('', {
  variants: {
    size: {
      '6xs': 2,
      '5xs': 4,
      '4xs': 6,
      '3xs': 8,
      '2xs': 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 22,
      '3xl': 24,
      '4xl': 26,
      '5xl': 28,
      '6xl': 30,
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
interface BaseIconProps extends Omit<LucideProps, 'ref' | 'size'>, VariantProps<typeof iconVariants> {
  name: keyof typeof dynamicIconImports;
}
const BaseIcon: React.FC<BaseIconProps> = ({ name, size, ...props }) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={<Fallback className="animate-pulse" />}>
      <LucideIcon size={iconVariants({ size })} {...props} />
    </Suspense>
  );
};

export default BaseIcon;
