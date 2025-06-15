import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Globe, TrendingUp, Heart, Clock, Users, Info, Filter, ChevronUp, ChevronDown, BarChart3, Activity, Lightbulb, ChevronRight, Shuffle, ArrowUp, Menu, X } from 'lucide-react';
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('header');

  // Scroll tracking for back to top button and active section
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      
      // Track active section
      const sections = ['header', 'insights', 'filters', 'stats', 'charts', 'ranking'];
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    setIsNavMenuOpen(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation items
  const navItems = [
    { id: 'header', label: 'Início', icon: Globe },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'filters', label: 'Filtros', icon: Filter },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
    { id: 'charts', label: 'Gráficos', icon: Activity },
    { id: 'ranking', label: 'Ranking', icon: TrendingUp },
  ];

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
      
      {/* Floating Navigation Menu - Mobile Optimized */}
      <div className="fixed top-16 right-2 z-40 md:top-20 md:right-4">
        <div className="bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg overflow-hidden shadow-xl">
          <Button
            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
            variant="ghost"
            size="sm"
            className="w-full p-2 text-white hover:bg-gray-700 md:hidden"
          >
            {isNavMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          
          <div className={`${isNavMenuOpen ? 'block' : 'hidden'} md:block max-h-[70vh] overflow-y-auto`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start p-2 md:p-3 text-left hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-yellow-600 text-black' : 'text-gray-300'
                  }`}
                >
                  <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-2 z-40 bg-yellow-600 hover:bg-yellow-700 text-black rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 md:bottom-6 md:right-4"
          size="sm"
        >
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      )}

      <div className="container mx-auto px-2 py-4 pr-12 md:px-4 md:py-8 md:pr-20">
        {/* Header */}
        <div id="header" className="text-center mb-8 md:mb-12 scroll-mt-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            <span className="text-yellow-400">🌍</span> Comparação Global de Todos os Países
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-4 md:mb-6 px-2">
            Visualize e compare expectativa de vida e estilos de vida de {allCountriesData.length} países ao redor do mundo
          </p>
          
          {/* Quick Navigation - Mobile Responsive */}
          <div className="grid grid-cols-2 gap-2 mt-6 md:flex md:flex-wrap md:justify-center md:gap-3 md:mt-8">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700 hover:border-yellow-400 transition-all duration-200 text-xs md:text-sm"
                >
                  <Icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.label.slice(0, 4)}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Insights dos Dados - Mobile Optimized */}
        <section id="insights" className="scroll-mt-20">
          <Card className="bg-black/40 border-gray-700 mb-6 md:mb-8">
            <Collapsible open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-800/20 transition-colors p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                      <span className="text-sm md:text-base">Insights dos Dados</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isInsightsOpen ? 'rotate-90' : ''}`} />
                  </CardTitle>
                  <p className="text-xs md:text-sm text-gray-300">
                    Análises detalhadas baseadas nos dados oficiais
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    {/* Insight Atual */}
                    <div className="bg-gray-800/30 rounded-lg border border-gray-600/30 p-4 md:p-6">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="text-2xl md:text-3xl">{insights[currentInsightIndex].emoji}</span>
                        <span className="text-yellow-400 font-semibold text-base md:text-xl">{insights[currentInsightIndex].title}</span>
                      </div>
                      <p className="text-gray-200 mb-3 md:mb-4 text-sm md:text-lg leading-relaxed">{insights[currentInsightIndex].content}</p>
                      <div className="bg-gray-800/50 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                        <p className="text-yellow-300 font-semibold mb-2 text-sm md:text-base">💎 Conclusão:</p>
                        <p className="text-gray-100 text-sm md:text-base">{insights[currentInsightIndex].conclusion}</p>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                        <p className="text-blue-300 font-semibold mb-2 text-sm md:text-base">✔️ Evidência:</p>
                        <p className="text-gray-100 text-sm md:text-base">{insights[currentInsightIndex].evidence}</p>
                      </div>
                      
                      {/* Botão de Sortear */}
                      <div className="flex justify-center">
                        <Button 
                          onClick={drawRandomInsight}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm md:text-base"
                        >
                          <Shuffle className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="hidden sm:inline">Sortear Outro Insight</span>
                          <span className="sm:hidden">Sortear</span>
                        </Button>
                      </div>
                      
                      {/* Contador de Insights */}
                      <div className="text-center mt-3 md:mt-4">
                        <span className="text-gray-300 text-xs md:text-sm">
                          Insight {currentInsightIndex + 1} de {insights.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </section>

        {/* Filtros - Mobile Optimized */}
        <section id="filters" className="scroll-mt-20">
          <Card className="bg-black/40 border-gray-700 mb-6 md:mb-8">
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-800/20 transition-colors p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                      <span className="text-sm md:text-base">Filtros</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isFiltersOpen ? 'rotate-90' : ''}`} />
                  </CardTitle>
                  <p className="text-xs md:text-sm text-gray-300">
                    Filtre países por região e expectativa de vida
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-white mb-2">Região</label>
                      <Select value={regionFilter} onValueChange={setRegionFilter}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-9 md:h-10">
                          <SelectValue placeholder="Selecione uma região" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 text-white z-50">
                          <SelectItem value="all" className="text-white">Todas as Regiões</SelectItem>
                          <SelectItem value="Europa" className="text-white">Europa</SelectItem>
                          <SelectItem value="Ásia" className="text-white">Ásia</SelectItem>
                          <SelectItem value="Américas" className="text-white">Américas</SelectItem>
                          <SelectItem value="Oceania" className="text-white">Oceania</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-white mb-2">Expectativa Mínima</label>
                      <Select value={minExpectancy} onValueChange={setMinExpectancy}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-9 md:h-10">
                          <SelectValue placeholder="Expectativa mínima" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 text-white z-50">
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
                        className="bg-gray-800 border-gray-600 text-white hover:bg-gray-600 w-full md:w-auto h-9 md:h-10 text-sm"
                      >
                        Limpar Filtros
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </section>

        {/* Stats Cards - Mobile Grid */}
        <section id="stats" className="scroll-mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card className="bg-black/40 border-gray-700">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                  <h3 className="font-semibold text-white text-xs md:text-sm">Maior Expectativa</h3>
                </div>
                <div className="text-lg md:text-2xl font-bold text-red-400">
                  {allCountriesData.length > 0 ? Math.max(...allCountriesData.map(c => c.expectancy)).toFixed(1) : 0} anos
                </div>
                <div className="text-xs md:text-sm text-gray-400 truncate">
                  {allCountriesData.find(c => c.expectancy === Math.max(...allCountriesData.map(c => c.expectancy)))?.flag} {allCountriesData.find(c => c.expectancy === Math.max(...allCountriesData.map(c => c.expectancy)))?.country}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  <h3 className="font-semibold text-white text-xs md:text-sm">Mais Feliz</h3>
                </div>
                <div className="text-lg md:text-2xl font-bold text-yellow-400">
                  {allCountriesData.length > 0 ? Math.max(...allCountriesData.map(c => c.happiness)).toFixed(2) : 0}/10
                </div>
                <div className="text-xs md:text-sm text-gray-400 truncate">
                  {allCountriesData.find(c => c.happiness === Math.max(...allCountriesData.map(c => c.happiness)))?.flag} {allCountriesData.find(c => c.happiness === Math.max(...allCountriesData.map(c => c.happiness)))?.country}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  <h3 className="font-semibold text-white text-xs md:text-sm">Menos Trabalho</h3>
                </div>
                <div className="text-lg md:text-2xl font-bold text-green-400">
                  {allCountriesData.length > 0 ? Math.min(...allCountriesData.map(c => c.workHours)).toFixed(1) : 0}h/sem
                </div>
                <div className="text-xs md:text-sm text-gray-400 truncate">
                  {allCountriesData.find(c => c.workHours === Math.min(...allCountriesData.map(c => c.workHours)))?.flag} {allCountriesData.find(c => c.workHours === Math.min(...allCountriesData.map(c => c.workHours)))?.country}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <h3 className="font-semibold text-white text-xs md:text-sm">Países Filtrados</h3>
                </div>
                <div className="text-lg md:text-2xl font-bold text-blue-400">
                  {allCountriesData.length}
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  de 21 países
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts Grid - Mobile Stack */}
        <section id="charts" className="scroll-mt-20">
          <div className="grid grid-cols-1 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Top 10 Expectativa de Vida */}
            <Card className="bg-black/40 border-gray-700">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  <span className="text-sm md:text-base">Top 10 Expectativa de Vida</span>
                </CardTitle>
                <p className="text-xs md:text-sm text-gray-400">
                  Asiáticos dominam, mas europeus não ficam muito atrás
                </p>
              </CardHeader>
              <CardContent className="h-[300px] md:h-[450px] p-2 md:p-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={top10Expectancy}
                      margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                    >
                      <XAxis 
                        dataKey="displayName" 
                        tick={{ fontSize: 16 }}
                        interval={0}
                        height={60}
                        angle={0}
                        textAnchor="middle"
                      />
                      <YAxis 
                        domain={[75, 90]}
                        label={{ value: 'Anos', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#ffffff' } }}
                        tick={{ fontSize: 10, fill: '#ffffff' }}
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
                          color: '#ffffff',
                          fontSize: '12px'
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Work-Life Balance Scatter */}
            <Card className="bg-black/40 border-gray-700">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  <span className="text-sm md:text-base">Work-Life Balance Global</span>
                </CardTitle>
                <p className="text-xs md:text-sm text-gray-400">
                  Países no canto inferior direito têm o melhor equilíbrio
                </p>
              </CardHeader>
              <CardContent className="h-[300px] md:h-[450px] p-2 md:p-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart 
                      data={scatterData}
                      margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
                    >
                      <XAxis 
                        dataKey="x" 
                        name="Horas de Trabalho" 
                        unit="h/sem" 
                        domain={[25, 50]}
                        label={{ value: 'Horas/Semana →', position: 'insideBottom', offset: -5, style: { fontSize: '10px', fill: '#ffffff' } }}
                        tick={{ fontSize: 10, fill: '#ffffff' }}
                      />
                      <YAxis 
                        dataKey="y" 
                        name="Expectativa" 
                        unit=" anos"
                        domain={[68, 86]}
                        label={{ value: '↑ Expectativa (anos)', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#ffffff' } }}
                        tick={{ fontSize: 10, fill: '#ffffff' }}
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
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '12px'
                        }}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Split remaining charts on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Happiness vs Work Hours */}
              <Card className="bg-black/40 border-gray-700">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                    <span className="text-sm md:text-base">Felicidade vs Trabalho</span>
                  </CardTitle>
                  <p className="text-xs md:text-sm text-gray-400">
                    Será que trabalhar mais traz mais felicidade?
                  </p>
                </CardHeader>
                <CardContent className="h-[300px] md:h-[450px] p-2 md:p-4">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart 
                        data={allCountriesData.map(c => ({ ...c, x: c.workHours, y: c.happiness }))}
                        margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                      >
                        <XAxis 
                          dataKey="x" 
                          name="Horas de Trabalho" 
                          unit="h/sem" 
                          domain={[25, 50]}
                          label={{ value: 'Horas/Semana →', position: 'insideBottom', offset: -5, style: { fontSize: '10px', fill: '#ffffff' } }}
                          tick={{ fontSize: 10, fill: '#ffffff' }}
                        />
                        <YAxis 
                          dataKey="y" 
                          name="Felicidade" 
                          unit="/10"
                          domain={[3, 8]}
                          label={{ value: '↑ Felicidade', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#ffffff' } }}
                          tick={{ fontSize: 10, fill: '#ffffff' }}
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
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '12px'
                          }}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Países com Melhor Equilíbrio */}
              <Card className="bg-black/40 border-gray-700">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    <span className="text-sm md:text-base">Work-Life Balance</span>
                  </CardTitle>
                  <p className="text-xs md:text-sm text-gray-400">
                    Menos de 30h/semana + Felicidade 7+
                  </p>
                </CardHeader>
                <CardContent className="h-[300px] md:h-[450px] p-2 md:p-4">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={workLifeBalanceCountries}
                        margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                      >
                        <XAxis 
                          dataKey="flag" 
                          tick={{ fontSize: 14 }}
                          interval={0}
                          height={50}
                        />
                        <YAxis 
                          label={{ value: 'Horas/Semana', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#ffffff' } }}
                          tick={{ fontSize: 10, fill: '#ffffff' }}
                        />
                        <Bar dataKey="workHours" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value, name, props) => [
                            `${value}h/sem`, 
                            `${props.payload.country} (${props.payload.happiness}/10 felicidade)`
                          ]}
                          labelFormatter={() => ''}
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '12px'
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tabela Completa - Mobile Optimized */}
        <section id="ranking" className="scroll-mt-20">
          <Card className="bg-black/40 border-gray-700">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                <span className="text-sm md:text-base">Ranking Completo de Países</span>
              </CardTitle>
              <p className="text-xs md:text-sm text-gray-400 mt-2">
                Clique nas colunas para ordenar os dados
              </p>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-600">
                      <TableHead className="text-gray-300 text-xs">#</TableHead>
                      <TableHead 
                        className="text-gray-300 cursor-pointer hover:text-white transition-colors text-xs"
                        onClick={() => handleSort('country')}
                      >
                        País <SortIcon field="country" />
                      </TableHead>
                      <TableHead className="text-gray-300 text-xs hidden md:table-cell">Região</TableHead>
                      <TableHead 
                        className="text-gray-300 cursor-pointer hover:text-white transition-colors text-xs"
                        onClick={() => handleSort('expectancy')}
                      >
                        Expect. <SortIcon field="expectancy" />
                      </TableHead>
                      <TableHead 
                        className="text-gray-300 cursor-pointer hover:text-white transition-colors text-xs"
                        onClick={() => handleSort('workHours')}
                      >
                        Trab. <SortIcon field="workHours" />
                      </TableHead>
                      <TableHead 
                        className="text-gray-300 cursor-pointer hover:text-white transition-colors text-xs hidden sm:table-cell"
                        onClick={() => handleSort('exercise')}
                      >
                        Exerc. <SortIcon field="exercise" />
                      </TableHead>
                      <TableHead 
                        className="text-gray-300 cursor-pointer hover:text-white transition-colors text-xs hidden lg:table-cell"
                        onClick={() => handleSort('socialMedia')}
                      >
                        Redes <SortIcon field="socialMedia" />
                      </TableHead>
                      <TableHead 
                        className="text-gray-300 cursor-pointer hover:text-white transition-colors text-xs"
                        onClick={() => handleSort('happiness')}
                      >
                        Felic. <SortIcon field="happiness" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCountries.map((country, index) => (
                      <TableRow key={country.country} className="border-gray-600 hover:bg-gray-700/50">
                        <TableCell className="text-gray-400 font-mono text-xs">
                          {(index + 1).toString().padStart(2, '0')}
                        </TableCell>
                        <TableCell className="text-white font-medium text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-base">{country.flag}</span>
                            <span className="hidden sm:inline truncate max-w-[80px] lg:max-w-none">{country.country}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300 text-xs hidden md:table-cell">
                          {country.region}
                        </TableCell>
                        <TableCell className="text-red-400 font-semibold text-xs">
                          {country.expectancy}
                        </TableCell>
                        <TableCell className="text-orange-400 text-xs">
                          {country.workHours}h
                        </TableCell>
                        <TableCell className="text-green-400 text-xs hidden sm:table-cell">
                          {country.exercise}h
                        </TableCell>
                        <TableCell className="text-purple-400 text-xs hidden lg:table-cell">
                          {country.socialMedia}h
                        </TableCell>
                        <TableCell className="text-yellow-400 font-semibold text-xs">
                          {country.happiness}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default ComparacaoGlobalPage;
