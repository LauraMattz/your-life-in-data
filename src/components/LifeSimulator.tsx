
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

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          🔮 E se você começar hoje, {userProfile.name}?
        </CardTitle>
        <p className="text-slate-300">
          Simule pequenas mudanças e veja o impacto transformador até o final de {currentYear}. 
          Ainda temos <span className="text-blue-400 font-semibold">{daysRemainingThisYear} dias</span> pela frente!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-white font-semibold">
                📱 Menos redes sociais: {changes.socialMediaReduction}h/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">Mais tempo para o que importa de verdade</p>
              <Slider
                value={[changes.socialMediaReduction]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, socialMediaReduction: value[0] }))}
                max={5}
                step={0.5}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-white font-semibold">
                💪 Mais exercícios: {changes.exerciseIncrease}h/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">Energia e disposição para tudo</p>
              <Slider
                value={[changes.exerciseIncrease]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, exerciseIncrease: value[0] }))}
                max={3}
                step={0.25}
                className="mt-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white font-semibold">
                📚 Mais leitura: {changes.readingIncrease} min/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">Conhecimento que se acumula todo dia</p>
              <Slider
                value={[changes.readingIncrease]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, readingIncrease: value[0] }))}
                max={120}
                step={15}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-white font-semibold">
                😴 Sono de qualidade: +{changes.sleepImprovement}h/dia
              </Label>
              <p className="text-xs text-gray-400 mb-2">A base de tudo que você quer alcançar</p>
              <Slider
                value={[changes.sleepImprovement]}
                onValueChange={(value) => setChanges(prev => ({ ...prev, sleepImprovement: value[0] }))}
                max={3}
                step={0.5}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {(changes.socialMediaReduction > 0 || changes.exerciseIncrease > 0 || changes.readingIncrease > 0 || changes.sleepImprovement > 0) && (
          <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 p-6 rounded-lg border border-emerald-500/20">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              ✨ Olha só o que você conquistaria até dezembro:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {changes.socialMediaReduction > 0 && (
                <div className="bg-violet-900/20 p-3 rounded border border-violet-500/30">
                  <div className="text-2xl font-bold text-violet-400">
                    {impact.socialMediaDaysSaved.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-300">
                    dias livres das redes sociais
                  </div>
                </div>
              )}

              {changes.readingIncrease > 0 && (
                <div className="bg-cyan-900/20 p-3 rounded border border-cyan-500/30">
                  <div className="text-2xl font-bold text-cyan-400">
                    {impact.booksRead}
                  </div>
                  <div className="text-sm text-slate-300">
                    livros devorados até dezembro
                  </div>
                </div>
              )}

              {changes.exerciseIncrease > 0 && (
                <div className="bg-emerald-900/20 p-3 rounded border border-emerald-500/30">
                  <div className="text-2xl font-bold text-emerald-400">
                    {impact.exerciseDaysAdded.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-300">
                    dias inteiros se exercitando
                  </div>
                </div>
              )}

              {changes.sleepImprovement > 0 && (
                <div className="bg-indigo-900/20 p-3 rounded border border-indigo-500/30">
                  <div className="text-2xl font-bold text-indigo-400">
                    {impact.sleepDaysAdded.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-300">
                    dias extras de sono reparador
                  </div>
                </div>
              )}
            </div>

            {impact.totalProductiveDays > 0 && (
              <div className="mt-4 p-3 bg-amber-900/20 border border-amber-500/30 rounded">
                <p className="text-amber-300 font-semibold">
                  🎯 Total: {impact.totalProductiveDays.toFixed(1)} dias de vida mais rica e significativa até o fim de {currentYear}!
                </p>
                <p className="text-amber-200 text-sm mt-1">
                  {userProfile.name}, que tal começar hoje mesmo? Pequenos passos, grandes transformações.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
