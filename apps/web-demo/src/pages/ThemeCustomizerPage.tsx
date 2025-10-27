import { useState } from 'react';
import { useThemeMode, Button, Card, Input, Badge, Avatar } from '@spectrum/web';
import { Palette, RotateCcw, Download } from 'lucide-react';



export function ThemeCustomizerPage() {
  // const { theme } = useTheme(); // Not used in this demo
  const { mode, toggleMode } = useThemeMode();
  const [customColors, setCustomColors] = useState({
    primary: '#0ea5e9',
    secondary: '#64748b',
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
  });

  const handleColorChange = (colorKey: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const resetToDefaults = () => {
    setCustomColors({
      primary: '#0ea5e9',
      secondary: '#64748b',
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b',
    });
  };

  const exportTheme = () => {
    const themeConfig = {
      colors: customColors,
      mode,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(themeConfig, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spectrum-theme-${mode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Theme Customizer
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Customize the theme colors and see changes in real-time across all components.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card variant="outlined" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Theme Controls
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetToDefaults}>
                  <RotateCcw size={16} />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={exportTheme}>
                  <Download size={16} />
                  Export
                </Button>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Theme Mode
              </label>
              <div className="flex gap-2">
                <Button
                  variant={mode === 'light' ? 'solid' : 'outline'}
                  size="sm"
                  onClick={() => mode === 'dark' && toggleMode()}
                >
                  Light
                </Button>
                <Button
                  variant={mode === 'dark' ? 'solid' : 'outline'}
                  size="sm"
                  onClick={() => mode === 'light' && toggleMode()}
                >
                  Dark
                </Button>
              </div>
            </div>

            {/* Color Customization */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                Color Palette
              </h3>
              
              {Object.entries(customColors).map(([colorKey, colorValue]) => (
                <div key={colorKey} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 capitalize">
                      {colorKey}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colorValue}
                        onChange={(e) => handleColorChange(colorKey, e.target.value)}
                        className="w-12 h-10 rounded border border-neutral-300 dark:border-neutral-600 cursor-pointer"
                      />
                      <Input
                        value={colorValue}
                        onChange={(e) => handleColorChange(colorKey, e.target.value)}
                        className="flex-1"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Theme Information */}
          <Card variant="outlined" className="p-6">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
              Current Theme
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Mode:</span>
                <Badge variant="subtle" color="primary">{mode}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Primary:</span>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                  {customColors.primary}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Secondary:</span>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                  {customColors.secondary}
                </code>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card variant="outlined" className="p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
              Live Preview
            </h2>

            {/* Button Preview */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Buttons
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="solid" color="primary" size="sm">Primary</Button>
                <Button variant="outline" color="secondary" size="sm">Secondary</Button>
                <Button variant="ghost" color="success" size="sm">Success</Button>
                <Button variant="solid" color="error" size="sm">Error</Button>
                <Button variant="outline" color="warning" size="sm">Warning</Button>
              </div>
            </div>

            {/* Badge Preview */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid" color="primary">Primary</Badge>
                <Badge variant="outline" color="secondary">Secondary</Badge>
                <Badge variant="subtle" color="success">Success</Badge>
                <Badge variant="solid" color="error">Error</Badge>
                <Badge variant="outline" color="warning">Warning</Badge>
              </div>
            </div>

            {/* Input Preview */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Inputs
              </h3>
              <div className="space-y-3">
                <Input placeholder="Default input" />
                <Input placeholder="Filled input" variant="filled" />
                <Input placeholder="Success state" state="valid" />
                <Input placeholder="Error state" state="invalid" />
              </div>
            </div>

            {/* Avatar Preview */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Avatars
              </h3>
              <div className="flex gap-3">
                <Avatar fallback="AB" size="sm" />
                <Avatar fallback="CD" size="md" />
                <Avatar fallback="EF" size="lg" />
              </div>
            </div>

            {/* Card Preview */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Cards
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Card variant="elevated" className="p-3">
                  <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                    Elevated
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    Card content
                  </p>
                </Card>
                <Card variant="outlined" className="p-3">
                  <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                    Outlined
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    Card content
                  </p>
                </Card>
              </div>
            </div>
          </Card>

          {/* Usage Instructions */}
          <Card variant="filled" className="p-6">
            <div className="flex items-start gap-3">
              <Palette className="text-primary-600 dark:text-primary-400 mt-1" size={20} />
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-white mb-2">
                  How to Use
                </h3>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• Adjust colors using the color pickers or hex inputs</li>
                  <li>• Toggle between light and dark modes</li>
                  <li>• See changes reflected immediately in the preview</li>
                  <li>• Export your custom theme configuration</li>
                  <li>• Reset to default values anytime</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}