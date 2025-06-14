
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface LifeClockCardProps {
  userProfile: UserProfile;
}

export const LifeClockCard = ({ userProfile }: LifeClockCardProps) => {
  const [timeData, setTimeData] = useState({
    ageInDays: 0,
    daysLived: 0,
    daysRemaining: 0,
    percentageLived: 0,
    yearsRemaining: 0,
    monthsRemaining: 0,
    weeksRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    secondsRemaining: 0
  });

  useEffect(() => {
    const calculateLifeData = () => {
      const birthDate = new Date(userProfile.birthDate);
      const now = new Date();
      const deathDate = new Date(birthDate);
      deathDate.setFullYear(birthDate.getFullYear() + userProfile.lifeExpectancy);

      const ageInMs = now.getTime() - birthDate.getTime();
      const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
      
      const totalLifeDays = userProfile.lifeExpectancy * 365;
      const daysRemaining = Math.max(0, totalLifeDays - ageInDays);
      const percentageLived = (ageInDays / totalLifeDays) * 100;

      const remainingMs = deathDate.getTime() - now.getTime();
      const yearsRemaining = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 365));
      const monthsRemaining = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 30));
      const weeksRemaining = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 7));
      const hoursRemaining = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutesRemaining = Math.floor(remainingMs / (1000 * 60));
      const secondsRemaining = Math.floor(remainingMs / 1000);

      setTimeData({
        ageInDays,
        daysLived: ageInDays,
        daysRemaining,
        percentageLived,
        yearsRemaining: Math.max(0, yearsRemaining),
        monthsRemaining: Math.max(0, monthsRemaining),
        weeksRemaining: Math.max(0, weeksRemaining),
        hoursRemaining: Math.max(0, hoursRemaining),
        minutesRemaining: Math.max(0, minutesRemaining),
        secondsRemaining: Math.max(0, secondsRemaining)
      });
    };

    calculateLifeData();
    const interval = setInterval(calculateLifeData, 1000);
    return () => clearInterval(interval);
  }, [userProfile]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (timeData.percentageLived / 100) * circumference;

  return (
    <Card className="bg-gray-800 border-gray-700 h-fit">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          ⏰ Seu Relógio da Vida
        </CardTitle>
        <p className="text-gray-300">Olá, {userProfile.name}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Circular Progress */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-600"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="text-orange-500 transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-orange-500">
                {timeData.percentageLived.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-300">vivido</span>
            </div>
          </div>
        </div>

        {/* Life Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {timeData.daysLived.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Dias Vividos</div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-400">
              {timeData.daysRemaining.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Dias Restantes</div>
          </div>
        </div>

        {/* Countdown - Memento Mori */}
        <div className="bg-gray-900 p-4 rounded-lg border border-orange-500/20">
          <h3 className="text-lg font-semibold text-orange-400 mb-3 text-center">
            ⚱️ Memento Mori - Contagem Regressiva
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xl font-bold text-white">{timeData.yearsRemaining}</div>
              <div className="text-xs text-gray-400">Anos</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{timeData.monthsRemaining}</div>
              <div className="text-xs text-gray-400">Meses</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{timeData.weeksRemaining}</div>
              <div className="text-xs text-gray-400">Semanas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-400">{timeData.hoursRemaining.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Horas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-400">{timeData.minutesRemaining.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Minutos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-400">{timeData.secondsRemaining.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Segundos</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
