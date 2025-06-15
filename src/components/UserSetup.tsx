
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface UserSetupProps {
  onProfileComplete: (profile: UserProfile) => void;
}

export const UserSetup = ({ onProfileComplete }: UserSetupProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      const profile: UserProfile = {
        name,
        birthDate: '1990-01-01', // default value
        country: 'Brasil',
        lifeExpectancy: 76
      };
      onProfileComplete(profile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-green-500/10 rounded-full blur-xl"></div>
      </div>

      <Card className="w-full max-w-lg bg-gray-900/95 border-gray-700/50 backdrop-blur-sm shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="text-center pb-6 relative">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full"></div>
          
          <CardTitle className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Olá!
            </span>
          </CardTitle>
          <span className="text-4xl block mb-4">👋</span>
          
          <div className="space-y-4 text-gray-300">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              Que tal descobrirmos juntos quanto do ano ainda está nas suas mãos?
            </p>
            
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/40 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm text-blue-200 flex items-center justify-center gap-2 leading-relaxed">
                <span className="text-lg">🛡️</span>
                <span>
                  <strong className="text-blue-100">Privacidade total:</strong> Seus dados ficam apenas aqui, no seu navegador. 
                  Nada é enviado para lugar nenhum!
                </span>
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-gray-200 font-medium text-lg flex items-center gap-2">
                <span className="text-xl">✨</span>
                Como posso te chamar?
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu primeiro nome..."
                className="bg-gray-800/70 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 py-3 px-4 text-lg rounded-xl transition-all duration-300 focus:bg-gray-800/90"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 hover:from-blue-700 hover:via-purple-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 text-lg flex items-center justify-center gap-2"
            >
              <span>Vamos descobrir!</span>
              <span className="text-xl">✨</span>
            </Button>
          </form>
          
          {/* Bottom decoration */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full"></div>
        </CardContent>
      </Card>
    </div>
  );
};
