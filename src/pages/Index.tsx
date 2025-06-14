
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/pages/Dashboard';
import { UserSetup } from '@/components/UserSetup';

const Index = () => {
  const [userProfile, setUserProfile] = useState(null);

  if (!userProfile) {
    return <UserSetup onProfileComplete={setUserProfile} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />
      <Dashboard userProfile={userProfile} />
    </div>
  );
};

export default Index;
