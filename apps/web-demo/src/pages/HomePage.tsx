import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '@spectrum/web';
import { ArrowRight, Palette, Code, Zap } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Spectrum UI Component Library
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
          A modern, cross-platform component library built with React and React Native.
          Consistent design, flexible theming, and excellent developer experience.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/button">
            <Button variant="solid" size="lg">
              Explore Components
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
          <Link to="/playground">
            <Button variant="outline" size="lg">
              Try Playground
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card variant="outlined" className="p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Palette className="text-primary-600 dark:text-primary-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Flexible Theming
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Comprehensive theme system with light/dark modes and easy customization
          </p>
        </Card>

        <Card variant="outlined" className="p-6 text-center">
          <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Code className="text-success-600 dark:text-success-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Cross-Platform
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Works seamlessly with both React web and React Native applications
          </p>
        </Card>

        <Card variant="outlined" className="p-6 text-center">
          <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="text-warning-600 dark:text-warning-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Developer Experience
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            TypeScript support, variant system, and excellent documentation
          </p>
        </Card>
      </div>

      {/* Component Preview */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
          Component Preview
        </h2>
        <Card variant="elevated" className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Buttons
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="solid" size="sm">Small</Button>
                <Button variant="outline" size="md">Medium</Button>
                <Button variant="ghost" size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="solid" color="primary">Primary</Badge>
                <Badge variant="outline" color="success">Success</Badge>
                <Badge variant="subtle" color="warning">Warning</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/theme-customizer" className="block">
          <Card variant="outlined" className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Theme Customizer
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Customize colors, spacing, and other design tokens in real-time
            </p>
          </Card>
        </Link>

        <Link to="/playground" className="block">
          <Card variant="outlined" className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Interactive Playground
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Experiment with components and see live code examples
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}