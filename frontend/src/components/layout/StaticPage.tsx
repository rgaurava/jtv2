import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

interface StaticPageProps {
  title: string;
  children: ReactNode;
}

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            B2B Platform
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </main>
    </div>
  );
}
