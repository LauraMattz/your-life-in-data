
import { Card, CardContent } from '@/components/ui/card';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface InsightCardsProps {
  userProfile: UserProfile;
}

export const InsightCards = ({ userProfile }: InsightCardsProps) => {
  const birthDate = new Date(userProfile.birthDate);
  const now = new Date();
  const ageInYears = now.getFullYear() - birthDate.getFullYear();
  
  const insights = [
    {
      icon: '📱',
      title: 'Tempo Digital',
      content: `Se você reduzir 1h de celular por dia, ganha ${(365 / 24).toFixed(0)} dias livres por ano.`,
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: '📚',
      title: 'Poder da Leitura',
      content: `Lendo apenas 15 min/dia, você pode ler ${Math.floor((userProfile.lifeExpectancy - ageInYears) * 365 * 0.25 / 8)} livros até os ${userProfile.lifeExpectancy} anos.`,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: '💰',
      title: 'Tempo vs Dinheiro',
      content: `Cada R$ 1.000 gastos representa cerca de ${(1000 / (2500 / (8 * 22))).toFixed(1)} dias de trabalho da sua vida.`,
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: '⏰',
      title: 'Urgência Saudável',
      content: `Você já viveu ${((ageInYears / userProfile.lifeExpectancy) * 100).toFixed(1)}% da sua vida. Cada dia importa mais agora.`,
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: '😴',
      title: 'Sono Importa',
      content: `Dormir bem pode adicionar 3-5 anos à sua vida. Isso são ${(4 * 365).toLocaleString()} dias extras!`,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      icon: '🎯',
      title: 'Micro-Hábitos',
      content: `Pequenas mudanças de 1% ao dia resultam em 37x de melhoria ao ano. Comece hoje!`,
      color: 'from-cyan-600 to-blue-600'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        💡 Insights Brutalmente Honestos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-r ${insight.color} p-4`}>
                <div className="text-3xl mb-2">{insight.icon}</div>
                <h3 className="font-bold text-white text-lg">{insight.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {insight.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
