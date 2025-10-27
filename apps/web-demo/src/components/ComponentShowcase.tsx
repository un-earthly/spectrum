import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code?: string;
}

export function ComponentShowcase({ title, description, children, code }: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
      
      <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
        {/* Preview */}
        <div className="p-6 bg-white dark:bg-neutral-800">
          <div className="flex flex-wrap gap-4 items-center">
            {children}
          </div>
        </div>
        
        {/* Code */}
        {code && (
          <div className="border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Code
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800">
              <pre className="text-sm overflow-x-auto">
                <code className="text-neutral-800 dark:text-neutral-200">
                  {code}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}