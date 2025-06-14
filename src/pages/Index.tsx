
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/pages/Dashboard';
import { UserSetup } from '@/components/UserSetup';

const Index = () => {
  const [userProfile, setUserProfile] = useState(null);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <Header />
        <UserSetup onProfileComplete={setUserProfile} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Header />
      <Navigation />
      <Dashboard userProfile={userProfile} />
      <Footer />
    </div>
  );
};

export default Index;
