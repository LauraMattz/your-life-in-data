
import { useState } from 'react';
import { LifeClockCard } from '@/components/LifeClockCard';
import { LifeMetricsCard } from '@/components/LifeMetricsCard';
import { ActivityCalculator } from '@/components/ActivityCalculator';
import { LifeSimulator } from '@/components/LifeSimulator';
import { InsightCards } from '@/components/InsightCards';
import { UserSetup } from '@/components/UserSetup';

const Index = () => {
  const [userProfile, setUserProfile] = useState(null);

  if (!userProfile) {
    return <UserSetup onProfileComplete={setUserProfile} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            ⏳ Relógio da Vida
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            O Dashboard da Sua Existência — Uma calculadora brutalmente honesta de como você vive sua vida
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Life Clock - Featured */}
          <div className="lg:col-span-2 xl:col-span-1">
            <LifeClockCard userProfile={userProfile} />
          </div>
          
          {/* Life Metrics */}
          <div className="xl:col-span-1">
            <LifeMetricsCard userProfile={userProfile} />
          </div>

          {/* Activity Calculator */}
          <div className="xl:col-span-1">
            <ActivityCalculator userProfile={userProfile} />
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
    </div>
  );
};

export default Index;
