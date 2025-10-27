import { useState } from 'react';
import { Button, Card, Input, Badge, Avatar } from '@spectrum/web';
import { Copy, RotateCcw, Eye, Code } from 'lucide-react';

const COMPONENT_EXAMPLES = {
  Button: {
    code: `<Button variant="solid" color="primary" size="md">
  Click me
</Button>`,
    component: <Button variant="solid" color="primary" size="md">Click me</Button>
  },
  Card: {
    code: `<Card variant="elevated" className="p-4">
  <h3 className="font-semibold mb-2">Card Title</h3>
  <p className="text-neutral-600 dark:text-neutral-400">
    This is a sample card with some content.
  </p>
</Card>`,
    component: (
      <Card variant="elevated" className="p-4">
        <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">Card Title</h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          This is a sample card with some content.
        </p>
      </Card>
    )
  },
  Input: {
    code: `<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
/>`,
    component: (
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
    )
  },
  Badge: {
    code: `<Badge variant="solid" color="primary">
  New Feature
</Badge>`,
    component: <Badge variant="solid" color="primary">New Feature</Badge>
  },
  Avatar: {
    code: `<Avatar
  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  alt="User"
  fallback="U"
/>`,
    component: (
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="User"
        fallback="U"
      />
    )
  }
};

const PLAYGROUND_TEMPLATES = {
  'Login Form': `<Card variant="outlined" className="p-6 max-w-md mx-auto">
  <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
  <div className="space-y-4">
    <Input
      label="Email"
      type="email"
      placeholder="Enter your email"
      required
    />
    <Input
      label="Password"
      type="password"
      placeholder="Enter your password"
      required
    />
    <Button fullWidth variant="solid" color="primary">
      Sign In
    </Button>
    <Button fullWidth variant="ghost">
      Create Account
    </Button>
  </div>
</Card>`,
  'User Profile': `<Card variant="elevated" className="p-6 max-w-md mx-auto">
  <div className="flex items-center gap-4 mb-4">
    <Avatar
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      alt="John Doe"
      fallback="JD"
      size="lg"
    />
    <div>
      <h3 className="font-semibold text-lg">John Doe</h3>
      <p className="text-neutral-600 dark:text-neutral-400">Software Engineer</p>
      <Badge variant="subtle" color="success" className="mt-1">
        Online
      </Badge>
    </div>
  </div>
  <div className="flex gap-2">
    <Button variant="solid" color="primary" size="sm">
      Message
    </Button>
    <Button variant="outline" size="sm">
      Follow
    </Button>
  </div>
</Card>`,
  'Notification': `<Card variant="outlined" className="p-4 max-w-md mx-auto border-l-4 border-l-primary-500">
  <div className="flex items-start gap-3">
    <Avatar fallback="!" size="sm" className="bg-primary-100 text-primary-600" />
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium">New Update Available</h4>
        <Badge variant="subtle" color="primary" size="sm">New</Badge>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
        Version 2.0 is now available with new features and improvements.
      </p>
      <div className="flex gap-2">
        <Button variant="solid" color="primary" size="sm">
          Update Now
        </Button>
        <Button variant="ghost" size="sm">
          Later
        </Button>
      </div>
    </div>
  </div>
</Card>`
};

export function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Login Form');
  const [code, setCode] = useState(PLAYGROUND_TEMPLATES['Login Form']);
  const [copied, setCopied] = useState(false);

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setCode(PLAYGROUND_TEMPLATES[template as keyof typeof PLAYGROUND_TEMPLATES]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(PLAYGROUND_TEMPLATES[selectedTemplate as keyof typeof PLAYGROUND_TEMPLATES]);
  };

  // Simple code evaluation for demo purposes
  const renderPreview = () => {
    try {
      // This is a simplified preview - in a real app you'd use a proper code sandbox
      return (
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="text-center text-neutral-500 dark:text-neutral-400">
            <Code size={48} className="mx-auto mb-4 opacity-50" />
            <p>Live preview would render here</p>
            <p className="text-sm mt-2">
              In a production app, this would use a code sandbox like CodeMirror or Monaco Editor
            </p>
          </div>
        </div>
      );
    } catch {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">Error rendering preview</p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Interactive Playground
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Experiment with components and see live code examples. Try different templates or write your own code.
        </p>
      </div>

      {/* Quick Examples */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Quick Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(COMPONENT_EXAMPLES).map(([name, example]) => (
            <Card key={name} variant="outlined" className="p-4">
              <h3 className="font-medium text-neutral-900 dark:text-white mb-3">
                {name}
              </h3>
              <div className="mb-3 flex justify-center">
                {example.component}
              </div>
              <details className="text-sm">
                <summary className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                  View Code
                </summary>
                <pre className="mt-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded text-xs overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </details>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Playground */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <Card variant="outlined" className="p-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
              Templates
            </h3>
            <div className="space-y-2">
              {Object.keys(PLAYGROUND_TEMPLATES).map((template) => (
                <button
                  key={template}
                  onClick={() => handleTemplateChange(template)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedTemplate === template
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {template}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Editor and Preview */}
        <div className="lg:col-span-2">
          <Card variant="outlined" className="overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 px-4 py-2">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <Eye size={16} className="inline mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'code'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <Code size={16} className="inline mr-2" />
                  Code
                </button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={resetCode}>
                  <RotateCcw size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? 'Copied!' : <Copy size={16} />}
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {activeTab === 'preview' ? (
                <div className="p-6">
                  {renderPreview()}
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-[400px] p-4 font-mono text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-none outline-none resize-none"
                    placeholder="Write your component code here..."
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <Card variant="filled" className="mt-4 p-4">
            <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
              How to Use the Playground
            </h4>
            <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Select a template from the sidebar to get started</li>
              <li>• Switch between Preview and Code tabs to see results</li>
              <li>• Edit the code in the Code tab (full sandbox coming soon)</li>
              <li>• Copy code snippets to use in your projects</li>
              <li>• Reset to template defaults anytime</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}