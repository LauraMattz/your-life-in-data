
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/pages/Dashboard';
import { UserSetup } from '@/components/UserSetup';

const Index = () => {
  const [userProfile, setUserProfile] = useState(null);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <UserSetup onProfileComplete={setUserProfile} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <Navigation />
      <Dashboard userProfile={userProfile} />
      <Footer />
    </div>
  );
};

export default Index;
