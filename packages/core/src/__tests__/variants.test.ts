import {
  createVariants,
  extractVariantProps,
  getDefaultVariants,
  validateVariantProps,
  mergeVariantConfigs,
  defineVariants,
  commonVariants
} from '../variants';
import type { VariantConfig } from '../types';

describe('Variant System', () => {
  const mockVariantConfig: VariantConfig<any> = {
    base: {
      padding: 8,
      borderRadius: 4
    },
    variants: {
      size: {
        sm: { padding: 4, fontSize: 12 },
        md: { padding: 8, fontSize: 14 },
        lg: { padding: 12, fontSize: 16 }
      },
      color: {
        primary: { backgroundColor: '#3B82F6', color: '#FFFFFF' },
        secondary: { backgroundColor: '#6B7280', color: '#FFFFFF' }
      },
      variant: {
        solid: { border: 'none' },
        outline: { border: '1px solid', backgroundColor: 'transparent' }
      }
    },
    compoundVariants: [
      {
        conditions: { size: 'lg', color: 'primary' },
        styles: { fontWeight: 'bold' }
      }
    ],
    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'solid'
    }
  };

  describe('createVariants', () => {
    it('creates a variant resolver function', () => {
      const resolver = createVariants(mockVariantConfig);
      expect(typeof resolver).toBe('function');
    });

    it('applies base styles', () => {
      const resolver = createVariants(mockVariantConfig);
      const result = resolver({});
      
      expect(result.padding).toBe(8);
      expect(result.borderRadius).toBe(4);
    });

    it('applies variant styles', () => {
      const resolver = createVariants(mockVariantConfig);
      const result = resolver({ size: 'lg', color: 'secondary' });
      
      expect(result.padding).toBe(12);
      expect(result.fontSize).toBe(16);
      expect(result.backgroundColor).toBe('#6B7280');
      expect(result.color).toBe('#FFFFFF');
    });

    it('applies compound variants', () => {
      const resolver = createVariants(mockVariantConfig);
      const result = resolver({ size: 'lg', color: 'primary' });
      
      expect(result.fontWeight).toBe('bold');
    });

    it('merges styles correctly', () => {
      const resolver = createVariants(mockVariantConfig);
      const result = resolver({ 
        size: 'lg', 
        color: 'primary', 
        variant: 'outline' 
      });
      
      // Base styles
      expect(result.borderRadius).toBe(4);
      // Size variant
      expect(result.padding).toBe(12);
      expect(result.fontSize).toBe(16);
      // Color variant (overridden by outline variant)
      expect(result.backgroundColor).toBe('transparent');
      expect(result.color).toBe('#FFFFFF');
      // Variant styles
      expect(result.border).toBe('1px solid');
      // Compound variant
      expect(result.fontWeight).toBe('bold');
    });
  });

  describe('extractVariantProps', () => {
    it('extracts variant props from component props', () => {
      const props = {
        size: 'lg',
        color: 'primary',
        onClick: () => {},
        children: 'Button'
      };
      
      const variantProps = extractVariantProps(mockVariantConfig, props);
      
      expect(variantProps).toEqual({
        size: 'lg',
        color: 'primary',
        variant: 'solid' // default
      });
    });

    it('applies default variants for missing props', () => {
      const props = { color: 'secondary' };
      const variantProps = extractVariantProps(mockVariantConfig, props);
      
      expect(variantProps).toEqual({
        size: 'md', // default
        color: 'secondary',
        variant: 'solid' // default
      });
    });
  });

  describe('getDefaultVariants', () => {
    it('returns default variant values', () => {
      const defaults = getDefaultVariants(mockVariantConfig);
      
      expect(defaults).toEqual({
        size: 'md',
        color: 'primary',
        variant: 'solid'
      });
    });

    it('returns empty object when no defaults', () => {
      const config = { ...mockVariantConfig, defaultVariants: undefined };
      const defaults = getDefaultVariants(config);
      
      expect(defaults).toEqual({});
    });
  });

  describe('validateVariantProps', () => {
    it('validates correct variant props', () => {
      const props = { size: 'lg', color: 'primary', variant: 'outline' };
      const result = validateVariantProps(mockVariantConfig, props);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('detects invalid variant values', () => {
      const props = { size: 'invalid', color: 'primary' };
      const result = validateVariantProps(mockVariantConfig, props);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Invalid value "invalid" for variant "size". Valid options: sm, md, lg'
      );
    });

    it('handles missing variants gracefully', () => {
      const config = { ...mockVariantConfig, variants: undefined };
      const result = validateVariantProps(config, { size: 'lg' });
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('mergeVariantConfigs', () => {
    it('merges multiple variant configurations', () => {
      const config1 = {
        base: { padding: 8 },
        variants: { size: { sm: { padding: 4 } } }
      };
      
      const config2 = {
        base: { margin: 4 },
        variants: { color: { primary: { backgroundColor: 'blue' } } }
      };
      
      const merged = mergeVariantConfigs(config1, config2);
      
      expect(merged.base).toEqual({ padding: 8, margin: 4 });
      expect(merged.variants.size).toEqual({ sm: { padding: 4 } });
      expect(merged.variants.color).toEqual({ primary: { backgroundColor: 'blue' } });
    });
  });

  describe('defineVariants', () => {
    it('returns the configuration as-is with type safety', () => {
      const config = defineVariants({
        base: { padding: 8 },
        variants: {
          size: {
            sm: { padding: 4 },
            md: { padding: 8 }
          }
        }
      });
      
      expect(config.base).toEqual({ padding: 8 });
      expect(config.variants.size.sm).toEqual({ padding: 4 });
    });
  });

  describe('commonVariants', () => {
    it('provides common variant options', () => {
      expect(commonVariants.size.md).toBe('md');
      expect(commonVariants.color.primary).toBe('primary');
      expect(commonVariants.variant.solid).toBe('solid');
    });
  });
});