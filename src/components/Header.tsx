
import { ExternalLink } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white py-4 px-6">
      <div className="container mx-auto flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/30">
          <img 
            src="/lovable-uploads/e184ba99-9529-4cf2-b18d-b271c65b4026.png" 
            alt="Laura Mattos" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">💜</span>
            <span className="text-lg font-semibold">
              Desenvolvido com muito café por{' '}
              <a 
                href="https://www.linkedin.com/in/lauramattosc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1"
              >
                Laura Mattos <ExternalLink className="w-4 h-4" />
              </a>
            </span>
          </div>
          <p className="text-purple-100 flex items-center gap-2">
            Transformando ideias em código ✨
          </p>
        </div>
      </div>
    </header>
  );
};
