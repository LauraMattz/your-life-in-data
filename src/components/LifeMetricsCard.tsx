
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const birthDate = new Date(userProfile.birthDate);
  const now = new Date();
  const ageInYears = now.getFullYear() - birthDate.getFullYear();
  
  // Cálculos baseados na idade atual
  const sleepHours = ageInYears * 365 * 8; // 8 horas por dia
  const workHours = Math.max(0, (ageInYears - 18) * 365 * 8); // 8 horas por dia a partir dos 18
  const eatingHours = ageInYears * 365 * 2; // 2 horas por dia
  const socialMediaHours = Math.max(0, (ageInYears - 13) * 365 * 2.5); // 2.5 horas por dia a partir dos 13

  const metrics = [
    {
      activity: '😴 Dormindo',
      hours: sleepHours,
      days: Math.floor(sleepHours / 24),
      years: (sleepHours / (24 * 365)).toFixed(1),
      color: 'text-blue-400'
    },
    {
      activity: '💼 Trabalhando',
      hours: workHours,
      days: Math.floor(workHours / 24),
      years: (workHours / (24 * 365)).toFixed(1),
      color: 'text-yellow-400'
    },
    {
      activity: '🍽️ Comendo',
      hours: eatingHours,
      days: Math.floor(eatingHours / 24),
      years: (eatingHours / (24 * 365)).toFixed(1),
      color: 'text-green-400'
    },
    {
      activity: '📱 Redes Sociais',
      hours: socialMediaHours,
      days: Math.floor(socialMediaHours / 24),
      years: (socialMediaHours / (24 * 365)).toFixed(1),
      color: 'text-purple-400'
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700 h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          📊 Tempo Já Gasto na Vida
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Estimativas baseadas em médias populacionais
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-700 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-white">{metric.activity}</span>
              <span className={`font-bold ${metric.color}`}>
                {metric.years} anos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>
                <span className="text-gray-400">Horas:</span> {metric.hours.toLocaleString()}
              </div>
              <div>
                <span className="text-gray-400">Dias:</span> {metric.days.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-gray-900 border border-orange-500/20 rounded-lg">
          <p className="text-orange-400 text-sm font-semibold">
            💡 Reflexão: Você já passou {((sleepHours + workHours + eatingHours + socialMediaHours) / (ageInYears * 365 * 24) * 100).toFixed(1)}% 
            da sua vida apenas nessas 4 atividades básicas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
