import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeMode } from '@spectrum/web';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Button', href: '/button' },
  { name: 'Card', href: '/card' },
  { name: 'Input', href: '/input' },
  { name: 'Badge', href: '/badge' },
  { name: 'Avatar', href: '/avatar' },
  { name: 'Playground', href: '/playground' },
  { name: 'Theme Customizer', href: '/theme-customizer' },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              Spectrum UI
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mt-8 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium mb-1 transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              Spectrum UI
            </h1>
          </div>
          <nav className="mt-8 flex-1 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium mb-1 transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-neutral-700 lg:hidden dark:text-neutral-300"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                onClick={toggleMode}
                className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
              >
                {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}