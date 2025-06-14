
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit3, Save, DollarSign, Info } from 'lucide-react';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface LifeMetricsCardProps {
  userProfile: UserProfile;
}

export const LifeMetricsCard = ({ userProfile }: LifeMetricsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dailyHours, setDailyHours] = useState({
    sleep: 8,
    work: 8,
    eating: 2,
    socialMedia: 2.5,
    commute: 1,
    exercise: 0.5
  });
  const [salary, setSalary] = useState({
    monthly: 3000,
    currency: 'R$'
  });

  const birthDate = new Date(userProfile.birthDate);
  const now = new Date();
  const ageInYears = now.getFullYear() - birthDate.getFullYear();
  
  const calculateActivityTime = (hoursPerDay: number, startAge: number = 0) => {
    const yearsActive = Math.max(0, ageInYears - startAge);
    const totalHours = yearsActive * 365 * hoursPerDay;
    return {
      hours: totalHours,
      days: Math.floor(totalHours / 24),
      years: (totalHours / (24 * 365)).toFixed(1)
    };
  };

  const metrics = [
    {
      activity: '😴 Descansando',
      hours: dailyHours.sleep,
      data: calculateActivityTime(dailyHours.sleep),
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-300',
      startAge: 0
    },
    {
      activity: '💼 Trabalhando',
      hours: dailyHours.work,
      data: calculateActivityTime(dailyHours.work, 18),
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-300',
      startAge: 18
    },
    {
      activity: '🍽️ Saboreando',
      hours: dailyHours.eating,
      data: calculateActivityTime(dailyHours.eating),
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-300',
      startAge: 0
    },
    {
      activity: '📱 Conectado',
      hours: dailyHours.socialMedia,
      data: calculateActivityTime(dailyHours.socialMedia, 13),
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-300',
      startAge: 13
    },
    {
      activity: '🚗 Em movimento',
      hours: dailyHours.commute,
      data: calculateActivityTime(dailyHours.commute, 16),
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-300',
      startAge: 16
    },
    {
      activity: '💪 Se exercitando',
      hours: dailyHours.exercise,
      data: calculateActivityTime(dailyHours.exercise, 15),
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-300',
      startAge: 15
    }
  ];

  const workHours = calculateActivityTime(dailyHours.work, 18).hours;
  const hourlyWage = salary.monthly * 12 / (dailyHours.work * 22 * 12);
  const totalEarned = workHours * hourlyWage;

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 h-fit">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              📊 Sua Jornada de Vida
            </CardTitle>
            <p className="text-gray-300 text-sm flex items-center gap-1">
              <Info className="w-3 h-3" />
              Estimativas baseadas nos seus hábitos atuais
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing && (
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg border border-blue-500/20 space-y-3">
            <h4 className="font-semibold text-blue-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Configurações Pessoais
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-gray-300 text-xs">Renda mensal (opcional)</Label>
                <Input
                  type="number"
                  value={salary.monthly}
                  onChange={(e) => setSalary(prev => ({ ...prev, monthly: Number(e.target.value) }))}
                  className="bg-gray-700 border-gray-600 text-white text-sm"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs">Moeda</Label>
                <Input
                  value={salary.currency}
                  onChange={(e) => setSalary(prev => ({ ...prev, currency: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              💡 Ajuste as horas diárias para refletir melhor sua rotina
            </p>
          </div>
        )}

        {metrics.map((metric, index) => (
          <div key={index} className={`bg-gradient-to-r ${metric.color} p-0.5 rounded-lg`}>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-white">{metric.activity}</span>
                <div className="flex items-center gap-2">
                  {isEditing && (
                    <Input
                      type="number"
                      step="0.5"
                      min="0"
                      max="24"
                      value={metric.hours}
                      onChange={(e) => {
                        const key = Object.keys(dailyHours)[index] as keyof typeof dailyHours;
                        setDailyHours(prev => ({
                          ...prev,
                          [key]: Number(e.target.value)
                        }));
                      }}
                      className="bg-gray-700 border-gray-600 text-white w-16 text-xs"
                    />
                  )}
                  <span className={`font-bold ${metric.textColor}`}>
                    {metric.data.years} anos
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>
                  <span className="text-gray-400">Horas:</span> {metric.data.hours.toLocaleString()}
                </div>
                <div>
                  <span className="text-gray-400">Dias:</span> {metric.data.days.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {salary.monthly > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-green-400">Valor do Seu Tempo</h4>
            </div>
            <p className="text-green-300 text-sm">
              💰 Através do seu trabalho, você já conquistou aproximadamente{' '}
              <span className="font-bold">
                {salary.currency} {totalEarned.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </span>
            </p>
            <p className="text-green-200 text-xs mt-1">
              Cada hora vale {salary.currency} {hourlyWage.toFixed(2)} - reconheça o valor do seu tempo! ⏰
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-lg">
          <p className="text-purple-300 text-sm font-medium">
            ✨ <strong>Reflexão:</strong> Cada momento vivido contribui para sua experiência única. 
            Estas são estimativas baseadas em médias - sua jornada real pode ser ainda mais rica! 
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
