import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit3, Save, DollarSign, Info, Calculator, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
      startAge: 0,
      description: 'Baseado em 8h de sono por dia desde o nascimento'
    },
    {
      activity: '💼 Trabalhando',
      hours: dailyHours.work,
      data: calculateActivityTime(dailyHours.work, 18),
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-300',
      startAge: 18,
      description: 'Considerando início da vida profissional aos 18 anos'
    },
    {
      activity: '🍽️ Saboreando',
      hours: dailyHours.eating,
      data: calculateActivityTime(dailyHours.eating),
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-300',
      startAge: 0,
      description: 'Tempo dedicado às refeições desde o nascimento'
    },
    {
      activity: '📱 Conectado',
      hours: dailyHours.socialMedia,
      data: calculateActivityTime(dailyHours.socialMedia, 13),
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-300',
      startAge: 13,
      description: 'Redes sociais e internet, considerando início aos 13 anos'
    },
    {
      activity: '🚗 Em movimento',
      hours: dailyHours.commute,
      data: calculateActivityTime(dailyHours.commute, 16),
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-300',
      startAge: 16,
      description: 'Transporte e deslocamentos, considerando início aos 16 anos'
    },
    {
      activity: '💪 Se exercitando',
      hours: dailyHours.exercise,
      data: calculateActivityTime(dailyHours.exercise, 15),
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-300',
      startAge: 15,
      description: 'Atividades físicas regulares, considerando início aos 15 anos'
    }
  ];

  const workingYears = Math.max(0, ageInYears - 18);
  const hourlyWage = workingYears > 0 ? salary.monthly * 12 / (dailyHours.work * 22 * 12) : 0;

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 h-fit">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl relative z-10">📊</span>
                <span>Sua Jornada de Vida</span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-3">
              <p className="text-gray-300 text-sm flex items-center gap-1">
                <Calculator className="w-3 h-3" />
                Estimativas baseadas nos seus hábitos atuais
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 p-1">
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-600 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-blue-400">Como Calculamos Sua Jornada</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                      <h4 className="font-semibold text-blue-300 mb-2">📐 Fórmula Base</h4>
                      <p className="text-sm text-gray-300">
                        <strong>Anos de Vida = (Sua Idade - Idade de Início) × 365 dias × Horas por Dia ÷ (24h × 365 dias)</strong>
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-300">🔢 Exemplos de Cálculo:</h4>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>• <strong>Dormindo:</strong> {ageInYears} anos × 365 dias × 8h ÷ (24h × 365 dias) = {((ageInYears * 365 * 8) / (24 * 365)).toFixed(1)} anos</p>
                        <p>• <strong>Trabalhando:</strong> ({ageInYears} - 18) anos × 365 dias × 8h ÷ (24h × 365 dias) = {Math.max(0, ((ageInYears - 18) * 365 * 8) / (24 * 365)).toFixed(1)} anos</p>
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-500/30">
                      <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Importante</h4>
                      <p className="text-sm text-gray-300">
                        Estes são valores aproximados baseados em médias. Cada pessoa tem uma rotina única!
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            size="sm"
            className={`${
              isEditing 
                ? "bg-green-600 hover:bg-green-700 text-white border-green-500" 
                : "border-gray-500 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white"
            } min-w-[100px] font-medium transition-all duration-200`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-1" />
                Salvar
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-1" />
                Editar
              </>
            )}
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
            {salary.monthly > 0 && workingYears > 0 && (
              <div className="mt-3 p-2 bg-green-900/20 border border-green-500/30 rounded">
                <p className="text-green-200 text-xs">
                  💰 Cada hora vale {salary.currency} {hourlyWage.toFixed(2)} - seu tempo tem valor!
                </p>
                <p className="text-green-300 text-xs mt-1">
                  Cálculo: ({salary.currency} {salary.monthly}/mês × 12) ÷ ({dailyHours.work}h/dia × 22 dias × 12 meses)
                </p>
              </div>
            )}
            <div className="bg-gray-700/50 p-3 rounded border border-gray-600">
              <p className="text-xs text-gray-300 mb-2">
                💡 <strong>Ajuste as horas diárias para refletir melhor sua rotina:</strong>
              </p>
              <p className="text-xs text-gray-400">
                Os cálculos são atualizados automaticamente baseados na sua idade atual ({ageInYears} anos) e nas idades de início de cada atividade.
              </p>
            </div>
          </div>
        )}

        {metrics.map((metric, index) => (
          <div key={index} className={`bg-gradient-to-r ${metric.color} p-0.5 rounded-lg`}>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{metric.activity}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                        <Info className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-600 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-blue-400">{metric.activity}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <p className="text-gray-300">{metric.description}</p>
                        <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                          <h4 className="font-semibold text-blue-300 mb-2">🧮 Cálculo Detalhado:</h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <p>• <strong>Sua idade:</strong> {ageInYears} anos</p>
                            <p>• <strong>Idade de início:</strong> {metric.startAge} anos</p>
                            <p>• <strong>Anos ativos:</strong> {Math.max(0, ageInYears - metric.startAge)} anos</p>
                            <p>• <strong>Horas por dia:</strong> {metric.hours}h</p>
                            <p className="pt-2 border-t border-blue-500/30">
                              <strong>Total em anos:</strong> {Math.max(0, ageInYears - metric.startAge)} × {metric.hours}h ÷ 24h = {metric.data.years} anos
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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
                  <span className={`font-bold ${metric.textColor} text-lg`}>
                    {metric.data.years} anos
                  </span>
                </div>
              </div>
              {!isEditing && (
                <div className="mt-2 text-xs text-gray-500">
                  {metric.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
