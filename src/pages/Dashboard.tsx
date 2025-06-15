
import { useState } from 'react';
import { LifeClockCard } from '@/components/LifeClockCard';
import { LifeMetricsCard } from '@/components/LifeMetricsCard';
import { LifeSimulator } from '@/components/LifeSimulator';
import { InsightCards } from '@/components/InsightCards';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
          E aí, {userProfile.name}! <span className="text-blue-400">👋</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
          Aqui está sua visão completa de {currentYear}. Quantos dias já passaram, quantos ainda temos pela frente, 
          e o mais importante: <span className="text-blue-400 font-semibold">como você pode aproveitar cada um deles</span>.
        </p>
        <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-4 max-w-md mx-auto backdrop-blur-sm">
          <p className="text-sm text-blue-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <strong>Sua jornada pessoal:</strong> Dados 100% privados e personalizados
          </p>
        </div>
      </div>

      {/* Top Section - Life Clock e Life Metrics em grid balanceado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
        <div className="flex">
          <LifeClockCard userProfile={userProfile} />
        </div>
        <div className="flex">
          <LifeMetricsCard userProfile={userProfile} />
        </div>
      </div>

      {/* Middle Section - Simulador de Futuros Possíveis */}
      <div className="mb-10">
        <LifeSimulator userProfile={userProfile} />
      </div>

      {/* Bottom Section - Insights Cards */}
      <div className="mb-8">
        <InsightCards userProfile={userProfile} />
      </div>

      {/* Call to Action - Comparação Global */}
      <div className="mt-12 mb-8">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Que tal uma perspectiva global?
            </h2>
          </div>
          <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Descubra como pessoas ao redor do mundo aproveitam o tempo e compare estratégias globais para 
            otimizar seus próximos meses. Uma jornada fascinante pela diversidade humana! 🌍
          </p>
          <Button
            onClick={() => navigate('/comparacao')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 flex-shrink-0"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Explorar o Mundo</span>
            <span className="xs:hidden">Ver Mundo</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
