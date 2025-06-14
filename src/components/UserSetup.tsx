
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gray-900/95 border-gray-700/50 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            ⏳ Bem-vindo
          </CardTitle>
          <div className="space-y-3 text-gray-300">
            <p className="text-lg leading-relaxed">
              Vamos descobrir juntos como aproveitar melhor cada momento da sua vida.
            </p>
            <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-lg p-3">
              <p className="text-sm text-yellow-200 flex items-center justify-center gap-2">
                🛡️ <strong>100% Privado:</strong> Nenhum dado é salvo ou enviado para servidores. 
                Tudo fica apenas no seu navegador!
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-200 font-medium mb-2 block">Seu Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você se chama?"
                className="bg-gray-800/70 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
            >
              Começar Minha Jornada ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
