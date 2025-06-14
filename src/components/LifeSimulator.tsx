
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

  const birthDate = new Date(userProfile.birthDate);
  const now = new Date();
  const ageInYears = now.getFullYear() - birthDate.getFullYear();
  const yearsRemaining = userProfile.lifeExpectancy - ageInYears;

  const calculateImpact = () => {
    const daysRemaining = yearsRemaining * 365;
    
    const socialMediaTimeSaved = changes.socialMediaReduction * daysRemaining; // horas
    const exerciseTimeAdded = changes.exerciseIncrease * daysRemaining; // horas
    const readingTimeAdded = (changes.readingIncrease / 60) * daysRemaining; // horas
    const sleepTimeAdded = changes.sleepImprovement * daysRemaining; // horas
    
    // Cálculos em anos
    const socialMediaYearsSaved = socialMediaTimeSaved / (24 * 365);
    const exerciseYearsAdded = exerciseTimeAdded / (24 * 365);
    const readingYearsAdded = readingTimeAdded / (24 * 365);
    const sleepYearsAdded = sleepTimeAdded / (24 * 365);
    
    // Cálculos interessantes
    const booksRead = Math.floor(readingTimeAdded / 8); // assumindo 8h por livro
    const workoutSessions = Math.floor(exerciseTimeAdded / 1); // 1h por sessão
    const totalProductiveYears = (readingTimeAdded + exerciseTimeAdded) / (24 * 365);

    return {
      socialMediaYearsSaved,
      exerciseYearsAdded,
      readingYearsAdded,
      sleepYearsAdded,
      booksRead,
      workoutSessions,
      totalProductiveYears
    };
  };

  const impact = calculateImpact();

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          🔮 Simulador de Futuros Possíveis
        </CardTitle>
        <p className="text-slate-300">
          "E se..." você começar a fazer mudanças hoje? Veja o impacto até os {userProfile.lifeExpectancy} anos.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-white font-semibold">
                📱 Reduzir Redes Sociais: {changes.socialMediaReduction}h/dia
              </Label>
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
                💪 Aumentar Exercícios: {changes.exerciseIncrease}h/dia
              </Label>
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
                📚 Aumentar Leitura: {changes.readingIncrease} min/dia
              </Label>
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
                😴 Melhorar Sono: +{changes.sleepImprovement}h/dia
              </Label>
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
              ✨ Impacto até os {userProfile.lifeExpectancy} anos:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {changes.socialMediaReduction > 0 && (
                <div className="bg-violet-900/20 p-3 rounded border border-violet-500/30">
                  <div className="text-2xl font-bold text-violet-400">
                    {impact.socialMediaYearsSaved.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-300">
                    anos livres sem redes sociais
                  </div>
                </div>
              )}

              {changes.readingIncrease > 0 && (
                <div className="bg-cyan-900/20 p-3 rounded border border-cyan-500/30">
                  <div className="text-2xl font-bold text-cyan-400">
                    {impact.booksRead}
                  </div>
                  <div className="text-sm text-slate-300">
                    livros lidos ({impact.readingYearsAdded.toFixed(1)} anos)
                  </div>
                </div>
              )}

              {changes.exerciseIncrease > 0 && (
                <div className="bg-emerald-900/20 p-3 rounded border border-emerald-500/30">
                  <div className="text-2xl font-bold text-emerald-400">
                    {impact.exerciseYearsAdded.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-300">
                    anos de exercício extra
                  </div>
                </div>
              )}

              {changes.sleepImprovement > 0 && (
                <div className="bg-indigo-900/20 p-3 rounded border border-indigo-500/30">
                  <div className="text-2xl font-bold text-indigo-400">
                    {impact.sleepYearsAdded.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-300">
                    anos extras de sono
                  </div>
                </div>
              )}
            </div>

            {impact.totalProductiveYears > 0 && (
              <div className="mt-4 p-3 bg-amber-900/20 border border-amber-500/30 rounded">
                <p className="text-amber-300 font-semibold">
                  🎯 Total: {impact.totalProductiveYears.toFixed(1)} anos de vida mais produtiva e saudável!
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
