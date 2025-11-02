import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-sail-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-8">
            <img
              src={theme === 'dark' ? '/logos/justransform-logo_w.svg' : '/logos/justransform-logo.svg'}
              alt="Justransform SAIL"
              className="h-20 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to SAIL
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-sail-text">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-sail-cyan hover:text-sail-purple"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Username"
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter your username"
            />

            <Input
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-sail-cyan hover:text-sail-purple"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full rounded-full" isLoading={isLoading}>
            Sign in
          </Button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-sail-dark-lighter"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-sail-dark text-gray-500 dark:text-sail-text">
                  Quick Links
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Link
                to="/privacy"
                className="text-xs text-gray-500 dark:text-sail-text hover:text-sail-cyan"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-gray-500 dark:text-sail-text hover:text-sail-cyan"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/security"
                className="text-xs text-gray-500 dark:text-sail-text hover:text-sail-cyan"
              >
                Security
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
