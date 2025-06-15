
import { useState } from 'react';
import { LifeClockCard } from '@/components/LifeClockCard';
import { LifeMetricsCard } from '@/components/LifeMetricsCard';
import { LifeSimulator } from '@/components/LifeSimulator';
import { InsightCards } from '@/components/InsightCards';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, Eye, Settings, Zap, Lightbulb } from 'lucide-react';
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Olá, {userProfile.name}! 👋
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-4 md:mb-6 px-2">
          Transforme seu tempo em 4 passos simples
        </p>
      </div>

      {/* Navigation Steps */}
      <div className="flex justify-center mb-12 md:mb-16">
        <div className="flex items-center gap-2 md:gap-3 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-full px-3 md:px-6 py-2 md:py-3 max-w-full overflow-x-auto">
          {[
            { num: 1, label: 'Visualizar', id: 'etapa-1', color: 'bg-blue-600 hover:bg-blue-700' },
            { num: 2, label: 'Personalizar', id: 'etapa-2', color: 'bg-green-600 hover:bg-green-700' },
            { num: 3, label: 'Simular', id: 'etapa-3', color: 'bg-purple-600 hover:bg-purple-700' },
            { num: 4, label: 'Aplicar', id: 'etapa-4', color: 'bg-yellow-600 hover:bg-yellow-700' }
          ].map((step, index) => (
            <div key={step.num} className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              {index > 0 && <div className="w-4 md:w-6 h-0.5 bg-gray-700"></div>}
              <button 
                onClick={() => scrollToSection(step.id)}
                className={`${step.color} text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold transition-colors cursor-pointer`}
              >
                {step.num}
              </button>
              <span className="text-xs md:text-sm text-gray-300 hidden sm:inline whitespace-nowrap">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps 1 & 2 Side by Side */}
      <section id="etapa-1" className="mb-16 md:mb-20 scroll-mt-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          {/* Step 1 - Visualizar */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm md:text-base">1</div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                <span className="break-words">Visualize onde você está</span>
              </h2>
            </div>
            <div className="min-h-[400px] md:min-h-[500px]">
              <LifeClockCard userProfile={userProfile} />
            </div>
          </div>

          {/* Step 2 - Personalizar */}
          <div id="etapa-2">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm md:text-base">2</div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                <span className="break-words">Personalize seus dados</span>
              </h2>
            </div>
            <div className="min-h-[400px] md:min-h-[500px]">
              <LifeMetricsCard userProfile={userProfile} />
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 - Simular */}
      <section id="etapa-3" className="mb-16 md:mb-20 scroll-mt-20">
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
          <div className="bg-purple-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm md:text-base">3</div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            <span className="break-words">Simule mudanças</span>
          </h2>
        </div>
        
        <LifeSimulator userProfile={userProfile} />
      </section>

      {/* Step 4 - Aplicar */}
      <section id="etapa-4" className="mb-16 md:mb-20 scroll-mt-20">
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
          <div className="bg-yellow-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm md:text-base">4</div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
            <span className="break-words">Aplique insights</span>
          </h2>
        </div>
        
        <InsightCards userProfile={userProfile} />
      </section>

      {/* Bonus Section */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/40 rounded-2xl p-6 md:p-8 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
          <h2 className="text-xl md:text-2xl font-bold text-white">Explore o Mundo</h2>
        </div>
        <p className="text-gray-300 mb-4 md:mb-6 max-w-xl mx-auto text-sm md:text-base px-2">
          Compare estratégias de tempo com pessoas ao redor do mundo
        </p>
        <Button
          onClick={() => navigate('/comparacao')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
        >
          <Globe className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Ver Comparação Global
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
