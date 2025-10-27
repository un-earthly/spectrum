import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../theme/context';
import { useTheme, useThemeMode } from '../hooks';
import { lightTheme, darkTheme } from '../theme/default-themes';
import { getColor, getSpacing, getBorderRadius } from '../theme/utils';

// Test component to access theme
function TestComponent() {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  
  return (
    <div>
      <div data-testid="mode">{mode}</div>
      <div data-testid="primary-color">{theme.colors.primary[500]}</div>
      <button onClick={toggleMode} data-testid="toggle">Toggle</button>
    </div>
  );
}

describe('Theme System', () => {
  describe('ThemeProvider', () => {
    it('provides light theme by default', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
      expect(screen.getByTestId('primary-color')).toHaveTextContent(lightTheme.colors.primary[500]);
    });

    it('supports initial dark mode', () => {
      render(
        <ThemeProvider initialMode="dark">
          <TestComponent />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('mode')).toHaveTextContent('dark');
      expect(screen.getByTestId('primary-color')).toHaveTextContent(darkTheme.colors.primary[500]);
    });

    it('supports custom theme overrides', () => {
      const customTheme = {
        light: {
          colors: {
            primary: {
              ...lightTheme.colors.primary,
              500: '#FF0000'
            }
          }
        }
      };

      render(
        <ThemeProvider customTheme={customTheme}>
          <TestComponent />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('primary-color')).toHaveTextContent('#FF0000');
    });
  });

  describe('Theme Utils', () => {
    it('gets color values correctly', () => {
      const color = getColor(lightTheme, 'primary-500');
      expect(color).toBe(lightTheme.colors.primary[500]);
    });

    it('handles invalid color paths', () => {
      const color = getColor(lightTheme, 'invalid-path', '#fallback');
      expect(color).toBe('#fallback');
    });

    it('gets spacing values correctly', () => {
      const spacing = getSpacing(lightTheme, 'md');
      expect(spacing).toBe(lightTheme.spacing.md);
    });

    it('gets border radius values correctly', () => {
      const radius = getBorderRadius(lightTheme, 'lg');
      expect(radius).toBe(lightTheme.borderRadius.lg);
    });
  });

  describe('Default Themes', () => {
    it('has complete color palettes', () => {
      const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      const colorNames = ['primary', 'secondary', 'success', 'error', 'warning', 'neutral'];
      
      colorNames.forEach(colorName => {
        shades.forEach(shade => {
          expect(lightTheme.colors[colorName as keyof typeof lightTheme.colors][shade as keyof typeof lightTheme.colors.primary]).toBeDefined();
          expect(darkTheme.colors[colorName as keyof typeof darkTheme.colors][shade as keyof typeof darkTheme.colors.primary]).toBeDefined();
        });
      });
    });

    it('has all required spacing values', () => {
      const spacingSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
      spacingSizes.forEach(size => {
        expect(lightTheme.spacing[size as keyof typeof lightTheme.spacing]).toBeDefined();
        expect(darkTheme.spacing[size as keyof typeof darkTheme.spacing]).toBeDefined();
      });
    });
  });
});