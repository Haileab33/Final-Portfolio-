import { ExternalLink, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onToggleMobileMenu?: () => void;
}

export const Header = ({ title, onToggleMobileMenu }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>
          )}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{title}</h2>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          <ExternalLink size={18} />
          <span className="hidden sm:inline">View Live Site</span>
          <span className="sm:hidden">Site</span>
        </a>
      </div>
    </header>
  );
};
