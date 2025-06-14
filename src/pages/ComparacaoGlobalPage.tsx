import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Globe, TrendingUp, Heart, Clock, Users, Info, Filter, ChevronUp, ChevronDown, BarChart3, Activity, Lightbulb, ChevronRight, Shuffle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

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

const insights = [
  {
    id: 1,
    emoji: '🧠',
    title: 'Tempo Livre é o Novo Ouro',
    content: 'Os países com menor jornada de trabalho são também os mais felizes. Não é coincidência, é correlação direta.',
    conclusion: 'Trabalhar menos gera mais felicidade do que qualquer outro fator socioeconômico isolado.',
    evidence: 'Noruega, Dinamarca, Suécia, Finlândia e Holanda provaram que tempo livre vale mais que aumento de salário.'
  },
  {
    id: 2,
    emoji: '🔥',
    title: 'O Custo Oculto da Produtividade Asiática',
    content: 'Singapura, Japão, Coreia do Sul e China operam em alta performance: Jornadas de 38 a 46 horas/semana, altíssima longevidade (exceto China), mas baixo índice de felicidade (entre 5,8 e 6,5).',
    conclusion: 'O preço do sucesso econômico é pago com saúde mental e bem-estar emocional.',
    evidence: 'É uma economia que funciona, mas as pessoas não estão tão bem quanto parecem.'
  },
  {
    id: 3,
    emoji: '⌛',
    title: 'A Ilusão do Sucesso Americano',
    content: 'Os EUA têm uma das maiores jornadas de trabalho do mundo desenvolvido (34h/semana), longevidade baixa (77 anos) e felicidade apenas 6,7/10.',
    conclusion: 'O famoso "American Dream" entrega mais horas de trabalho, mais consumo, mas não entrega mais felicidade nem vida longa.',
    evidence: 'Produtividade ≠ Qualidade de Vida.'
  },
  {
    id: 4,
    emoji: '🌐',
    title: 'A Curva da Saturação Digital',
    content: 'Singapura: 5h18/dia em redes → felicidade 6,5. Coreia do Sul: 5h/dia → felicidade 5,8. China: 4h12/dia → felicidade 5,1.',
    conclusion: 'Quanto mais tempo conectado, menor o índice de felicidade.',
    evidence: 'Mais tempo na vida virtual → menos satisfação na vida real.'
  },
  {
    id: 5,
    emoji: '🔮',
    title: 'Brasil e México — O Paradoxo Latino',
    content: 'Trabalham muito (44h/semana Brasil, 43h México) e vivem relativamente pouco (76 e 75 anos), mas mantém felicidade moderada (6,3–6,4/10), mais alta que países asiáticos.',
    conclusion: 'Forte cultura comunitária, calor humano e resiliência social compensam parcialmente as adversidades econômicas.',
    evidence: 'Felicidade na América Latina não é sobre dinheiro, é sobre laços sociais.'
  },
  {
    id: 6,
    emoji: '⚡',
    title: 'A Fórmula Secreta da Holanda',
    content: 'Holanda é o único país que aparece tanto no grupo dos menos trabalho (<30h/semana) quanto dos altamente felizes (>7/10), fora dos países nórdicos.',
    conclusion: 'Uma cultura que equilibra trabalho, lazer e desenvolvimento social sem o rigor escandinavo.',
    evidence: 'O equilíbrio não é cultural, é uma decisão política e social.'
  },
  {
    id: 7,
    emoji: '⏳',
    title: 'Quem Compra Tempo, Compra Felicidade',
    content: 'Cada 5 horas a menos de trabalho semanal equivale a +0,5 ponto no índice de felicidade (Padrão nórdico vs. asiático).',
    conclusion: 'Tempo livre não é luxo, é estratégia de bem-estar.',
    evidence: 'Tempo livre é o novo PIB do século 21.'
  },
  {
    id: 8,
    emoji: '🌎',
    title: 'O Mapa da Longevidade vs. Felicidade',
    content: 'Alta Longevidade + Alta Felicidade: 🇳🇴 🇩🇰 🇫🇮 🇸🇪 🇨🇭 🇳🇱 | Alta Longevidade + Baixa Felicidade: 🇯🇵 🇰🇷 🇸🇬 | Baixa Longevidade + Felicidade Moderada: 🇧🇷 🇲🇽 🇦🇷',
    conclusion: 'Felicidade não acompanha necessariamente longevidade, nem economia.',
    evidence: 'A equação é muito mais sobre gestão de tempo, estresse e cultura de vida.'
  }
];

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

type SortField = 'country' | 'expectancy' | 'happiness' | 'workHours' | 'exercise' | 'socialMedia';
type SortDirection = 'asc' | 'desc';

