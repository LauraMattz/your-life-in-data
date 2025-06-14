import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Globe, TrendingUp, Heart, Clock, Users, Info, Filter } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ScatterChart, Scatter, LineChart, Line } from 'recharts';

const countriesData = {
  'Noruega': { 
    expectancy: 83.2, 
    workHours: 27.1,
    exercise: 4.5,
    socialMedia: 2.32,
    happiness: 7.302,
    flag: '🇳🇴'
  },
  'Dinamarca': { 
    expectancy: 82.4, 
    workHours: 28.8,
    exercise: 4.3,
    socialMedia: 2.17,
    happiness: 7.583,
    flag: '🇩🇰'
  },
  'Suécia': { 
    expectancy: 83.1, 
    workHours: 29.3,
    exercise: 4.2,
    socialMedia: 2.17,
    happiness: 7.344,
    flag: '🇸🇪'
  },
  'Finlândia': { 
    expectancy: 82.7, 
    workHours: 28.8,
    exercise: 4.1,
    socialMedia: 2.17,
    happiness: 7.741,
    flag: '🇫🇮'
  },
  'Holanda': { 
    expectancy: 82.3, 
    workHours: 26.8,
    exercise: 4.0,
    socialMedia: 2.17,
    happiness: 7.319,
    flag: '🇳🇱'
  },
  'Suíça': { 
    expectancy: 84.0, 
    workHours: 30.1,
    exercise: 3.9,
    socialMedia: 2.17,
    happiness: 7.060,
    flag: '🇨🇭'
  },
  'Canadá': {
    expectancy: 82.8,
    workHours: 32.5,
    exercise: 3.9,
    socialMedia: 3.90,
    happiness: 6.900,
    flag: '🇨🇦'
  },
  'Austrália': {
    expectancy: 83.5,
    workHours: 32.1,
    exercise: 4.1,
    socialMedia: 2.17,
    happiness: 7.057,
    flag: '🇦🇺'
  },
  'Alemanha': {
    expectancy: 81.3,
    workHours: 29.6,
    exercise: 3.8,
    socialMedia: 2.17,
    happiness: 6.719,
    flag: '🇩🇪'
  },
  'Reino Unido': {
    expectancy: 81.4,
    workHours: 32.2,
    exercise: 3.4,
    socialMedia: 2.17,
    happiness: 6.749,
    flag: '🇬🇧'
  },
  'Espanha': {
    expectancy: 83.6,
    workHours: 32.4,
    exercise: 3.2,
    socialMedia: 3.88,
    happiness: 6.421,
    flag: '🇪🇸'
  },
  'Estados Unidos': { 
    expectancy: 77.2, 
    workHours: 34.1,
    exercise: 3.1,
    socialMedia: 2.13,
    happiness: 6.725,
    flag: '🇺🇸'
  },
  'Itália': {
    expectancy: 83.5,
    workHours: 33.0,
    exercise: 2.9,
    socialMedia: 2.17,
    happiness: 6.324,
    flag: '🇮🇹'
  },
  'Japão': { 
    expectancy: 84.0, 
    workHours: 32.8,
    exercise: 2.8,
    socialMedia: 1.88,
    happiness: 6.060,
    flag: '🇯🇵'
  },
  'Singapura': { 
    expectancy: 85.2, 
    workHours: 45.0,
    exercise: 2.7,
    socialMedia: 5.30,
    happiness: 6.523,
    flag: '🇸🇬'
  },
  'Argentina': {
    expectancy: 76.7,
    workHours: 42.0,
    exercise: 2.6,
    socialMedia: 3.57,
    happiness: 6.188,
    flag: '🇦🇷'
  },
  'México': {
    expectancy: 75.0,
    workHours: 43.3,
    exercise: 2.4,
    socialMedia: 3.25,
    happiness: 6.678,
    flag: '🇲🇽'
  },
  'China': {
    expectancy: 78.0,
    workHours: 46.0,
    exercise: 2.3,
    socialMedia: 3.60,
    happiness: 5.973,
    flag: '🇨🇳'
  },
  'Coreia do Sul': { 
    expectancy: 83.3, 
    workHours: 38.8,
    exercise: 2.2,
    socialMedia: 5.00,
    happiness: 6.058,
    flag: '🇰🇷'
  },
  'Brasil': { 
    expectancy: 76.0, 
    workHours: 44.0,
    exercise: 2.1,
    socialMedia: 3.53,
    happiness: 6.272,
    flag: '🇧🇷'
  },
  'Índia': {
    expectancy: 70.0,
    workHours: 48.0,
    exercise: 1.8,
    socialMedia: 2.50,
    happiness: 4.054,
    flag: '🇮🇳'
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
  const [sortBy, setSortBy] = useState<'expectancy' | 'happiness' | 'workHours' | 'exercise'>('expectancy');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [minExpectancy, setMinExpectancy] = useState<string>('all');

  // Classificação por região
  const countryRegions = {
    'Europa': ['Alemanha', 'Espanha', 'Suécia', 'Reino Unido', 'Itália', 'Noruega', 'Dinamarca', 'Holanda', 'Suíça', 'Finlândia'],
    'Ásia': ['Japão', 'Coreia do Sul', 'Singapura', 'China', 'Índia'],
    'Américas': ['Brasil', 'Estados Unidos', 'Canadá', 'México', 'Argentina'],
    'Oceania': ['Austrália']
  };

  // Preparar dados para gráficos e tabela
  let allCountriesData = Object.entries(countriesData).map(([name, data]) => ({
    country: name,
    flag: data.flag,
    expectancy: data.expectancy,
    workHours: data.workHours,
    exercise: data.exercise,
    socialMedia: data.socialMedia,
    happiness: data.happiness,
    region: Object.entries(countryRegions).find(([_, countries]) => countries.includes(name))?.[0] || 'Outros'
  }));

  // Aplicar filtros
  if (regionFilter !== 'all') {
    allCountriesData = allCountriesData.filter(country => country.region === regionFilter);
  }

  if (minExpectancy !== 'all') {
    const minValue = parseInt(minExpectancy);
    allCountriesData = allCountriesData.filter(country => country.expectancy >= minValue);
  }

  const sortedCountries = [...allCountriesData].sort((a, b) => {
    if (sortBy === 'workHours') {
      return a[sortBy] - b[sortBy]; // Menor é melhor para horas de trabalho
    }
    return b[sortBy] - a[sortBy]; // Maior é melhor para outros
  });

  const scatterData = allCountriesData.map(country => ({
    ...country,
    name: country.flag,
    x: country.workHours,
    y: country.expectancy,
  }));

  const resetFilters = () => {
    setRegionFilter('all');
    setMinExpectancy('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Comparação Global de Todos os Países
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Visualize e compare expectativa de vida e estilos de vida de {allCountriesData.length} países ao redor do mundo
          </p>
          
          {/* Fontes dos dados atualizadas */}
          <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-yellow-400 bg-yellow-400/10 rounded-lg p-4 max-w-4xl mx-auto">
            <Info className="w-5 h-5" />
            <div className="text-center">
              <strong className="block mb-2">Fontes Oficiais dos Dados:</strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div><strong>Expectativa de Vida:</strong> World Bank – Life Expectancy Data (2024)</div>
                <div><strong>Índice de Felicidade:</strong> World Happiness Report 2024</div>
                <div><strong>Jornada de Trabalho:</strong> OECD – Hours Worked (2024)</div>
                <div><strong>Tempo em Redes Sociais:</strong> Digital 2024 Report – We Are Social & Meltwater</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Filter className="w-6 h-6 text-blue-400" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Região</label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione uma região" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white">Todas as Regiões</SelectItem>
                    <SelectItem value="Europa" className="text-white">Europa</SelectItem>
                    <SelectItem value="Ásia" className="text-white">Ásia</SelectItem>
                    <SelectItem value="Américas" className="text-white">Américas</SelectItem>
                    <SelectItem value="Oceania" className="text-white">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Expectativa Mínima</label>
                <Select value={minExpectancy} onValueChange={setMinExpectancy}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Expectativa mínima" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white">Todas</SelectItem>
                    <SelectItem value="70" className="text-white">70+ anos</SelectItem>
                    <SelectItem value="75" className="text-white">75+ anos</SelectItem>
                    <SelectItem value="80" className="text-white">80+ anos</SelectItem>
                    <SelectItem value="85" className="text-white">85+ anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button 
                  onClick={resetFilters}
                  variant="outline" 
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-white">Maior Expectativa</h3>
              </div>
              <div className="text-2xl font-bold text-red-400">
                {allCountriesData.length > 0 ? Math.max(...allCountriesData.map(c => c.expectancy)).toFixed(1) : 0} anos
              </div>
              <div className="text-sm text-gray-400">
                {allCountriesData.find(c => c.expectancy === Math.max(...allCountriesData.map(c => c.expectancy)))?.flag} {allCountriesData.find(c => c.expectancy === Math.max(...allCountriesData.map(c => c.expectancy)))?.country}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-white">Mais Feliz</h3>
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {allCountriesData.length > 0 ? Math.max(...allCountriesData.map(c => c.happiness)).toFixed(2) : 0}/10
              </div>
              <div className="text-sm text-gray-400">
                {allCountriesData.find(c => c.happiness === Math.max(...allCountriesData.map(c => c.happiness)))?.flag} {allCountriesData.find(c => c.happiness === Math.max(...allCountriesData.map(c => c.happiness)))?.country}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Menos Trabalho</h3>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {allCountriesData.length > 0 ? Math.min(...allCountriesData.map(c => c.workHours)).toFixed(1) : 0}h/sem
              </div>
              <div className="text-sm text-gray-400">
                {allCountriesData.find(c => c.workHours === Math.min(...allCountriesData.map(c => c.workHours)))?.flag} {allCountriesData.find(c => c.workHours === Math.min(...allCountriesData.map(c => c.workHours)))?.country}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Países Filtrados</h3>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {allCountriesData.length}
              </div>
              <div className="text-sm text-gray-400">
                de 21 países
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expectativa de Vida - Enhanced */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Expectativa de Vida por País
              </CardTitle>
              <p className="text-sm text-gray-400">
                Top {Math.min(15, sortedCountries.length)} países com maior expectativa de vida
              </p>
            </CardHeader>
            <CardContent className="h-[500px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sortedCountries.sort((a, b) => b.expectancy - a.expectancy).slice(0, 15)} 
                    layout="horizontal"
                    margin={{ top: 10, right: 50, left: 60, bottom: 10 }}
                  >
                    <XAxis 
                      type="number" 
                      domain={[65, 90]} 
                      tick={{ fontSize: 12, fill: '#ffffff' }}
                      axisLine={{ stroke: '#374151' }}
                      gridLine={{ stroke: '#374151' }}
                    />
                    <YAxis 
                      dataKey="country" 
                      type="category" 
                      width={55} 
                      tick={{ fontSize: 10, fill: '#ffffff' }}
                      axisLine={{ stroke: '#374151' }}
                    />
                    <Bar 
                      dataKey="expectancy" 
                      fill="url(#expectancyGradient)"
                      radius={[0, 4, 4, 0]}
                    />
                    <defs>
                      <linearGradient id="expectancyGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#fca5a5" />
                      </linearGradient>
                    </defs>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => [
                        `${value} anos`, 
                        `${props.payload.flag} ${props.payload.country}`
                      ]}
                      labelFormatter={() => ''}
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Relação Trabalho vs Expectativa */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Horas de Trabalho vs Expectativa de Vida
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[450px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart 
                    data={scatterData}
                    margin={{ top: 10, right: 20, bottom: 40, left: 20 }}
                  >
                    <XAxis 
                      dataKey="x" 
                      name="Horas de Trabalho" 
                      unit="h/sem" 
                      label={{ value: 'Horas/Semana', position: 'insideBottom', offset: -5, style: { fontSize: '12px' } }}
                    />
                    <YAxis 
                      dataKey="y" 
                      name="Expectativa" 
                      unit=" anos"
                      label={{ value: 'Expectativa (anos)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                    />
                    <Scatter dataKey="y" fill="#3b82f6" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => {
                        if (name === 'y') return [`${value} anos`, 'Expectativa'];
                        if (name === 'x') return [`${props.payload.x}h/sem`, 'Trabalho'];
                        return [value, name];
                      }}
                      labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                          return `${payload[0].payload.flag} ${payload[0].payload.country}`;
                        }
                        return label;
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Índice de Felicidade */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
                Índice de Felicidade
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={sortedCountries.sort((a, b) => b.happiness - a.happiness).slice(0, 12)}
                    margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
                  >
                    <XAxis 
                      dataKey="flag" 
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      domain={[3, 8]} 
                      label={{ value: 'Felicidade (0-10)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="happiness" 
                      stroke="#fbbf24" 
                      strokeWidth={2}
                      dot={{ fill: '#fbbf24', strokeWidth: 2, r: 3 }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`${value}/10`, 'Felicidade']}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Exercício Semanal */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-green-400" />
                Exercício Semanal por País
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sortedCountries.sort((a, b) => b.exercise - a.exercise).slice(0, 12)}
                    margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
                  >
                    <XAxis 
                      dataKey="flag" 
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      label={{ value: 'Horas/Semana', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                    />
                    <Bar dataKey="exercise" fill="#10b981" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`${value}h/semana`, 'Exercício']}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabela Completa com dados atualizados */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Ranking Completo de Países (Dados Oficiais 2024)
            </CardTitle>
            <div className="flex gap-2 mt-4 flex-wrap">
              <button 
                onClick={() => setSortBy('expectancy')}
                className={`px-3 py-1 rounded text-sm ${sortBy === 'expectancy' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Expectativa
              </button>
              <button 
                onClick={() => setSortBy('happiness')}
                className={`px-3 py-1 rounded text-sm ${sortBy === 'happiness' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Felicidade
              </button>
              <button 
                onClick={() => setSortBy('workHours')}
                className={`px-3 py-1 rounded text-sm ${sortBy === 'workHours' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Trabalho
              </button>
              <button 
                onClick={() => setSortBy('exercise')}
                className={`px-3 py-1 rounded text-sm ${sortBy === 'exercise' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Exercício
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600">
                    <TableHead className="text-gray-300">#</TableHead>
                    <TableHead className="text-gray-300">País</TableHead>
                    <TableHead className="text-gray-300">Região</TableHead>
                    <TableHead className="text-gray-300">Expectativa</TableHead>
                    <TableHead className="text-gray-300">Trabalho</TableHead>
                    <TableHead className="text-gray-300">Exercício</TableHead>
                    <TableHead className="text-gray-300">Redes Sociais</TableHead>
                    <TableHead className="text-gray-300">Felicidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCountries.map((country, index) => (
                    <TableRow key={country.country} className="border-gray-600 hover:bg-gray-700">
                      <TableCell className="text-gray-400 font-mono">
                        {(index + 1).toString().padStart(2, '0')}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{country.flag}</span>
                          <span className="hidden sm:inline">{country.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 text-sm">
                        {country.region}
                      </TableCell>
                      <TableCell className="text-red-400 font-semibold">
                        {country.expectancy} anos
                      </TableCell>
                      <TableCell className="text-orange-400">
                        {country.workHours}h/sem
                      </TableCell>
                      <TableCell className="text-green-400">
                        {country.exercise}h/sem
                      </TableCell>
                      <TableCell className="text-purple-400">
                        {country.socialMedia}h/dia
                      </TableCell>
                      <TableCell className="text-yellow-400 font-semibold">
                        {country.happiness}/10
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComparacaoGlobalPage;
