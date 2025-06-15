
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
            ⏳ Olá!
          </CardTitle>
          <div className="space-y-3 text-gray-300">
            <p className="text-lg leading-relaxed">
              Que tal descobrirmos juntos quanto do ano ainda está nas suas mãos?
            </p>
            <p className="text-base text-gray-400">
              Vou te mostrar exatamente quantos dias restam de 2024 e como você pode aproveitá-los ao máximo.
            </p>
            <div className="bg-blue-900/30 border border-blue-500/40 rounded-lg p-3">
              <p className="text-sm text-blue-200 flex items-center justify-center gap-2">
                🛡️ <strong>Privacidade total:</strong> Seus dados ficam apenas aqui, no seu navegador. 
                Nada é enviado para lugar nenhum!
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-200 font-medium mb-2 block">Como posso te chamar?</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu primeiro nome..."
                className="bg-gray-800/70 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Vamos descobrir! ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
