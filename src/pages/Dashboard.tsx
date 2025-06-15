
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Olá, {userProfile.name}! 👋
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
          Transforme seu tempo em 4 passos simples
        </p>
      </div>

      {/* Navigation Steps */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center gap-3 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3">
          {[
            { num: 1, label: 'Visualizar', id: 'etapa-1', color: 'bg-blue-600 hover:bg-blue-700' },
            { num: 2, label: 'Personalizar', id: 'etapa-2', color: 'bg-green-600 hover:bg-green-700' },
            { num: 3, label: 'Simular', id: 'etapa-3', color: 'bg-purple-600 hover:bg-purple-700' },
            { num: 4, label: 'Aplicar', id: 'etapa-4', color: 'bg-yellow-600 hover:bg-yellow-700' }
          ].map((step, index) => (
            <div key={step.num} className="flex items-center gap-2">
              {index > 0 && <div className="w-6 h-0.5 bg-gray-700"></div>}
              <button 
                onClick={() => scrollToSection(step.id)}
                className={`${step.color} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer`}
              >
                {step.num}
              </button>
              <span className="text-sm text-gray-300 hidden sm:inline">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 - Visualizar */}
      <section id="etapa-1" className="mb-20 scroll-mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-400" />
            Visualize onde você está
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="min-h-[500px]">
            <LifeClockCard userProfile={userProfile} />
          </div>
          <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 flex flex-col justify-center text-center min-h-[500px]">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Seu Progresso Anual</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Cada quadradinho representa um dia de {currentYear}. Veja quantos já passaram e quantos ainda restam.
            </p>
            <Button 
              onClick={() => scrollToSection('etapa-2')}
              className="bg-green-600 hover:bg-green-700 text-white mx-auto"
            >
              Próximo Passo →
            </Button>
          </div>
        </div>
      </section>

      {/* Step 2 - Personalizar */}
      <section id="etapa-2" className="mb-20 scroll-mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-green-400" />
            Personalize seus dados
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="min-h-[500px]">
            <LifeMetricsCard userProfile={userProfile} />
          </div>
          <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 flex flex-col justify-center text-center min-h-[500px]">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-white mb-3">Ajuste Sua Rotina</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Clique em "Editar" no card ao lado para personalizar quantas horas você dedica a cada atividade.
            </p>
            <Button 
              onClick={() => scrollToSection('etapa-3')}
              className="bg-purple-600 hover:bg-purple-700 text-white mx-auto"
            >
              Próximo Passo →
            </Button>
          </div>
        </div>
      </section>

      {/* Step 3 - Simular */}
      <section id="etapa-3" className="mb-20 scroll-mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400" />
            Simule mudanças
          </h2>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-600 rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm text-center">
            Experimente pequenas mudanças e veja o impacto até dezembro de {currentYear}
          </p>
        </div>
        
        <LifeSimulator userProfile={userProfile} />
      </section>

      {/* Step 4 - Aplicar */}
      <section id="etapa-4" className="mb-20 scroll-mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">4</div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Aplique insights
          </h2>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-600 rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm text-center">
            Escolha 1-2 ações práticas para implementar hoje mesmo
          </p>
        </div>
        
        <InsightCards userProfile={userProfile} />
      </section>

      {/* Bonus Section */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/40 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Explore o Mundo</h2>
        </div>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Compare estratégias de tempo com pessoas ao redor do mundo
        </p>
        <Button
          onClick={() => navigate('/comparacao')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Globe className="w-5 h-5 mr-2" />
          Ver Comparação Global
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
