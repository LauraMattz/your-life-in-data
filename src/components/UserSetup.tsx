
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
  'Brazil': 75,
  'United States': 78,
  'Japan': 84,
  'Germany': 81,
  'France': 82,
  'Canada': 82,
  'Australia': 83,
  'United Kingdom': 81,
  'Spain': 83,
  'Italy': 83
};

export const UserSetup = ({ onProfileComplete }: UserSetupProps) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthDate && country) {
      const profile: UserProfile = {
        name,
        birthDate,
        country,
        lifeExpectancy: countries[country as keyof typeof countries] || 78
      };
      onProfileComplete(profile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            ⏳ Bem-vindo
          </CardTitle>
          <p className="text-gray-300">
            Vamos calcular sua existência. Precisamos de alguns dados básicos.
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
              <Label className="text-white">País</Label>
              <Select value={country} onValueChange={setCountry} required>
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
                      {countryName} (expectativa: {expectancy} anos)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
            >
              Calcular Minha Vida ⏳
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
