
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
      content: `Uma hora a menos de tela por dia te daria <span class="text-orange-400 font-bold">${(365 / 24).toFixed(0)} dias</span> extras por ano para fazer o que você ama.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '📚',
      title: 'Hábito da Leitura',
      content: `Com <span class="text-orange-400 font-bold">15 minutos</span> diários de leitura, você poderia ler cerca de <span class="text-orange-400 font-bold">${Math.floor((userProfile.lifeExpectancy - ageInYears) * 365 * 0.25 / 8)} livros</span> até os <span class="text-orange-400 font-bold">${userProfile.lifeExpectancy} anos</span>.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '⚡',
      title: 'Energia Vital',
      content: `Você tem <span class="text-orange-400 font-bold">${((1 - ageInYears / userProfile.lifeExpectancy) * 100).toFixed(1)}%</span> da sua jornada pela frente. Cada dia é uma nova oportunidade.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '😴',
      title: 'Qualidade do Sono',
      content: `Um sono de qualidade pode adicionar anos saudáveis à sua vida. É um dos melhores investimentos que você pode fazer.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🎯',
      title: 'Pequenos Passos',
      content: `Melhorar <span class="text-orange-400 font-bold">1%</span> ao dia resulta em um crescimento de <span class="text-orange-400 font-bold">37x</span> ao final de um ano. A consistência é mais poderosa que a perfeição.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🌱',
      title: 'Desenvolvimento Pessoal',
      content: `Cada nova habilidade que você desenvolve se torna parte de quem você é. O aprendizado nunca para.`,
      color: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-6 text-center">
        💡 Insights Inspiradores
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-gray-900/80 border-gray-700 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${insight.color} p-4 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="text-3xl mb-2 relative z-10">{insight.icon}</div>
                <h3 className="font-bold text-white text-lg relative z-10">{insight.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: insight.content }}>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
