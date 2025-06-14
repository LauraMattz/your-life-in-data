
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
    expectancy: 84,
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
    expectancy: 78,
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
  const [sortBy, setSortBy] = useState<'expectancy' | 'happiness' | 'workHours' | 'exercise'>('expectancy');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [minExpectancy, setMinExpectancy] = useState<string>('all');

  // Classificação por região
  const countryRegions = {
    'Europa': ['Alemanha', 'França', 'Suécia', 'Reino Unido', 'Itália', 'Espanha', 'Noruega', 'Dinamarca', 'Holanda'],
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
          
          {/* Fonte dos dados */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-yellow-400 bg-yellow-400/10 rounded-lg p-3 max-w-2xl mx-auto">
            <Info className="w-4 h-4" />
            <span>
              <strong>Fonte:</strong> Dados simulados para demonstração baseados em tendências globais aproximadas
            </span>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Região</label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione uma região" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">Todas as Regiões</SelectItem>
                    <SelectItem value="Europa">Europa</SelectItem>
                    <SelectItem value="Ásia">Ásia</SelectItem>
                    <SelectItem value="Américas">Américas</SelectItem>
                    <SelectItem value="Oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Expectativa Mínima</label>
                <Select value={minExpectancy} onValueChange={setMinExpectancy}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Expectativa mínima" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="70">70+ anos</SelectItem>
                    <SelectItem value="75">75+ anos</SelectItem>
                    <SelectItem value="80">80+ anos</SelectItem>
                    <SelectItem value="85">85+ anos</SelectItem>
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
                {allCountriesData.length > 0 ? Math.max(...allCountriesData.map(c => c.expectancy)) : 0} anos
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
                {allCountriesData.length > 0 ? Math.max(...allCountriesData.map(c => c.happiness)).toFixed(1) : 0}/10
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
                {allCountriesData.length > 0 ? Math.min(...allCountriesData.map(c => c.workHours)) : 0}h/sem
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
                de 20 países
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expectativa de Vida */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Expectativa de Vida por País
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sortedCountries.slice(0, 15)} 
                    layout="horizontal"
                    margin={{ top: 20, right: 80, left: 60, bottom: 20 }}
                  >
                    <XAxis type="number" domain={[65, 90]} />
                    <YAxis 
                      dataKey="flag" 
                      type="category" 
                      width={50} 
                      tick={{ fontSize: 12 }}
                    />
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

          {/* Relação Trabalho vs Expectativa */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Horas de Trabalho vs Expectativa de Vida
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart 
                    data={scatterData}
                    margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                  >
                    <XAxis 
                      dataKey="x" 
                      name="Horas de Trabalho" 
                      unit="h/sem" 
                      label={{ value: 'Horas de Trabalho/Semana', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      dataKey="y" 
                      name="Expectativa" 
                      unit=" anos"
                      label={{ value: 'Expectativa de Vida (anos)', angle: -90, position: 'insideLeft' }}
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
            <CardContent className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={sortedCountries.sort((a, b) => b.happiness - a.happiness).slice(0, 15)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis 
                      dataKey="flag" 
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      domain={[3, 8]} 
                      label={{ value: 'Índice de Felicidade (0-10)', angle: -90, position: 'insideLeft' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="happiness" 
                      stroke="#fbbf24" 
                      strokeWidth={3}
                      dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
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
            <CardContent className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sortedCountries.sort((a, b) => b.exercise - a.exercise).slice(0, 15)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <XAxis 
                      dataKey="flag" 
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      label={{ value: 'Horas de Exercício/Semana', angle: -90, position: 'insideLeft' }}
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

        {/* Tabela Completa */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Ranking Completo de Países
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
