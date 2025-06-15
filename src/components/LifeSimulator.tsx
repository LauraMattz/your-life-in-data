
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

interface LifeSimulatorProps {
  userProfile: UserProfile;
}

export const LifeSimulator = ({ userProfile }: LifeSimulatorProps) => {
  const [changes, setChanges] = useState({
    socialMediaReduction: 0, // horas por dia reduzidas
    exerciseIncrease: 0, // horas por dia aumentadas
    readingIncrease: 0, // minutos por dia aumentados
    sleepImprovement: 0 // horas por dia aumentadas
  });

  const now = new Date();
  const currentYear = now.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  const daysRemainingThisYear = totalDaysInYear - dayOfYear;

  const calculateImpact = () => {
    const socialMediaTimeSaved = changes.socialMediaReduction * daysRemainingThisYear; // horas
    const exerciseTimeAdded = changes.exerciseIncrease * daysRemainingThisYear; // horas
    const readingTimeAdded = (changes.readingIncrease / 60) * daysRemainingThisYear; // horas
    const sleepTimeAdded = changes.sleepImprovement * daysRemainingThisYear; // horas
    
    // Cálculos em dias para o resto do ano
    const socialMediaDaysSaved = socialMediaTimeSaved / 24;
    const exerciseDaysAdded = exerciseTimeAdded / 24;
    const readingDaysAdded = readingTimeAdded / 24;
    const sleepDaysAdded = sleepTimeAdded / 24;
    
    // Cálculos interessantes
    const booksRead = Math.floor(readingTimeAdded / 8); // assumindo 8h por livro
    const workoutSessions = Math.floor(exerciseTimeAdded / 1); // 1h por sessão
    const totalProductiveDays = (readingTimeAdded + exerciseTimeAdded) / 24;

    return {
      socialMediaDaysSaved,
      exerciseDaysAdded,
      readingDaysAdded,
      sleepDaysAdded,
      booksRead,
      workoutSessions,
      totalProductiveDays
    };
  };

  const impact = calculateImpact();

  const hasAnyChanges = changes.socialMediaReduction > 0 || changes.exerciseIncrease > 0 || changes.readingIncrease > 0 || changes.sleepImprovement > 0;

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="space-y-3">
          <p className="text-slate-300 text-sm md:text-base px-2 md:px-0">
            <strong>Como usar:</strong> Mova os controles abaixo para simular pequenas mudanças na sua rotina. 
            Veja o impacto acumulado até dezembro de {currentYear}!
          </p>
          {!hasAnyChanges && (
            <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg">
              <p className="text-blue-200 text-xs md:text-sm">
                👆 <strong>Comece agora:</strong> Escolha pelo menos uma área para ajustar. Mesmo mudanças pequenas fazem diferença!
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-white font-semibold text-sm md:text-base">
                📱 Reduzir redes sociais: {changes.socialMediaReduction}h/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">👆 Mova para a direita para reduzir o tempo de tela</p>
              <Slider
                value={[changes.socialMediaReduction]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, socialMediaReduction: value[0] }))}
                max={5}
                step={0.5}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">💡 Dica: Comece com 30min (0.5h) por dia</p>
            </div>

            <div>
              <Label className="text-white font-semibold text-sm md:text-base">
                💪 Aumentar exercícios: {changes.exerciseIncrease}h/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">👆 Mova para definir quanto tempo a mais de atividade física</p>
              <Slider
                value={[changes.exerciseIncrease]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, exerciseIncrease: value[0] }))}
                max={3}
                step={0.25}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">💡 Dica: 15min (0.25h) de caminhada já ajuda muito</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white font-semibold text-sm md:text-base">
                📚 Aumentar leitura: {changes.readingIncrease} min/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">👆 Defina quantos minutos a mais de leitura por dia</p>
              <Slider
                value={[changes.readingIncrease]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, readingIncrease: value[0] }))}
                max={120}
                step={15}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">💡 Dica: 15 minutos antes de dormir é um ótimo começo</p>
            </div>

            <div>
              <Label className="text-white font-semibold text-sm md:text-base">
                😴 Melhorar sono: +{changes.sleepImprovement}h/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">👆 Quantas horas a mais de sono de qualidade</p>
              <Slider
                value={[changes.sleepImprovement]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, sleepImprovement: value[0] }))}
                max={3}
                step={0.5}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">💡 Dica: 30min (0.5h) mais cedo para dormir faz toda diferença</p>
            </div>
          </div>
        </div>

        {/* Results */}
        {hasAnyChanges && (
          <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 p-4 md:p-6 rounded-lg border border-emerald-500/20">
            <h3 className="text-lg md:text-xl font-bold text-emerald-400 mb-3 md:mb-4">
              ✨ Resultado da sua simulação até dezembro:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              {changes.socialMediaReduction > 0 && (
                <div className="bg-violet-900/20 p-3 rounded border border-violet-500/30">
                  <div className="text-xl md:text-2xl font-bold text-violet-400">
                    {impact.socialMediaDaysSaved.toFixed(1)}
                  </div>
                  <div className="text-xs md:text-sm text-slate-300">
                    dias livres das redes sociais
                  </div>
                </div>
              )}

              {changes.readingIncrease > 0 && (
                <div className="bg-cyan-900/20 p-3 rounded border border-cyan-500/30">
                  <div className="text-xl md:text-2xl font-bold text-cyan-400">
                    {impact.booksRead}
                  </div>
                  <div className="text-xs md:text-sm text-slate-300">
                    livros devorados até dezembro
                  </div>
                </div>
              )}

              {changes.exerciseIncrease > 0 && (
                <div className="bg-emerald-900/20 p-3 rounded border border-emerald-500/30">
                  <div className="text-xl md:text-2xl font-bold text-emerald-400">
                    {impact.exerciseDaysAdded.toFixed(1)}
                  </div>
                  <div className="text-xs md:text-sm text-slate-300">
                    dias inteiros se exercitando
                  </div>
                </div>
              )}

              {changes.sleepImprovement > 0 && (
                <div className="bg-indigo-900/20 p-3 rounded border border-indigo-500/30">
                  <div className="text-xl md:text-2xl font-bold text-indigo-400">
                    {impact.sleepDaysAdded.toFixed(1)}
                  </div>
                  <div className="text-xs md:text-sm text-slate-300">
                    dias extras de sono reparador
                  </div>
                </div>
              )}
            </div>

            {impact.totalProductiveDays > 0 && (
              <div className="mt-3 md:mt-4 p-3 bg-amber-900/20 border border-amber-500/30 rounded">
                <p className="text-amber-300 font-semibold text-sm md:text-base">
                  🎯 Total: {impact.totalProductiveDays.toFixed(1)} dias de vida mais rica e significativa até o fim de {currentYear}!
                </p>
                <p className="text-amber-200 text-xs md:text-sm mt-1">
                  <strong>Próximo passo:</strong> Escolha uma mudança e comece hoje, {userProfile.name}! 
                  Pequenos passos consistentes criam grandes transformações.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
