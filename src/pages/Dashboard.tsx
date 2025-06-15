
import { useState } from 'react';
import { LifeClockCard } from '@/components/LifeClockCard';
import { LifeMetricsCard } from '@/components/LifeMetricsCard';
import { LifeSimulator } from '@/components/LifeSimulator';
import { InsightCards } from '@/components/InsightCards';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, Sparkles, Eye, Settings, Zap, Lightbulb, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface DashboardProps {
  userProfile: UserProfile;
}

export const Dashboard = ({ userProfile }: DashboardProps) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
          E aí, {userProfile.name}! <span className="text-blue-400">👋</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Pronto para descobrir como aproveitar melhor seu tempo? Siga esta jornada em 4 passos simples para transformar sua rotina:
        </p>
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/40 rounded-xl p-6 max-w-lg mx-auto backdrop-blur-sm">
          <p className="text-sm text-blue-200 flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <strong>Sua jornada pessoal de transformação</strong>
          </p>
          <p className="text-xs text-blue-300">
            Dados 100% privados • Cálculos personalizados • Insights práticos
          </p>
        </div>
      </div>

      {/* Progresso da Jornada */}
      <div className="mb-16">
        <div className="flex justify-center">
          <div className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-sm text-gray-300 hidden sm:inline">Visualizar</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-sm text-gray-300 hidden sm:inline">Personalizar</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-sm text-gray-300 hidden sm:inline">Simular</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
              <span className="text-sm text-gray-300 hidden sm:inline">Aplicar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Etapa 1 - Visualizar onde você está */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Eye className="w-8 h-8 text-blue-400" />
            Primeiro, vamos ver onde você está agora
          </h2>
        </div>
        <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">📍 Sua posição no tempo</h3>
              <p className="text-gray-300 mb-3">
                Observe os dados abaixo para entender exatamente onde você está no ano de {currentYear}. 
                Veja quantos dias já passaram e quantos ainda restam para você aproveitar.
              </p>
              <div className="bg-blue-900/30 border border-blue-500/40 p-3 rounded-lg">
                <p className="text-blue-200 text-sm">
                  💡 <strong>Dica:</strong> Cada quadradinho no mapa representa um dia do ano. 
                  Os amarelos já passaram, os cinzas são suas oportunidades futuras!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="h-fit">
            <LifeClockCard userProfile={userProfile} />
          </div>
        </div>
      </div>

      {/* Etapa 2 - Personalizar seus dados */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-green-400" />
            Agora, ajuste os dados para sua realidade
          </h2>
        </div>
        <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-green-600 p-3 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">⚙️ Personalize sua rotina</h3>
              <p className="text-gray-300 mb-3">
                No card <strong>"Suas Horas em {currentYear}"</strong> abaixo, clique em <strong>"Editar"</strong> 
                para ajustar quantas horas você realmente passa em cada atividade. Isso tornará os cálculos mais precisos para você!
              </p>
              <div className="bg-green-900/30 border border-green-500/40 p-3 rounded-lg">
                <p className="text-green-200 text-sm">
                  🎯 <strong>Ação:</strong> Seja honesto com seus dados. Quanto mais preciso, melhores serão as simulações!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="h-fit">
            <LifeMetricsCard userProfile={userProfile} />
          </div>
        </div>
      </div>

      {/* Etapa 3 - Simular mudanças */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-purple-400" />
            Hora de simular: que mudanças você quer fazer?
          </h2>
        </div>
        <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">🎯 Experimente mudanças pequenas</h3>
              <p className="text-gray-300 mb-3">
                Use os controles abaixo para simular pequenas mudanças na sua rotina. 
                Mova os sliders e veja o impacto até o final do ano. Comece pequeno - mesmo 15 minutos fazem diferença!
              </p>
              <div className="bg-purple-900/30 border border-purple-500/40 p-3 rounded-lg">
                <p className="text-purple-200 text-sm">
                  ⚡ <strong>Dica:</strong> Não tente mudar tudo de uma vez. Escolha 1 ou 2 atividades para focar primeiro.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <LifeSimulator userProfile={userProfile} />
        </div>
      </div>

      {/* Etapa 4 - Aplicar insights */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            Por fim, inspire-se com ideias práticas
          </h2>
        </div>
        <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-600 p-3 rounded-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">💡 Transforme ideias em ação</h3>
              <p className="text-gray-300 mb-3">
                Leia os insights abaixo e escolha 1 ou 2 para colocar em prática hoje mesmo. 
                Não tente fazer tudo de uma vez - pequenos passos consistentes criam grandes transformações!
              </p>
              <div className="bg-yellow-900/30 border border-yellow-500/40 p-3 rounded-lg">
                <p className="text-yellow-200 text-sm">
                  🚀 <strong>Próximo passo:</strong> Escolha UMA ação e faça AGORA. Não espere o momento perfeito!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <InsightCards userProfile={userProfile} />
        </div>
      </div>

      {/* Call to Action - Comparação Global */}
      <div className="mt-16 mb-8">
        <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 border border-indigo-500/40 rounded-3xl p-8 text-center backdrop-blur-sm relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Globe className="w-10 h-10 text-blue-400" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bonus: Que tal uma perspectiva global?
              </h2>
            </div>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              🌍 <strong>Opcional:</strong> Descubra como pessoas ao redor do mundo aproveitam o tempo e compare estratégias globais. 
              Uma jornada fascinante pela diversidade humana!
            </p>
            <Button
              onClick={() => navigate('/comparacao')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 shadow-lg shadow-blue-500/25"
            >
              <Globe className="w-6 h-6" />
              <span className="hidden xs:inline">Explorar o Mundo</span>
              <span className="xs:hidden">Ver Mundo</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
