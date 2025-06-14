
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
      title: 'Oportunidade Digital',
      content: `Reduzindo apenas 1h de tela por dia, você pode ganhar ${(365 / 24).toFixed(0)} dias extras por ano para seus sonhos! 🌟`,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📚',
      title: 'Superpoder da Leitura',
      content: `Com apenas 15 min/dia de leitura, você pode absorver ${Math.floor((userProfile.lifeExpectancy - ageInYears) * 365 * 0.25 / 8)} livros incríveis até os ${userProfile.lifeExpectancy} anos! 🚀`,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💎',
      title: 'Valor do Seu Tempo',
      content: `Seu tempo é precioso! Cada escolha consciente de consumo significa mais liberdade para viver experiências únicas.`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '⚡',
      title: 'Energia Vital',
      content: `Você tem ${((1 - ageInYears / userProfile.lifeExpectancy) * 100).toFixed(1)}% de energia vital pela frente. Cada novo dia é uma página em branco! 📖`,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '😴',
      title: 'Investimento no Sono',
      content: `Dormir bem é seu segredo para uma vida mais longa e plena. Pode adicionar até ${(4 * 365).toLocaleString()} dias extras de qualidade! ✨`,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🎯',
      title: 'Magia dos Pequenos Passos',
      content: `Melhorias de apenas 1% ao dia se transformam em crescimento extraordinário de 37x ao ano. Você é mais poderoso do que imagina! 💪`,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: '🌱',
      title: 'Crescimento Contínuo',
      content: `Cada habilidade que você desenvolve hoje molda a pessoa incrível que você se tornará amanhã. O futuro está em suas mãos! 🙌`,
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: '❤️',
      title: 'Conexões Humanas',
      content: `O tempo investido em relacionamentos genuínos multiplica a felicidade. Cada conversa profunda é um tesouro! 💫`,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6 text-center">
        💡 Insights Inspiradores
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-600 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${insight.color} p-4 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="text-3xl mb-2 relative z-10">{insight.icon}</div>
                <h3 className="font-bold text-white text-lg relative z-10">{insight.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-200 text-sm leading-relaxed">
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
