
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface ActivityCalculatorProps {
  userProfile: UserProfile;
}

export const ActivityCalculator = ({ userProfile }: ActivityCalculatorProps) => {
  const [dailyHours, setDailyHours] = useState({
    socialMedia: 2.5,
    television: 1.5,
    commute: 1,
    exercise: 0.5
  });

  const now = new Date();
  const currentYear = now.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  const daysRemainingThisYear = totalDaysInYear - dayOfYear;

  const calculateYearActivity = (hoursPerDay: number) => {
    const totalHoursThisYear = dayOfYear * hoursPerDay;
    const remainingHoursThisYear = daysRemainingThisYear * hoursPerDay;
    const totalDaysThisYear = totalHoursThisYear / 24;
    const remainingDaysThisYear = remainingHoursThisYear / 24;
    
    return { 
      totalHoursThisYear, 
      totalDaysThisYear, 
      remainingHoursThisYear,
      remainingDaysThisYear 
    };
  };

  const activities = [
    {
      name: '📱 Redes Sociais',
      icon: '📱',
      value: dailyHours.socialMedia,
      key: 'socialMedia' as keyof typeof dailyHours,
      color: 'text-purple-400'
    },
    {
      name: '📺 Televisão',
      icon: '📺',
      value: dailyHours.television,
      key: 'television' as keyof typeof dailyHours,
      color: 'text-red-400'
    },
    {
      name: '🚗 Deslocamento',
      icon: '🚗',
      value: dailyHours.commute,
      key: 'commute' as keyof typeof dailyHours,
      color: 'text-gray-400'
    },
    {
      name: '💪 Exercícios',
      icon: '💪',
      value: dailyHours.exercise,
      key: 'exercise' as keyof typeof dailyHours,
      color: 'text-green-400'
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700 h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          ⚡ Calculadora para {currentYear}
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Ajuste suas horas diárias e veja o impacto no ano atual ({daysRemainingThisYear} dias restantes)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const stats = calculateYearActivity(activity.value);
          
          return (
            <div key={activity.key} className="bg-gray-700 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-white font-semibold">
                  {activity.icon} {activity.name}
                </Label>
                <span className={`text-sm font-bold ${activity.color}`}>
                  {stats.totalDaysThisYear.toFixed(1)} dias em {currentYear}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="24"
                  value={activity.value}
                  onChange={(e) => setDailyHours(prev => ({
                    ...prev,
                    [activity.key]: parseFloat(e.target.value) || 0
                  }))}
                  className="bg-gray-600 border-gray-500 text-white w-20"
                />
                <span className="text-gray-300 text-sm">horas/dia</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>
                  <span className="text-gray-400">Já passou:</span> {Math.floor(stats.totalDaysThisYear)} dias
                </div>
                <div>
                  <span className="text-gray-400">Restante:</span> {Math.floor(stats.remainingDaysThisYear)} dias
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