const ComparacaoGlobalPage = () => {
  const [sortBy, setSortBy] = useState<SortField>('expectancy');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [minExpectancy, setMinExpectancy] = useState<string>('all');
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);

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

  // Função para ordenar
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection(field === 'workHours' ? 'asc' : 'desc'); // Menor trabalho é melhor
    }
  };

  // Aplicar ordenação
  const sortedCountries = [...allCountriesData].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'country') {
      comparison = a[sortBy].localeCompare(b[sortBy]);
    } else {
      comparison = a[sortBy] - b[sortBy];
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
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

  // Cálculos para insights
  const nordicos = allCountriesData.filter(c => ['Noruega', 'Dinamarca', 'Suécia', 'Finlândia'].includes(c.country));
  const avgNordicoHappiness = nordicos.reduce((sum, c) => sum + c.happiness, 0) / nordicos.length;
  const avgNordicoWork = nordicos.reduce((sum, c) => sum + c.workHours, 0) / nordicos.length;
  
  const asiaticos = allCountriesData.filter(c => ['Japão', 'Coreia do Sul', 'Singapura', 'China'].includes(c.country));
  const avgAsiaticoWork = asiaticos.reduce((sum, c) => sum + c.workHours, 0) / asiaticos.length;
  
  const workLifeBalanceCountries = allCountriesData.filter(c => c.workHours < 30 && c.happiness > 7);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline ml-1" /> : 
      <ChevronDown className="w-4 h-4 inline ml-1" />;
  };

  // Top 10 países por expectativa de vida
  const top10Expectancy = [...allCountriesData]
    .sort((a, b) => b.expectancy - a.expectancy)
    .slice(0, 10)
    .map((country, index) => ({
      ...country,
      rank: index + 1,
      displayName: country.flag
    }));

  const drawRandomInsight = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * insights.length);
    } while (newIndex === currentInsightIndex && insights.length > 1);
    setCurrentInsightIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            <span className="text-yellow-400">🌍</span> Comparação Global de Todos os Países
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Visualize e compare expectativa de vida e estilos de vida de {allCountriesData.length} países ao redor do mundo
          </p>
        </div>

        {/* Insights dos Dados - Collapsible com Sorteio */}
        <Card className="bg-black/40 border-gray-700 mb-8">
          <Collapsible open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-800/20 transition-colors">
                <CardTitle className="text-xl text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    Insights dos Dados
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isInsightsOpen ? 'rotate-90' : ''}`} />
                </CardTitle>
                <p className="text-sm text-gray-300">
                  Análises detalhadas baseadas nos dados oficiais de todos os países
                </p>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  {/* Insight Atual */}
                  <div className="bg-gray-800/30 rounded-lg border border-gray-600/30 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{insights[currentInsightIndex].emoji}</span>
                      <span className="text-yellow-400 font-semibold text-xl">{insights[currentInsightIndex].title}</span>
                    </div>
                    <p className="text-gray-200 mb-4 text-lg leading-relaxed">{insights[currentInsightIndex].content}</p>
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                      <p className="text-yellow-300 font-semibold mb-2">💎 Conclusão:</p>
                      <p className="text-gray-100">{insights[currentInsightIndex].conclusion}</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                      <p className="text-blue-300 font-semibold mb-2">✔️ Evidência:</p>
                      <p className="text-gray-100">{insights[currentInsightIndex].evidence}</p>
                    </div>
                    
                    {/* Botão de Sortear */}
                    <div className="flex justify-center">
                      <Button 
                        onClick={drawRandomInsight}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <Shuffle className="w-4 h-4" />
                        Sortear Outro Insight
                      </Button>
                    </div>
                    
                    {/* Contador de Insights */}
                    <div className="text-center mt-4">
                      <span className="text-gray-300 text-sm">
                        Insight {currentInsightIndex + 1} de {insights.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Filtros - Agora Retrátil */}
        <Card className="bg-black/40 border-gray-700 mb-8">
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-800/20 transition-colors">
                <CardTitle className="text-xl text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-6 h-6 text-yellow-400" />
                    Filtros
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-90' : ''}`} />
                </CardTitle>
                <p className="text-sm text-gray-300">
                  Filtre países por região e expectativa de vida
                </p>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Região</label>
                    <Select value={regionFilter} onValueChange={setRegionFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Selecione uma região" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 text-white">
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
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Expectativa mínima" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 text-white">
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
                      className="bg-gray-800 border-gray-600 text-white hover:bg-gray-600"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-gray-700">
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

          <Card className="bg-black/40 border-gray-700">
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

          <Card className="bg-black/40 border-gray-700">
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

          <Card className="bg-black/40 border-gray-700">
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
          {/* Top 10 Expectativa de Vida - Agora com todas as barras */}
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Top 10 Expectativa de Vida
              </CardTitle>
              <p className="text-sm text-gray-400">
                Asiáticos dominam, mas europeus não ficam muito atrás
              </p>
            </CardHeader>
            <CardContent className="h-[450px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={top10Expectancy}
                    margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
                  >
                    <XAxis 
                      dataKey="displayName" 
                      tick={{ fontSize: 20 }}
                      interval={0}
                      height={80}
                      angle={0}
                      textAnchor="middle"
                    />
                    <YAxis 
                      domain={[75, 90]}
                      label={{ value: 'Anos', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#ffffff' } }}
                      tick={{ fontSize: 12, fill: '#ffffff' }}
                    />
                    <Bar 
                      dataKey="expectancy" 
                      fill="url(#expectancyGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="expectancyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#fca5a5" />
                      </linearGradient>
                    </defs>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => [
                        `${value} anos`, 
                        `${props.payload.country} (${props.payload.rank}º lugar)`
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

          {/* Work-Life Balance Scatter */}
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Work-Life Balance Global
              </CardTitle>
              <p className="text-sm text-gray-400">
                Países no canto inferior direito têm o melhor equilíbrio
              </p>
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
                      domain={[25, 50]}
                      label={{ value: 'Horas/Semana →', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: '#ffffff' } }}
                      tick={{ fontSize: 12, fill: '#ffffff' }}
                    />
                    <YAxis 
                      dataKey="y" 
                      name="Expectativa" 
                      unit=" anos"
                      domain={[68, 86]}
                      label={{ value: '↑ Expectativa (anos)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#ffffff' } }}
                      tick={{ fontSize: 12, fill: '#ffffff' }}
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

          {/* Happiness vs Work Hours */}
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
                Felicidade vs Horas de Trabalho
              </CardTitle>
              <p className="text-sm text-gray-400">
                Será que trabalhar mais traz mais felicidade?
              </p>
            </CardHeader>
            <CardContent className="h-[450px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart 
                    data={allCountriesData.map(c => ({ ...c, x: c.workHours, y: c.happiness }))}
                    margin={{ top: 10, right: 20, left: 20, bottom: 40 }}
                  >
                    <XAxis 
                      dataKey="x" 
                      name="Horas de Trabalho" 
                      unit="h/sem" 
                      domain={[25, 50]}
                      label={{ value: 'Horas/Semana →', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: '#ffffff' } }}
                      tick={{ fontSize: 12, fill: '#ffffff' }}
                    />
                    <YAxis 
                      dataKey="y" 
                      name="Felicidade" 
                      unit="/10"
                      domain={[3, 8]}
                      label={{ value: '↑ Felicidade', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#ffffff' } }}
                      tick={{ fontSize: 12, fill: '#ffffff' }}
                    />
                    <Scatter dataKey="y" fill="#fbbf24" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => {
                        if (name === 'y') return [`${value}/10`, 'Felicidade'];
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

          {/* Países com Melhor Equilíbrio */}
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-green-400" />
                Mestres do Work-Life Balance
              </CardTitle>
              <p className="text-sm text-gray-400">
                Menos de 30h/semana + Felicidade 7+
              </p>
            </CardHeader>
            <CardContent className="h-[450px] p-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={workLifeBalanceCountries}
                    margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
                  >
                    <XAxis 
                      dataKey="flag" 
                      tick={{ fontSize: 16 }}
                      interval={0}
                      height={60}
                    />
                    <YAxis 
                      label={{ value: 'Horas/Semana', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#ffffff' } }}
                      tick={{ fontSize: 12, fill: '#ffffff' }}
                    />
                    <Bar dataKey="workHours" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name, props) => [
                        `${value}h/sem`, 
                        `${props.payload.country} (${props.payload.happiness}/10 felicidade)`
                      ]}
                      labelFormatter={() => ''}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabela Completa com ordenação clicável */}
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Ranking Completo de Países (Dados Oficiais 2024)
            </CardTitle>
            <p className="text-sm text-gray-400 mt-2">
              Clique nas colunas para ordenar os dados
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600">
                    <TableHead className="text-gray-300">#</TableHead>
                    <TableHead 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('country')}
                    >
                      País <SortIcon field="country" />
                    </TableHead>
                    <TableHead className="text-gray-300">Região</TableHead>
                    <TableHead 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('expectancy')}
                    >
                      Expectativa <SortIcon field="expectancy" />
                    </TableHead>
                    <TableHead 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('workHours')}
                    >
                      Trabalho <SortIcon field="workHours" />
                    </TableHead>
                    <TableHead 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('exercise')}
                    >
                      Exercício <SortIcon field="exercise" />
                    </TableHead>
                    <TableHead 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('socialMedia')}
                    >
                      Redes Sociais <SortIcon field="socialMedia" />
                    </TableHead>
                    <TableHead 
                      className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('happiness')}
                    >
                      Felicidade <SortIcon field="happiness" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCountries.map((country, index) => (
                    <TableRow key={country.country} className="border-gray-600 hover:bg-gray-700/50">
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
      
      <Footer />
    </div>
  );
};

export default ComparacaoGlobalPage;
