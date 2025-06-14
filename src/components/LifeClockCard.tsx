
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
    daysPassedThisYear: 0,
    daysRemainingThisYear: 0
  });

  useEffect(() => {
    const calculateYearData = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
      const totalDaysInYear = isLeapYear ? 366 : 365;
      const daysRemainingThisYear = totalDaysInYear - dayOfYear;

      setTimeData({
        daysPassedThisYear: dayOfYear,
        daysRemainingThisYear
      });
    };

    calculateYearData();
    const interval = setInterval(calculateYearData, 1000 * 60 * 60); // Update every hour
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

  const percentageOfYearPassed = (daysPassedThisYear / totalDaysInYear) * 100;

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 h-full w-full">
      <CardHeader className="pb-4">
        <div className="text-center">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl relative z-10">📅</span>
              <span>Dias de {currentYear}</span>
            </div>
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Acompanhe sua jornada através dos dias deste ano
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Year Progress Bar */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Progresso do ano</span>
              <span>{percentageOfYearPassed.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentageOfYearPassed}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Year Grid - Cada quadradinho é um dia do ano */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl relative z-10">🗓️</span>
              <span>Mapa do Ano {currentYear}</span>
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
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {timeData.daysPassedThisYear.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Dias vividos em {currentYear}</div>
            <div className="text-xs text-yellow-300 mt-1">📅 Cada dia conta!</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {timeData.daysRemainingThisYear.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Dias restantes para explorar</div>
            <div className="text-xs text-green-300 mt-1">✨ Oportunidades à frente!</div>
          </div>
        </div>

        {/* Total Days in Year */}
        <div className="bg-black p-4 rounded-lg border border-gray-600">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {totalDaysInYear.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">
              Total de dias em {currentYear} {isLeapYear ? '(Ano bissexto! 🎉)' : ''}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {isLeapYear ? 'Um dia extra para fazer a diferença!' : 'Aproveite cada um dos 365 dias!'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
