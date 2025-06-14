
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
    netflix: 1.5,
    commute: 1,
    exercise: 0.5
  });

  const birthDate = new Date(userProfile.birthDate);
  const now = new Date();
  const ageInYears = now.getFullYear() - birthDate.getFullYear();

  const calculateLifetimeActivity = (hoursPerDay: number, startAge: number = 0) => {
    const yearsActive = Math.max(0, ageInYears - startAge);
    const totalHours = yearsActive * 365 * hoursPerDay;
    const totalDays = totalHours / 24;
    const totalYears = totalHours / (24 * 365);
    
    return { totalHours, totalDays, totalYears };
  };

  const activities = [
    {
      name: '📱 Redes Sociais',
      icon: '📱',
      value: dailyHours.socialMedia,
      key: 'socialMedia' as keyof typeof dailyHours,
      startAge: 13,
      color: 'text-purple-400'
    },
    {
      name: '📺 Netflix/Streaming',
      icon: '📺',
      value: dailyHours.netflix,
      key: 'netflix' as keyof typeof dailyHours,
      startAge: 10,
      color: 'text-red-400'
    },
    {
      name: '🚗 Deslocamento',
      icon: '🚗',
      value: dailyHours.commute,
      key: 'commute' as keyof typeof dailyHours,
      startAge: 18,
      color: 'text-gray-400'
    },
    {
      name: '💪 Exercícios',
      icon: '💪',
      value: dailyHours.exercise,
      key: 'exercise' as keyof typeof dailyHours,
      startAge: 15,
      color: 'text-green-400'
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700 h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          ⚡ Calculadora Personalizada
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Ajuste suas horas diárias e veja o impacto na vida
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const stats = calculateLifetimeActivity(activity.value, activity.startAge);
          
          return (
            <div key={activity.key} className="bg-gray-700 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-white font-semibold">
                  {activity.icon} {activity.name}
                </Label>
                <span className={`text-sm font-bold ${activity.color}`}>
                  {stats.totalYears.toFixed(1)} anos
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
                  <span className="text-gray-400">Total:</span> {Math.floor(stats.totalDays)} dias
                </div>
                <div>
                  <span className="text-gray-400">Horas:</span> {Math.floor(stats.totalHours).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="mt-4 p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
          <p className="text-orange-300 text-sm">
            💭 <strong>Insight:</strong> Você já passou{' '}
            {(
              calculateLifetimeActivity(dailyHours.socialMedia, 13).totalYears +
              calculateLifetimeActivity(dailyHours.netflix, 10).totalYears
            ).toFixed(1)} anos só entre telas e entretenimento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
