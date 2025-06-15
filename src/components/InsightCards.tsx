
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
      action: '🎯 Ação: Configure um limite diário no seu celular ou use o modo "não perturbe" por 1 hora.',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '📚',
      title: 'Conhecimento Acumulado',
      content: `Apenas <span class="text-green-400 font-bold">15 minutinhos</span> de leitura por dia podem resultar em <span class="text-green-400 font-bold">${Math.floor(daysRemainingThisYear * 0.25 / 8)} livros</span> até dezembro. Imagine o que você vai aprender!`,
      action: '🎯 Ação: Escolha um livro hoje e leia 1 página antes de dormir. Só isso!',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '⚡',
      title: 'Energia Restante',
      content: `Ainda temos <span class="text-yellow-400 font-bold">${((daysRemainingThisYear / totalDaysInYear) * 100).toFixed(1)}%</span> do ano pela frente, ${userProfile.name}! Cada amanhecer é uma página em branco esperando sua história.`,
      action: '🎯 Ação: Defina 1 objetivo pequeno para esta semana. Algo que você consegue fazer em 10 minutos por dia.',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '💤',
      title: 'Descanso Reparador',
      content: `Melhorar seu sono nos próximos <span class="text-purple-400 font-bold">${daysRemainingThisYear} dias</span> é investir na sua energia, humor e produtividade. Seu corpo agradece!`,
      action: '🎯 Ação: Durma 30 minutos mais cedo hoje. Configure um alarme para começar a rotina noturna.',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🎯',
      title: 'Evolução Constante',
      content: `O poder do <span class="text-orange-400 font-bold">1% melhor</span> por dia: nos próximos <span class="text-orange-400 font-bold">${daysRemainingThisYear} dias</span>, pequenas melhorias criam transformações extraordinárias.`,
      action: '🎯 Ação: Escolha 1 coisa que você quer melhorar e dedique apenas 5 minutos por dia a ela.',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: '🌱',
      title: 'Crescimento Pessoal',
      content: `Com <span class="text-emerald-400 font-bold">${daysRemainingThisYear} dias</span> à frente, você tem tempo de sobra para dominar uma nova habilidade. Que tal começar hoje mesmo?`,
      action: '🎯 Ação: Assista 1 vídeo no YouTube sobre algo que você sempre quis aprender. Agora mesmo!',
      color: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-gray-900/80 border-gray-700 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${insight.color} p-3 md:p-4 relative overflow-hidden group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300`}>
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full -translate-y-6 md:-translate-y-8 translate-x-6 md:translate-x-8 group-hover:bg-white/10 transition-all duration-300"></div>
                <div className="text-2xl md:text-3xl mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">{insight.icon}</div>
                <h3 className="font-bold text-white text-base md:text-lg relative z-10">{insight.title}</h3>
              </div>
              <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: insight.content }}>
                </p>
                <div className="bg-blue-900/20 border border-blue-500/30 p-2 rounded">
                  <p className="text-blue-200 text-xs font-medium">
                    {insight.action}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
