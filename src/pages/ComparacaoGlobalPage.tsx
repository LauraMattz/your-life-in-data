
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/Navigation';
import { Globe, TrendingUp, Heart, Clock } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const countriesData = {
  'Brasil': { 
    expectancy: 76, 
    workHours: 44,
    exercise: 2.1,
    socialMedia: 3.2,
    happiness: 6.4,
    flag: '🇧🇷'
  },
  'Japão': { 
    expectancy: 84, 
    workHours: 42,
    exercise: 2.8,
    socialMedia: 2.1,
    happiness: 5.9,
    flag: '🇯🇵'
  },
  'Estados Unidos': { 
    expectancy: 78, 
    workHours: 40,
    exercise: 3.1,
    socialMedia: 4.1,
    happiness: 6.9,
    flag: '🇺🇸'
  },
  'Alemanha': { 
    expectancy: 81, 
    workHours: 35,
    exercise: 3.8,
    socialMedia: 2.3,
    happiness: 7.0,
    flag: '🇩🇪'
  },
  'França': { 
    expectancy: 82, 
    workHours: 35,
    exercise: 3.5,
    socialMedia: 2.8,
    happiness: 6.7,
    flag: '🇫🇷'
  },
  'Coreia do Sul': { 
    expectancy: 83, 
    workHours: 52,
    exercise: 2.2,
    socialMedia: 3.8,
    happiness: 5.8,
    flag: '🇰🇷'
  },
  'Suécia': { 
    expectancy: 83, 
    workHours: 30,
    exercise: 4.2,
    socialMedia: 2.5,
    happiness: 7.3,
    flag: '🇸🇪'
  },
  'Singapura': { 
    expectancy: 85, 
    workHours: 45,
    exercise: 2.7,
    socialMedia: 3.1,
    happiness: 6.3,
    flag: '🇸🇬'
  },
  'Canadá': {
    expectancy: 82,
    workHours: 36,
    exercise: 3.9,
    socialMedia: 2.9,
    happiness: 7.2,
    flag: '🇨🇦'
  },
  'Reino Unido': {
    expectancy: 81,
    workHours: 37,
    exercise: 3.4,
    socialMedia: 3.5,
    happiness: 6.8,
    flag: '🇬🇧'
  },
  'Austrália': {
    expectancy: 83,
    workHours: 38,
    exercise: 4.1,
    socialMedia: 3.0,
    happiness: 7.1,
    flag: '🇦🇺'
  },
  'Itália': {
    expectancy: 83,
    workHours: 39,
    exercise: 2.9,
    socialMedia: 2.6,
    happiness: 6.0,
    flag: '🇮🇹'
  },
  'Espanha': {
    expectancy: 83,
    workHours: 37,
    exercise: 3.2,
    socialMedia: 2.7,
    happiness: 6.5,
    flag: '🇪🇸'
  },
  'Noruega': {
    expectancy: 82,
    workHours: 27,
    exercise: 4.5,
    socialMedia: 2.2,
    happiness: 7.4,
    flag: '🇳🇴'
  },
  'Dinamarca': {
    expectancy: 81,
    workHours: 32,
    exercise: 4.3,
    socialMedia: 2.4,
    happiness: 7.6,
    flag: '🇩🇰'
  },
  'Holanda': {
    expectancy: 82,
    workHours: 29,
    exercise: 4.0,
    socialMedia: 2.5,
    happiness: 7.4,
    flag: '🇳🇱'
  },
  'China': {
    expectancy: 77,
    workHours: 46,
    exercise: 2.3,
    socialMedia: 4.2,
    happiness: 5.1,
    flag: '🇨🇳'
  },
  'Índia': {
    expectancy: 70,
    workHours: 48,
    exercise: 1.8,
    socialMedia: 2.8,
    happiness: 3.8,
    flag: '🇮🇳'
  },
  'México': {
    expectancy: 75,
    workHours: 43,
    exercise: 2.4,
    socialMedia: 3.6,
    happiness: 6.3,
    flag: '🇲🇽'
  },
  'Argentina': {
    expectancy: 77,
    workHours: 42,
    exercise: 2.6,
    socialMedia: 3.4,
    happiness: 5.9,
    flag: '🇦🇷'
  }
};

const chartConfig = {
  expectancy: {
    label: "Expectativa de Vida",
    color: "hsl(var(--chart-1))",
  },
  workHours: {
    label: "Horas de Trabalho",
    color: "hsl(var(--chart-2))",
  },
  exercise: {
    label: "Exercício",
    color: "hsl(var(--chart-3))",
  },
  happiness: {
    label: "Felicidade",
    color: "hsl(var(--chart-4))",
  },
};

const ComparacaoGlobalPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('Brasil');
  const [compareCountry, setCompareCountry] = useState('Japão');

  const country1 = countriesData[selectedCountry as keyof typeof countriesData];
  const country2 = countriesData[compareCountry as keyof typeof countriesData];

  // Preparar dados para gráficos
  const chartData = Object.entries(countriesData).map(([name, data]) => ({
    country: name,
    flag: data.flag,
    expectancy: data.expectancy,
    workHours: data.workHours,
    exercise: data.exercise,
    happiness: data.happiness * 10, // Multiplicar por 10 para melhor visualização
  }));

  const topCountriesExpectancy = chartData
    .sort((a, b) => b.expectancy - a.expectancy)
    .slice(0, 10);

  const topCountriesHappiness = chartData
    .sort((a, b) => b.happiness - a.happiness)
    .slice(0, 10);

  const radarData = [
    {
      metric: 'Expectativa',
      [selectedCountry]: country1.expectancy,
      [compareCountry]: country2.expectancy,
    },
    {
      metric: 'Felicidade',
      [selectedCountry]: country1.happiness * 10,
      [compareCountry]: country2.happiness * 10,
    },
    {
      metric: 'Exercício',
      [selectedCountry]: country1.exercise * 10,
      [compareCountry]: country2.exercise * 10,
    },
    {
      metric: 'Trabalho',
      [selectedCountry]: 100 - country1.workHours, // Inverter para que menos horas seja melhor
      [compareCountry]: 100 - country2.workHours,
    },
  ];

  const ComparisonCard = ({ 
    title, 
    icon: Icon, 
    value1, 
    value2, 
    unit, 
    higher1 
  }: {
    title: string;
    icon: any;
    value1: number;
    value2: number;
    unit: string;
    higher1: boolean;
  }) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">{country1.flag} {selectedCountry}</span>
            <span className={`font-bold ${higher1 ? 'text-green-400' : 'text-orange-400'}`}>
              {value1}{unit}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">{country2.flag} {compareCountry}</span>
            <span className={`font-bold ${!higher1 ? 'text-green-400' : 'text-orange-400'}`}>
              {value2}{unit}
            </span>
          </div>
          
          <div className="text-xs text-gray-400">
            Diferença: {Math.abs(value1 - value2).toFixed(1)}{unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Comparação Global
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Compare expectativa de vida e estilos de vida entre diferentes países
          </p>
        </div>

        {/* Country Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <div>
            <label className="block text-gray-300 mb-2">País 1</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {Object.entries(countriesData).map(([name, data]) => (
                  <SelectItem key={name} value={name} className="text-white hover:bg-gray-700">
                    {data.flag} {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">País 2</label>
            <Select value={compareCountry} onValueChange={setCompareCountry}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {Object.entries(countriesData).map(([name, data]) => (
                  <SelectItem key={name} value={name} className="text-white hover:bg-gray-700">
                    {data.flag} {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Radar Chart Comparison */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              Comparação Direta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} />
                  <Radar
                    name={selectedCountry}
                    dataKey={selectedCountry}
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name={compareCountry}
                    dataKey={compareCountry}
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ComparisonCard
            title="Expectativa de Vida"
            icon={Heart}
            value1={country1.expectancy}
            value2={country2.expectancy}
            unit=" anos"
            higher1={country1.expectancy > country2.expectancy}
          />
          
          <ComparisonCard
            title="Horas de Trabalho"
            icon={Clock}
            value1={country1.workHours}
            value2={country2.workHours}
            unit="h/semana"
            higher1={country1.workHours < country2.workHours}
          />
          
          <ComparisonCard
            title="Exercício Semanal"
            icon={TrendingUp}
            value1={country1.exercise}
            value2={country2.exercise}
            unit="h/semana"
            higher1={country1.exercise > country2.exercise}
          />
          
          <ComparisonCard
            title="Redes Sociais"
            icon={Globe}
            value1={country1.socialMedia}
            value2={country2.socialMedia}
            unit="h/dia"
            higher1={country1.socialMedia < country2.socialMedia}
          />
        </div>

        {/* Global Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Countries by Life Expectancy */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Top 10 - Expectativa de Vida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCountriesExpectancy} layout="horizontal">
                    <XAxis type="number" domain={[70, 90]} />
                    <YAxis dataKey="flag" type="category" width={40} />
                    <Bar dataKey="expectancy" fill="#ef4444" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [`${value} anos`, 'Expectativa de Vida']}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Countries by Happiness */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
                Top 10 - Índice de Felicidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCountriesHappiness} layout="horizontal">
                    <XAxis type="number" domain={[30, 80]} />
                    <YAxis dataKey="flag" type="category" width={40} />
                    <Bar dataKey="happiness" fill="#fbbf24" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [`${(value as number / 10).toFixed(1)}/10`, 'Felicidade']}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card className="bg-gray-800 border-gray-700 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Análise Detalhada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">
                  {country1.flag} {selectedCountry}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Expectativa de vida</span>
                    <span className="text-white">{country1.expectancy} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Horas de trabalho</span>
                    <span className="text-white">{country1.workHours}h/semana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Exercício</span>
                    <span className="text-white">{country1.exercise}h/semana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Índice de felicidade</span>
                    <span className="text-white">{country1.happiness}/10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">
                  {country2.flag} {compareCountry}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Expectativa de vida</span>
                    <span className="text-white">{country2.expectancy} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Horas de trabalho</span>
                    <span className="text-white">{country2.workHours}h/semana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Exercício</span>
                    <span className="text-white">{country2.exercise}h/semana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Índice de felicidade</span>
                    <span className="text-white">{country2.happiness}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComparacaoGlobalPage;
