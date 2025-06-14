
import { ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-8 px-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🚀</span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Vibe coding Laura Mattos 2025
          </span>
        </div>
        <p className="text-purple-200 mb-4">
          Transformando ideias em código ✨
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a 
            href="https://www.linkedin.com/in/lauramattosc/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            LinkedIn <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            🔒 <strong>Privacidade Garantida:</strong> Nenhum dado pessoal é salvo ou armazenado. 
            Todas as informações ficam apenas no seu navegador.
          </p>
        </div>
      </div>
    </footer>
  );
};
