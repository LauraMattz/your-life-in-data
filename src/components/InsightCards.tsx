
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
  const now = new Date();
  const currentYear = now.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  const daysRemainingThisYear = totalDaysInYear - dayOfYear;
  
  const insights = [
    {
      icon: '📱',
      title: 'Tempo Digital',
      content: `Uma hora a menos de tela por dia te daria <span class="text-orange-400 font-bold">${daysRemainingThisYear}</span> horas extras até o fim de ${currentYear} para fazer o que você ama.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '📚',
      title: 'Hábito da Leitura',
      content: `Com <span class="text-orange-400 font-bold">15 minutos</span> diários de leitura, você poderia ler cerca de <span class="text-orange-400 font-bold">${Math.floor(daysRemainingThisYear * 0.25 / 8)} livros</span> até o fim de ${currentYear}.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '⚡',
      title: 'Energia do Ano',
      content: `Você ainda tem <span class="text-orange-400 font-bold">${((daysRemainingThisYear / totalDaysInYear) * 100).toFixed(1)}%</span> do ano de ${currentYear} pela frente. Cada dia restante é uma nova oportunidade.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '😴',
      title: 'Qualidade do Sono',
      content: `Melhorar seu sono nos próximos <span class="text-orange-400 font-bold">${daysRemainingThisYear} dias</span> pode fazer toda a diferença no seu bem-estar até o fim do ano.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🎯',
      title: 'Pequenos Passos',
      content: `Melhorar <span class="text-orange-400 font-bold">1%</span> ao dia pelos próximos <span class="text-orange-400 font-bold">${daysRemainingThisYear} dias</span> resultará em um crescimento exponencial até o fim de ${currentYear}.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🌱',
      title: 'Desenvolvimento Pessoal',
      content: `Com <span class="text-orange-400 font-bold">${daysRemainingThisYear} dias</span> restantes em ${currentYear}, você tem tempo suficiente para desenvolver uma nova habilidade significativa.`,
      color: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl relative z-10">💡</span>
          <span>Insights para {currentYear}</span>
        </div>
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
