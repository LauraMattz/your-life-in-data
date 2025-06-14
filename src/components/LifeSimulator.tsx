
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
    
    // Cálculos interessantes
    const booksRead = Math.floor(readingTimeAdded / 8); // assumindo 8h por livro
    const workoutSessions = Math.floor(exerciseTimeAdded / 1); // 1h por sessão
    const socialMediaDaysSaved = socialMediaTimeSaved / 24;
    const sleepDaysAdded = sleepTimeAdded / 24;

    return {
      socialMediaTimeSaved,
      socialMediaDaysSaved,
      booksRead,
      workoutSessions,
      sleepDaysAdded,
      totalProductiveHours: readingTimeAdded + exerciseTimeAdded
    };
  };

  const impact = calculateImpact();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          🔮 Simulador de Futuros Possíveis
        </CardTitle>
        <p className="text-gray-300">
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
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-4">
              ✨ Impacto até os {userProfile.lifeExpectancy} anos:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {changes.socialMediaReduction > 0 && (
                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-400">
                    {Math.floor(impact.socialMediaDaysSaved)}
                  </div>
                  <div className="text-sm text-gray-300">
                    dias livres sem redes sociais
                  </div>
                </div>
              )}

              {changes.readingIncrease > 0 && (
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">
                    {impact.booksRead}
                  </div>
                  <div className="text-sm text-gray-300">
                    livros lidos a mais
                  </div>
                </div>
              )}

              {changes.exerciseIncrease > 0 && (
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">
                    {impact.workoutSessions}
                  </div>
                  <div className="text-sm text-gray-300">
                    sessões de exercício
                  </div>
                </div>
              )}

              {changes.sleepImprovement > 0 && (
                <div className="bg-indigo-900/20 p-3 rounded border border-indigo-500/30">
                  <div className="text-2xl font-bold text-indigo-400">
                    {Math.floor(impact.sleepDaysAdded)}
                  </div>
                  <div className="text-sm text-gray-300">
                    dias extras de sono
                  </div>
                </div>
              )}
            </div>

            {impact.totalProductiveHours > 0 && (
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                <p className="text-yellow-300 font-semibold">
                  🎯 Total: {Math.floor(impact.totalProductiveHours).toLocaleString()} horas produtivas extras 
                  = {(impact.totalProductiveHours / 24).toFixed(1)} dias de vida mais rica!
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
