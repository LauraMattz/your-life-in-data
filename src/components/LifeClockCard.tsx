
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
    secondsLived: 0
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
        secondsLived: Math.max(0, secondsLived)
      });
    };

    calculateLifeData();
    const interval = setInterval(calculateLifeData, 1000);
    return () => clearInterval(interval);
  }, [userProfile]);

  // Criar grid de quadradinhos (representando semanas de vida)
  const totalWeeks = userProfile.lifeExpectancy * 52;
  const weeksLived = timeData.weeksLived;
  const gridSize = Math.ceil(Math.sqrt(totalWeeks));
  
  const renderLifeGrid = () => {
    const squares = [];
    for (let i = 0; i < totalWeeks; i++) {
      const isLived = i < weeksLived;
      squares.push(
        <div
          key={i}
          className={`w-1 h-1 ${
            isLived 
              ? 'bg-yellow-400' 
              : 'bg-gray-700'
          } transition-colors duration-200`}
          title={`Semana ${i + 1}${isLived ? ' - Vivida' : ' - A explorar'}`}
        />
      );
    }
    return squares;
  };

  return (
    <Card className="bg-gray-900 border-gray-700 h-fit">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          ⏰ Seu Relógio da Vida
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Baseado na expectativa de vida do {userProfile.country} ({userProfile.lifeExpectancy} anos)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Life Grid - Cada quadradinho é uma semana */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 text-center">
            📊 Sua Vida em Semanas
          </h3>
          <div 
            className="grid gap-0.5 mx-auto justify-center mb-3"
            style={{ 
              gridTemplateColumns: `repeat(${Math.min(gridSize, 52)}, minmax(0, 1fr))`,
              maxWidth: '300px'
            }}
          >
            {renderLifeGrid()}
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded"></div>
              <span className="text-gray-300">Vividas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-700 rounded"></div>
              <span className="text-gray-300">A explorar</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">
            {timeData.percentageLived.toFixed(1)}% da jornada completada
          </p>
        </div>

        {/* Life Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {timeData.daysLived.toLocaleString()} 😊
            </div>
            <div className="text-sm text-gray-300">Dias BEM Vividos</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {timeData.daysRemaining.toLocaleString()} 🌎
            </div>
            <div className="text-sm text-gray-300">Dias a explorar o mundão</div>
          </div>
        </div>

        {/* Contador Positivo - Conquistas da Vida */}
        <div className="bg-black p-4 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 text-center">
            🏆 Suas Conquistas de Tempo
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
              <div className="text-lg font-bold text-yellow-400">{timeData.minutesLived.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Minutos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">{timeData.secondsLived.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Segundos</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
