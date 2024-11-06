import { lazy, Suspense, memo } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { cva, VariantProps } from 'cva';

const iconVariants = cva('', {
  variants: {
    size: {
      xs: 12,
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
interface BaseIconProps extends Omit<LucideProps, 'ref' | 'size'>, VariantProps<typeof iconVariants> {
  name: keyof typeof dynamicIconImports;
}
const BaseIcon: React.FC<BaseIconProps> = ({ name, size, ...props }) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={<></>}>
      <LucideIcon size={iconVariants({ size })} {...props} />
    </Suspense>
  );
};

export default memo(BaseIcon);
