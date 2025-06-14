
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onResetProfile?: () => void;
}

export const Navigation = ({ onResetProfile }: NavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/comparacao', label: 'Comparação Global', icon: Globe },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⏳</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Relógio da Vida
            </h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-yellow-600 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {onResetProfile && (
              <Button
                onClick={onResetProfile}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800 ml-2"
                title="Redefinir perfil"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Redefinir</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
