
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/pages/Dashboard';
import { UserSetup } from '@/components/UserSetup';

interface UserProfile {
  name: string;
  birthDate: string;
  country: string;
  lifeExpectancy: number;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados salvos no localStorage quando o componente montar
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.log('Erro ao carregar perfil salvo:', error);
        localStorage.removeItem('userProfile');
      }
    }
    setIsLoading(false);
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    // Salvar no localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setUserProfile(profile);
  };

  const handleResetProfile = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-200">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <UserSetup onProfileComplete={handleProfileComplete} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <Navigation onResetProfile={handleResetProfile} />
      <Dashboard userProfile={userProfile} />
      <Footer />
    </div>
  );
};

export default Index;
