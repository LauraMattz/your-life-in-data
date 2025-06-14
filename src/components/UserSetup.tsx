
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface UserSetupProps {
  onProfileComplete: (profile: UserProfile) => void;
}

const countries = {
  'Brasil': 76,
  'Estados Unidos': 78,
  'Japão': 84,
  'Alemanha': 81,
  'França': 82,
  'Canadá': 82,
  'Austrália': 83,
  'Reino Unido': 81,
  'Espanha': 83,
  'Itália': 83,
  'Argentina': 77,
  'Chile': 80,
  'Uruguai': 78,
  'Portugal': 82,
  'Coreia do Sul': 83,
  'Suécia': 83,
  'Noruega': 82,
  'Dinamarca': 81,
  'Suíça': 84,
  'Holanda': 82,
  'Personalizada': 80
};

export const UserSetup = ({ onProfileComplete }: UserSetupProps) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [customExpectancy, setCustomExpectancy] = useState(80);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setShowCustomInput(value === 'Personalizada');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthDate && country) {
      const expectancy = country === 'Personalizada' 
        ? customExpectancy 
        : countries[country as keyof typeof countries] || 78;
      
      const profile: UserProfile = {
        name,
        birthDate,
        country,
        lifeExpectancy: expectancy
      };
      onProfileComplete(profile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gray-800/90 border-gray-700/50 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            ⏳ Bem-vindo
          </CardTitle>
          <div className="space-y-3 text-gray-300">
            <p className="text-lg leading-relaxed">
              Vamos calcular sua jornada de vida de forma brutalmente honesta.
            </p>
            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 text-sm">
              <p className="font-semibold text-purple-200 mb-2">🔐 Por que coletamos estes dados?</p>
              <ul className="text-left space-y-1 text-purple-100">
                <li>• <strong>Nome:</strong> Para personalizar sua experiência</li>
                <li>• <strong>Data de nascimento:</strong> Para calcular sua idade atual</li>
                <li>• <strong>País:</strong> Para estimar expectativa de vida baseada em dados estatísticos</li>
              </ul>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-sm text-green-200 flex items-center justify-center gap-2">
                🛡️ <strong>100% Privado:</strong> Nenhum dado é salvo ou enviado para servidores. 
                Tudo fica apenas no seu navegador!
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-purple-200 font-medium mb-2 block">Seu Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você se chama?"
                className="bg-gray-700/70 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                required
              />
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-purple-200 font-medium mb-2 block">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-gray-700/70 border-gray-600/50 text-white focus:border-purple-400 focus:ring-purple-400/20"
                required
              />
            </div>

            <div>
              <Label className="text-purple-200 font-medium mb-2 block">País/Região</Label>
              <Select value={country} onValueChange={handleCountryChange} required>
                <SelectTrigger className="bg-gray-700/70 border-gray-600/50 text-white focus:border-purple-400 focus:ring-purple-400/20">
                  <SelectValue placeholder="Selecione seu país" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {Object.entries(countries).map(([countryName, expectancy]) => (
                    <SelectItem 
                      key={countryName} 
                      value={countryName}
                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {countryName === 'Personalizada' 
                        ? 'Personalizada (você define)'
                        : `${countryName} (~${expectancy} anos)`
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {showCustomInput && (
                <div className="mt-3">
                  <Label className="text-purple-300 text-sm block mb-2">Expectativa de vida personalizada</Label>
                  <Input
                    type="number"
                    min="50"
                    max="120"
                    value={customExpectancy}
                    onChange={(e) => setCustomExpectancy(Number(e.target.value))}
                    className="bg-gray-700/70 border-gray-600/50 text-white focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                💡 As expectativas são estimativas baseadas em dados gerais. Sua jornada é única!
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Começar Minha Jornada ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
