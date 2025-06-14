
import { ExternalLink, Github, Star } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400/30">
            <img 
              src="/lovable-uploads/e184ba99-9529-4cf2-b18d-b271c65b4026.png" 
              alt="Laura Mattos" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Vibe coding{' '}
              <a 
                href="https://www.linkedin.com/in/lauramattosc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"
              >
                Laura Mattos <ExternalLink className="w-4 h-4 text-yellow-400" />
              </a>
              {' '}2025
            </span>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Transformando ideias em código ✨
        </p>
        
        {/* GitHub Section */}
        <div className="mb-4">
          <a 
            href="https://github.com/LauraMattz/your-life-in-data" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            Gostou? Dê uma <Star className="w-4 h-4" /> no GitHub!
          </a>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            🛡️ <strong>Privacidade Garantida:</strong> Nenhum dado pessoal é salvo ou armazenado. 
            Todas as informações ficam apenas no seu navegador.
          </p>
        </div>
      </div>
    </footer>
  );
};
