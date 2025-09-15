import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, UserCheck, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface OfficerLoginProps {
  onBack: () => void;
  role: UserRole;
}

export function OfficerLogin({ onBack, role }: OfficerLoginProps) {
  const { t, language } = useLanguage();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t('messages.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('messages.invalidEmail'));
      return;
    }

    if (!password.trim()) {
      setError(t('messages.passwordRequired'));
      return;
    }

    if (password.length < 6) {
      setError(t('messages.passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      await login({
        type: 'email',
        email,
        password,
        role
      });
      toast.success(t('messages.loginSuccess'));
    } catch (err) {
      setError(t('messages.loginError'));
    } finally {
      setLoading(false);
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'officer':
        return t('auth.officer');
      case 'admin':
        return t('auth.admin');
      default:
        return role;
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'officer':
        return <UserCheck className="h-5 w-5 text-blue-600" />;
      case 'admin':
        return <UserCheck className="h-5 w-5 text-purple-600" />;
      default:
        return <UserCheck className="h-5 w-5" />;
    }
  };

  const getTestCredentials = () => {
    if (role === 'officer') {
      return {
        email: 'officer@agriculture.kerala.gov.in',
        password: 'password123'
      };
    }
    return {
      email: 'admin@agriculture.kerala.gov.in',
      password: 'password123'
    };
  };

  const testCreds = getTestCredentials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {getRoleIcon()}
                <CardTitle>{getRoleTitle()} {t('auth.login')}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit"
                className="w-full h-12"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('query.processing')}
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {t('auth.signIn')}
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm">
                  {t('auth.forgotPassword')}
                </Button>
              </div>
            </form>

            {/* Test credentials info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">
                {language === 'ml' ? 'പരീക്ഷണ ലോഗിൻ വിവരങ്ങൾ:' : 'Test Login Credentials:'}
              </h4>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">{testCreds.email}</code></p>
                <p><strong>Password:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">{testCreds.password}</code></p>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail(testCreds.email);
                    setPassword(testCreds.password);
                  }}
                >
                  {language === 'ml' ? 'ഉപയോഗിക്കുക' : 'Use These'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}