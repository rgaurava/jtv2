import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    companyName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-sail-dark py-6 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl w-full space-y-4">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src={theme === 'dark' ? '/logos/justransform-logo_w.svg' : '/logos/justransform-logo.svg'}
              alt="Justransform SAIL"
              className="h-12 w-auto"
            />
          </div>
          <h2 className="mt-3 text-center text-xl font-extrabold text-gray-900 dark:text-white">
            Create your SAIL account
          </h2>
          <p className="mt-1.5 text-center text-xs text-gray-600 dark:text-sail-text">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-sail-cyan hover:text-sail-purple"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-2">
              <p className="text-xs text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="First Name"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="John"
            />

            <Input
              label="Last Name"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Doe"
            />

            <Input
              label="Username"
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="johndoe"
            />

            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
            />

            <Input
              label="Phone Number"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="+1 234 567 8900"
            />

            <Input
              label="Company Name"
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              placeholder="Acme Corp"
            />

            <Input
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
            />

            <Input
              label="Confirm Password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full rounded-full text-sm py-2" isLoading={isLoading}>
            Create Account
          </Button>

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
        </form>
      </div>
    </div>
  );
}
