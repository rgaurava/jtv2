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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-sail-dark py-6 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-4">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src={theme === 'dark' ? '/logos/justransform-logo_w.svg' : '/logos/justransform-logo.svg'}
              alt="Justransform SAIL"
              className="h-12 w-auto"
            />
          </div>
          <h2 className="mt-3 text-center text-xl font-extrabold text-gray-900 dark:text-white">
            Sign in to SAIL
          </h2>
          <p className="mt-1.5 text-center text-xs text-gray-600 dark:text-sail-text">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-sail-cyan hover:text-sail-purple"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-2">
              <p className="text-xs text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-3">
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
            <div className="text-xs">
              <Link
                to="/forgot-password"
                className="font-medium text-sail-cyan hover:text-sail-purple"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full rounded-full text-sm py-2" isLoading={isLoading}>
            Sign in
          </Button>

          <div className="mt-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-sail-dark-lighter"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-gray-50 dark:bg-sail-dark text-gray-500 dark:text-sail-text">
                  Quick Links
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Link
                to="/privacy"
                className="text-[10px] text-gray-500 dark:text-sail-text hover:text-sail-cyan"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-[10px] text-gray-500 dark:text-sail-text hover:text-sail-cyan"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/security"
                className="text-[10px] text-gray-500 dark:text-sail-text hover:text-sail-cyan"
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
