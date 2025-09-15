import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Languages, User, UserCheck, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { UserRole } from '../../contexts/AuthContext';

interface LoginSelectionProps {
  onSelectUserType: (role: UserRole) => void;
}

export function LoginSelection({ onSelectUserType }: LoginSelectionProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 bg-primary rounded-2xl flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">DKO</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('app.title')}</h1>
            <p className="text-muted-foreground mt-2">{t('app.subtitle')}</p>
          </div>
        </div>

        {/* Language Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Languages className="h-5 w-5" />
              {t('language.select')}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant={language === 'ml' ? 'default' : 'outline'}
              onClick={() => setLanguage('ml')}
              className="h-12"
            >
              മലയാളം
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              className="h-12"
            >
              English
            </Button>
          </CardContent>
        </Card>

        {/* User Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t('auth.selectUserType')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Farmer Option */}
            <Button
              variant="outline"
              onClick={() => onSelectUserType('farmer')}
              className="w-full h-20 flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-950"
            >
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">{t('auth.farmer')}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ml' ? 'കൃഷി സംബന്ധിയായ സഹായത്തിനായി' : 'For agricultural guidance and support'}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {language === 'ml' ? 'ഫോൺ OTP' : 'Phone OTP'}
              </Badge>
            </Button>

            {/* Officer Option */}
            <Button
              variant="outline"
              onClick={() => onSelectUserType('officer')}
              className="w-full h-20 flex-col gap-2 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <div className="flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold">{t('auth.officer')}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ml' ? 'കർഷകരുടെ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകു��്നതിന്' : 'For assisting farmers and managing queries'}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {language === 'ml' ? 'ഇമെയിൽ/പാസ്‌വേഡ്' : 'Email/Password'}
              </Badge>
            </Button>

            {/* Admin Option */}
            <Button
              variant="outline"
              onClick={() => onSelectUserType('admin')}
              className="w-full h-20 flex-col gap-2 hover:bg-purple-50 dark:hover:bg-purple-950"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-600" />
                <div className="text-left">
                  <div className="font-semibold">{t('auth.admin')}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ml' ? 'സിസ്റ്റം മാനേജ്മെന്റിനും നിയന്ത്രണത്തിനും' : 'For system management and oversight'}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {language === 'ml' ? 'ഇമെയിൽ/പാസ്‌വേഡ്' : 'Email/Password'}
              </Badge>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            {language === 'ml' 
              ? 'കേരള സർക്കാർ | കൃഷി വകുപ്പ്' 
              : 'Government of Kerala | Department of Agriculture'
            }
          </p>
        </div>
      </div>
    </div>
  );
}