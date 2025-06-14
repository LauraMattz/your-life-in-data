
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
    yearsLived: 0,
    monthsLived: 0,
    weeksLived: 0,
    hoursLived: 0,
    minutesLived: 0,
    secondsLived: 0,
    daysPassedThisYear: 0,
    daysRemainingThisYear: 0
  });

  useEffect(() => {
    const calculateLifeData = () => {
      const birthDate = new Date(userProfile.birthDate);
      const now = new Date();

      const ageInMs = now.getTime() - birthDate.getTime();
      const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
      
      const totalLifeDays = userProfile.lifeExpectancy * 365;
      const daysRemaining = Math.max(0, totalLifeDays - ageInDays);
      const percentageLived = (ageInDays / totalLifeDays) * 100;

      const yearsLived = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365));
      const monthsLived = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 30));
      const weeksLived = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 7));
      const hoursLived = Math.floor(ageInMs / (1000 * 60 * 60));
      const minutesLived = Math.floor(ageInMs / (1000 * 60));
      const secondsLived = Math.floor(ageInMs / 1000);

      // Calcular dias do ano atual
      const currentYear = now.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
      const totalDaysInYear = isLeapYear ? 366 : 365;
      const daysRemainingThisYear = totalDaysInYear - dayOfYear;

      setTimeData({
        ageInDays,
        daysLived: ageInDays,
        daysRemaining,
        percentageLived,
        yearsLived: Math.max(0, yearsLived),
        monthsLived: Math.max(0, monthsLived),
        weeksLived: Math.max(0, weeksLived),
        hoursLived: Math.max(0, hoursLived),
        minutesLived: Math.max(0, minutesLived),
        secondsLived: Math.max(0, secondsLived),
        daysPassedThisYear: dayOfYear,
        daysRemainingThisYear
      });
    };

    calculateLifeData();
    const interval = setInterval(calculateLifeData, 1000);
    return () => clearInterval(interval);
  }, [userProfile]);

  const currentYear = new Date().getFullYear();
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  const daysPassedThisYear = timeData.daysPassedThisYear;
  const gridSize = Math.ceil(Math.sqrt(totalDaysInYear));
  
  const renderYearGrid = () => {
    const squares = [];
    for (let i = 0; i < totalDaysInYear; i++) {
      const isPassed = i < daysPassedThisYear;
      squares.push(
        <div
          key={i}
          className={`w-1 h-1 ${
            isPassed 
              ? 'bg-yellow-400' 
              : 'bg-gray-700'
          } transition-colors duration-200`}
          title={`Dia ${i + 1} de ${currentYear}${isPassed ? ' - Já passou' : ' - Ainda por vir'}`}
        />
      );
    }
    return squares;
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 h-full w-full">
      <CardHeader className="pb-4">
        <div className="text-center">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl relative z-10">⏰</span>
              <span>Seu Relógio da Vida</span>
            </div>
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Baseado na expectativa de vida do {userProfile.country} ({userProfile.lifeExpectancy} anos)
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Year Grid - Cada quadradinho é um dia do ano */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl relative z-10">📅</span>
              <span>Dias de {currentYear}</span>
            </div>
          </h3>
          <div 
            className="grid gap-0.5 mx-auto justify-center mb-3"
            style={{ 
              gridTemplateColumns: `repeat(${Math.min(gridSize, 30)}, minmax(0, 1fr))`,
              maxWidth: '300px'
            }}
          >
            {renderYearGrid()}
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded"></div>
              <span className="text-gray-300">Já passou</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-700 rounded"></div>
              <span className="text-gray-300">Ainda por vir</span>
            </div>
          </div>
        </div>

        {/* Year Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {timeData.daysPassedThisYear.toLocaleString()} 📅
            </div>
            <div className="text-sm text-gray-300">Dias vividos em {currentYear}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {timeData.daysRemainingThisYear.toLocaleString()} ✨
            </div>
            <div className="text-sm text-gray-300">Dias restantes para explorar</div>
          </div>
        </div>

        {/* Contador Positivo - Conquistas da Vida */}
        <div className="bg-black p-4 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl relative z-10">🏆</span>
              <span>Suas Conquistas de Tempo</span>
            </div>
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xl font-bold text-white">{timeData.yearsLived}</div>
              <div className="text-xs text-gray-400">Anos</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{timeData.monthsLived}</div>
              <div className="text-xs text-gray-400">Meses</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{timeData.weeksLived}</div>
              <div className="text-xs text-gray-400">Semanas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{timeData.hoursLived.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Horas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{Math.round(timeData.minutesLived / 1000)}k</div>
              <div className="text-xs text-gray-400">Minutos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">{Math.round(timeData.secondsLived / 1000000)}M</div>
              <div className="text-xs text-gray-400">Segundos</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
