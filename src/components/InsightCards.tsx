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
      content: `Uma hora a menos de tela por dia te daria ${(365 / 24).toFixed(0)} dias extras por ano para fazer o que você ama.`,
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: '📚',
      title: 'Hábito da Leitura',
      content: `Com 15 minutos diários de leitura, você poderia ler cerca de ${Math.floor((userProfile.lifeExpectancy - ageInYears) * 365 * 0.25 / 8)} livros até os ${userProfile.lifeExpectancy} anos.`,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '⚡',
      title: 'Energia Vital',
      content: `Você tem ${((1 - ageInYears / userProfile.lifeExpectancy) * 100).toFixed(1)}% da sua jornada pela frente. Cada dia é uma nova oportunidade.`,
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: '😴',
      title: 'Qualidade do Sono',
      content: `Um sono de qualidade pode adicionar anos saudáveis à sua vida. É um dos melhores investimentos que você pode fazer.`,
      color: 'from-indigo-500 to-violet-500'
    },
    {
      icon: '🎯',
      title: 'Pequenos Passos',
      content: `Melhorar 1% ao dia resulta em um crescimento de 37x ao final de um ano. A consistência é mais poderosa que a perfeição.`,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: '🌱',
      title: 'Desenvolvimento Pessoal',
      content: `Cada nova habilidade que você desenvolve se torna parte de quem você é. O aprendizado nunca para.`,
      color: 'from-emerald-400 to-green-500'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6 text-center">
        💡 Insights Inspiradores
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-600 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${insight.color} p-4 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="text-3xl mb-2 relative z-10">{insight.icon}</div>
                <h3 className="font-bold text-white text-lg relative z-10">{insight.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-slate-200 text-sm leading-relaxed">
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
