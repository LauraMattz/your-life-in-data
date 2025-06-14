
import { useState } from 'react';
import { LifeClockCard } from '@/components/LifeClockCard';
import { LifeMetricsCard } from '@/components/LifeMetricsCard';
import { LifeSimulator } from '@/components/LifeSimulator';
import { InsightCards } from '@/components/InsightCards';

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
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Olá, {userProfile.name}! 👋
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 leading-relaxed">
          Seu dashboard pessoal da vida — Uma calculadora brutalmente honesta de como você vive sua existência
        </p>
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-xl p-4 max-w-md mx-auto backdrop-blur-sm">
          <p className="text-sm text-emerald-200 flex items-center justify-center gap-2">
            🔒 <strong>100% Privado:</strong> Seus dados ficam apenas no seu navegador
          </p>
        </div>
      </div>

      {/* Top Section - Life Clock e Life Metrics em grid balanceado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <LifeClockCard userProfile={userProfile} />
        </div>
        <div>
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
    </div>
  );
};
