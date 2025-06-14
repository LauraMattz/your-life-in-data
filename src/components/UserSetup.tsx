
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ⏳ Bem-vindo
          </CardTitle>
          <p className="text-gray-300">
            Vamos calcular sua jornada de vida. Precisamos de alguns dados básicos para começar.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Seu Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você se chama?"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-white">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-white">País/Região</Label>
              <Select value={country} onValueChange={handleCountryChange} required>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione seu país" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {Object.entries(countries).map(([countryName, expectancy]) => (
                    <SelectItem 
                      key={countryName} 
                      value={countryName}
                      className="text-white hover:bg-gray-600"
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
                  <Label className="text-gray-300 text-sm">Expectativa de vida personalizada</Label>
                  <Input
                    type="number"
                    min="50"
                    max="120"
                    value={customExpectancy}
                    onChange={(e) => setCustomExpectancy(Number(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-2">
                💡 As expectativas são estimativas baseadas em dados gerais. Sua jornada é única!
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
            >
              Começar Minha Jornada ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
