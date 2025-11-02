import { LogOut, Plus, LayoutDashboard, Settings, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import type { User } from '../../types';

interface SidebarProps {
  user: User | null;
  onCreateTransaction: () => void;
}

export function Sidebar({ user, onCreateTransaction }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-52 bg-white dark:bg-sail-charcoal border-r border-gray-200 dark:border-sail-dark-lighter flex flex-col">
      {/* Logo */}
      <div className="p-3 border-b border-gray-200 dark:border-sail-dark-lighter">
        <img
          src={theme === 'dark' ? '/logos/justransform-logo_w.svg' : '/logos/justransform-logo.svg'}
          alt="Justransform SAIL"
          className="h-8 w-auto"
        />
      </div>

      {/* User Info */}
      <div className="p-2 border-b border-gray-200 dark:border-sail-dark-lighter">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sail-cyan to-sail-purple flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-sail-text truncate">
              {user?.email}
            </p>
          </div>
        </div>
        {user?.companyName && (
          <p className="mt-1 text-[10px] text-gray-600 dark:text-sail-text truncate">
            {user.companyName}
          </p>
        )}
      </div>

      {/* Create Transaction Button */}
      <div className="p-2">
        <button
          onClick={onCreateTransaction}
          className="w-full flex items-center justify-center space-x-1.5 bg-gradient-to-r from-sail-cyan to-sail-purple hover:from-sail-purple hover:to-sail-cyan text-white px-2 py-1.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="font-medium">New</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg bg-sail-cyan/10 dark:bg-sail-cyan/20 text-sail-cyan border border-sail-cyan/30 text-xs">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="font-medium">Dashboard</span>
        </button>

        <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-gray-700 dark:text-sail-text hover:bg-gray-100 dark:hover:bg-sail-dark-lighter transition-colors text-xs">
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-gray-200 dark:border-sail-dark-lighter space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-600 dark:text-sail-text">Theme</span>
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-1.5 px-2 py-1.5 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-red-200 dark:border-red-800/30 text-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
