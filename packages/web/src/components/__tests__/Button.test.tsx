import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('renders correctly', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    renderWithTheme(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-2', 'bg-transparent');
  });

  it('applies size classes correctly', () => {
    renderWithTheme(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-11', 'px-8');
  });

  it('applies color classes correctly', () => {
    renderWithTheme(<Button color="success">Success Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-success-500');
  });

  it('shows loading state', () => {
    renderWithTheme(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders with left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    renderWithTheme(
      <Button leftIcon={<LeftIcon />}>With Left Icon</Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    renderWithTheme(
      <Button rightIcon={<RightIcon />}>With Right Icon</Button>
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth correctly', () => {
    renderWithTheme(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});