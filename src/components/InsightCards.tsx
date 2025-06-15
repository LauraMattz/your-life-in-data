
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
      title: 'Tempo de Qualidade',
      content: `Reduzindo <span class="text-blue-400 font-bold">1 hora</span> de tela por dia, você ganha <span class="text-blue-400 font-bold">${daysRemainingThisYear}</span> horas extras até o final do ano para fazer o que realmente importa.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '📚',
      title: 'Conhecimento Acumulado',
      content: `Apenas <span class="text-green-400 font-bold">15 minutinhos</span> de leitura por dia podem resultar em <span class="text-green-400 font-bold">${Math.floor(daysRemainingThisYear * 0.25 / 8)} livros</span> até dezembro. Imagine o que você vai aprender!`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '⚡',
      title: 'Energia Restante',
      content: `Ainda temos <span class="text-yellow-400 font-bold">${((daysRemainingThisYear / totalDaysInYear) * 100).toFixed(1)}%</span> do ano pela frente, ${userProfile.name}! Cada amanhecer é uma página em branco esperando sua história.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '💤',
      title: 'Descanso Reparador',
      content: `Melhorar seu sono nos próximos <span class="text-purple-400 font-bold">${daysRemainingThisYear} dias</span> é investir na sua energia, humor e produtividade. Seu corpo agradece!`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🎯',
      title: 'Evolução Constante',
      content: `O poder do <span class="text-orange-400 font-bold">1% melhor</span> por dia: nos próximos <span class="text-orange-400 font-bold">${daysRemainingThisYear} dias</span>, pequenas melhorias criam transformações extraordinárias.`,
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🌱',
      title: 'Crescimento Pessoal',
      content: `Com <span class="text-emerald-400 font-bold">${daysRemainingThisYear} dias</span> à frente, você tem tempo de sobra para dominar uma nova habilidade. Que tal começar hoje mesmo?`,
      color: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl relative z-10">💡</span>
          <span>Insights para Aproveitar {currentYear}</span>
        </div>
      </h2>
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Pequenas mudanças, grandes resultados. Veja como otimizar seus próximos meses:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-gray-900/80 border-gray-700 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${insight.color} p-4 relative overflow-hidden group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-white/10 transition-all duration-300"></div>
                <div className="text-3xl mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">{insight.icon}</div>
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
