import { parseClassName, type ClassMappingConfig } from '../utils/class-mapping';
import { createCn, createPlatformCn, mergeStyles, resolveClassConflicts } from '../utils/cn';
import { lightTheme } from '../theme/default-themes';

describe('Class Mapping System', () => {
  const mockConfig: ClassMappingConfig = {
    theme: lightTheme,
    platform: 'native'
  };

  describe('parseClassName', () => {
    it('parses padding utilities', () => {
      expect(parseClassName('p-4', mockConfig)).toEqual({ padding: 16 });
      expect(parseClassName('px-2', mockConfig)).toEqual({ paddingHorizontal: 8 });
      expect(parseClassName('py-3', mockConfig)).toEqual({ paddingVertical: 16 });
      expect(parseClassName('pt-1', mockConfig)).toEqual({ paddingTop: 4 });
      expect(parseClassName('pb-2', mockConfig)).toEqual({ paddingBottom: 8 });
      expect(parseClassName('pl-3', mockConfig)).toEqual({ paddingLeft: 16 });
      expect(parseClassName('pr-4', mockConfig)).toEqual({ paddingRight: 16 });
    });

    it('parses margin utilities', () => {
      expect(parseClassName('m-4', mockConfig)).toEqual({ margin: 16 });
      expect(parseClassName('mx-2', mockConfig)).toEqual({ marginHorizontal: 8 });
      expect(parseClassName('my-3', mockConfig)).toEqual({ marginVertical: 16 });
      expect(parseClassName('mt-1', mockConfig)).toEqual({ marginTop: 4 });
      expect(parseClassName('mb-2', mockConfig)).toEqual({ marginBottom: 8 });
      expect(parseClassName('ml-3', mockConfig)).toEqual({ marginLeft: 16 });
      expect(parseClassName('mr-4', mockConfig)).toEqual({ marginRight: 16 });
    });

    it('parses color utilities', () => {
      expect(parseClassName('bg-primary-500', mockConfig)).toEqual({
        backgroundColor: lightTheme.colors.primary[500]
      });
      expect(parseClassName('text-secondary-600', mockConfig)).toEqual({
        color: lightTheme.colors.secondary[600]
      });
    });

    it('parses layout utilities', () => {
      expect(parseClassName('flex', mockConfig)).toEqual({ display: 'flex' });
      expect(parseClassName('flex-row', mockConfig)).toEqual({ flexDirection: 'row' });
      expect(parseClassName('flex-col', mockConfig)).toEqual({ flexDirection: 'column' });
      expect(parseClassName('items-center', mockConfig)).toEqual({ alignItems: 'center' });
      expect(parseClassName('justify-between', mockConfig)).toEqual({ justifyContent: 'space-between' });
    });

    it('parses size utilities', () => {
      expect(parseClassName('w-full', mockConfig)).toEqual({ width: '100%' });
      expect(parseClassName('h-auto', mockConfig)).toEqual({ height: 'auto' });
      expect(parseClassName('w-4', mockConfig)).toEqual({ width: 16 });
      expect(parseClassName('h-8', mockConfig)).toEqual({ height: 32 });
    });

    it('parses border utilities', () => {
      expect(parseClassName('rounded', mockConfig)).toEqual({ borderRadius: lightTheme.borderRadius.md });
      expect(parseClassName('rounded-lg', mockConfig)).toEqual({ borderRadius: lightTheme.borderRadius.lg });
      expect(parseClassName('border', mockConfig)).toEqual({ borderWidth: 1 });
      expect(parseClassName('border-2', mockConfig)).toEqual({ borderWidth: 2 });
    });

    it('parses typography utilities', () => {
      expect(parseClassName('text-lg', mockConfig)).toEqual({ fontSize: lightTheme.typography.fontSize.lg });
      expect(parseClassName('font-bold', mockConfig)).toEqual({ fontWeight: lightTheme.typography.fontWeight.bold });
    });

    it('parses shadow utilities', () => {
      const result = parseClassName('shadow-md', mockConfig);
      expect(result).toHaveProperty('shadowColor');
      expect(result).toHaveProperty('shadowOffset');
      expect(result).toHaveProperty('shadowOpacity');
      expect(result).toHaveProperty('shadowRadius');
      expect(result).toHaveProperty('elevation');
    });

    it('parses position utilities', () => {
      expect(parseClassName('absolute', mockConfig)).toEqual({ position: 'absolute' });
      expect(parseClassName('relative', mockConfig)).toEqual({ position: 'relative' });
    });

    it('parses flex utilities', () => {
      expect(parseClassName('flex-1', mockConfig)).toEqual({ flex: 1 });
      expect(parseClassName('flex-none', mockConfig)).toEqual({ flex: 0 });
    });

    it('combines multiple classes', () => {
      const result = parseClassName('p-4 bg-primary-500 flex items-center', mockConfig);
      expect(result).toEqual({
        padding: 16,
        backgroundColor: lightTheme.colors.primary[500],
        display: 'flex',
        alignItems: 'center'
      });
    });

    it('handles empty or invalid classes', () => {
      expect(parseClassName('', mockConfig)).toEqual({});
      expect(parseClassName('invalid-class', mockConfig)).toEqual({});
      expect(parseClassName('p-4 invalid-class m-2', mockConfig)).toEqual({
        padding: 16,
        margin: 8
      });
    });
  });

  describe('createCn', () => {
    it('creates a cn function for native platform', () => {
      const cn = createCn(mockConfig);
      const result = cn('p-4', 'bg-primary-500');
      
      expect(result).toEqual({
        padding: 16,
        backgroundColor: lightTheme.colors.primary[500]
      });
    });

    it('creates a cn function for web platform', () => {
      const webConfig = { ...mockConfig, platform: 'web' as const };
      const cn = createCn(webConfig);
      const result = cn('p-4', 'bg-primary-500');
      
      expect(result).toBe('p-4 bg-primary-500');
    });

    it('filters out falsy values', () => {
      const cn = createCn(mockConfig);
      const result = cn('p-4', null, undefined, false, 'bg-primary-500');
      
      expect(result).toEqual({
        padding: 16,
        backgroundColor: lightTheme.colors.primary[500]
      });
    });
  });

  describe('mergeStyles', () => {
    it('merges multiple style objects', () => {
      const style1 = { padding: 8, margin: 4 };
      const style2 = { padding: 16, backgroundColor: 'red' };
      
      const result = mergeStyles(style1, style2);
      
      expect(result).toEqual({
        padding: 16, // Later style wins
        margin: 4,
        backgroundColor: 'red'
      });
    });

    it('handles arrays of styles', () => {
      const styles = [
        { padding: 8 },
        { margin: 4 },
        { padding: 16 }
      ];
      
      const result = mergeStyles(styles);
      
      expect(result).toEqual({
        padding: 16,
        margin: 4
      });
    });

    it('filters out falsy values', () => {
      const result = mergeStyles(
        { padding: 8 },
        null,
        undefined,
        false,
        { margin: 4 }
      );
      
      expect(result).toEqual({
        padding: 8,
        margin: 4
      });
    });
  });

  describe('resolveClassConflicts', () => {
    it('resolves padding conflicts', () => {
      const classes = ['p-2', 'px-4', 'pt-8'];
      const result = resolveClassConflicts(classes);
      
      // Should keep all since they're different conflict groups
      expect(result).toContain('pt-8');
      expect(result).toContain('p-2');
      expect(result).toContain('px-4');
    });

    it('resolves color conflicts', () => {
      const classes = ['bg-primary-500', 'bg-secondary-600', 'text-success-400'];
      const result = resolveClassConflicts(classes);
      
      expect(result).toContain('bg-secondary-600'); // Last background color wins
      expect(result).toContain('text-success-400'); // Text color is separate
      expect(result).not.toContain('bg-primary-500');
    });

    it('keeps non-conflicting classes', () => {
      const classes = ['p-4', 'bg-red-500', 'flex', 'items-center'];
      const result = resolveClassConflicts(classes);
      
      expect(result).toContain('p-4');
      expect(result).toContain('bg-red-500');
      expect(result).toContain('flex');
      expect(result).toContain('items-center');
    });
  });

  describe('createPlatformCn', () => {
    it('creates a platform-aware cn function for native', () => {
      const cn = createPlatformCn(lightTheme, 'native');
      const result = cn('p-4 bg-primary-500', { margin: 8 });
      
      expect(result).toEqual({
        padding: 16,
        backgroundColor: lightTheme.colors.primary[500],
        margin: 8
      });
    });

    it('creates a platform-aware cn function for web', () => {
      const cn = createPlatformCn(lightTheme, 'web');
      const result = cn('p-4 bg-primary-500', { margin: 8 });
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('p-4 bg-primary-500');
      expect(result).toContainEqual({ margin: 8 });
    });

    it('resolves class conflicts automatically', () => {
      const cn = createPlatformCn(lightTheme, 'native');
      const result = cn('p-2 p-4 bg-primary-500 bg-secondary-600');
      
      expect(result).toEqual({
        padding: 16, // p-4 wins over p-2
        backgroundColor: lightTheme.colors.secondary[600] // Last background color wins
      });
    });
  });
});