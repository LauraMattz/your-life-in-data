
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Olá, {userProfile.name}! 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
          Seu dashboard pessoal da vida — Uma calculadora brutalmente honesta de como você vive sua existência
        </p>
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-3 max-w-md mx-auto">
          <p className="text-sm text-green-200 flex items-center justify-center gap-2">
            🔒 <strong>100% Privado:</strong> Seus dados ficam apenas no seu navegador
          </p>
        </div>
      </div>

      {/* Top Section - Life Clock e Life Metrics em grid balanceado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <LifeClockCard userProfile={userProfile} />
        </div>
        <div>
          <LifeMetricsCard userProfile={userProfile} />
        </div>
      </div>

      {/* Middle Section - Simulador de Futuros Possíveis */}
      <div className="mb-8">
        <LifeSimulator userProfile={userProfile} />
      </div>

      {/* Bottom Section - Insights Cards */}
      <div className="mb-8">
        <InsightCards userProfile={userProfile} />
      </div>
    </div>
  );
};
