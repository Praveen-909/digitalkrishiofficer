import { useState } from 'react';
import { LoginSelection } from './LoginSelection';
import { FarmerLogin } from './FarmerLogin';
import { OfficerLogin } from './OfficerLogin';
import { ProfileSetup } from './ProfileSetup';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../contexts/AuthContext';

type AuthStep = 'selection' | 'farmer-login' | 'officer-login' | 'admin-login' | 'profile-setup';

export function AuthWrapper() {
  const { user, isAuthenticated } = useAuth();
  const [authStep, setAuthStep] = useState<AuthStep>('selection');

  // If user is authenticated but hasn't completed profile setup
  if (isAuthenticated && user && !user.profileCompleted && user.role === 'farmer') {
    return <ProfileSetup />;
  }

  // If user is fully authenticated, don't show auth components
  if (isAuthenticated && user && user.profileCompleted) {
    return null;
  }

  const handleSelectUserType = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        setAuthStep('farmer-login');
        break;
      case 'officer':
        setAuthStep('officer-login');
        break;
      case 'admin':
        setAuthStep('admin-login');
        break;
    }
  };

  const handleBack = () => {
    setAuthStep('selection');
  };

  switch (authStep) {
    case 'farmer-login':
      return <FarmerLogin onBack={handleBack} />;
    
    case 'officer-login':
      return <OfficerLogin onBack={handleBack} role="officer" />;
    
    case 'admin-login':
      return <OfficerLogin onBack={handleBack} role="admin" />;
    
    default:
      return <LoginSelection onSelectUserType={handleSelectUserType} />;
  }
}