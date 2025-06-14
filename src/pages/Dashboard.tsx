
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Olá, {userProfile.name}! 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Seu dashboard pessoal da vida — Uma calculadora brutalmente honesta de como você vive sua existência
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Life Clock - Featured */}
        <div>
          <LifeClockCard userProfile={userProfile} />
        </div>
        
        {/* Life Metrics */}
        <div>
          <LifeMetricsCard userProfile={userProfile} />
        </div>
      </div>

      {/* Insights Section */}
      <div className="mb-8">
        <InsightCards userProfile={userProfile} />
      </div>

      {/* Life Simulator */}
      <div className="mb-8">
        <LifeSimulator userProfile={userProfile} />
      </div>
    </div>
  );
};
