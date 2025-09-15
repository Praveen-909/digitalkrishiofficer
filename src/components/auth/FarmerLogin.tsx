import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface FarmerLoginProps {
  onBack: () => void;
}

export function FarmerLogin({ onBack }: FarmerLoginProps) {
  const { t, language } = useLanguage();
  const { sendOtp, login } = useAuth();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const validatePhone = (phoneNumber: string): boolean => {
    // Indian phone number validation
    const phoneRegex = /^(\+91[\-\s]?)?([0]?(91)?)?[789]\d{9}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  const formatPhone = (phoneNumber: string): string => {
    // Format to +91 format if not already formatted
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10 && cleaned.startsWith('9') || cleaned.startsWith('8') || cleaned.startsWith('7')) {
      return `+91 ${cleaned}`;
    }
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    }
    return phoneNumber;
  };

  const handleSendOtp = async () => {
    setError('');
    
    if (!phone.trim()) {
      setError(t('messages.phoneRequired'));
      return;
    }

    if (!validatePhone(phone)) {
      setError(t('messages.invalidPhone'));
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = formatPhone(phone);
      await sendOtp(formattedPhone);
      setOtpSent(true);
      setStep('otp');
      toast.success(t('messages.otpSent', { phone: formattedPhone }));
    } catch (err) {
      setError(t('messages.loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    
    if (!otp.trim()) {
      setError(t('messages.invalidOtp'));
      return;
    }

    if (otp.length !== 6) {
      setError(t('messages.invalidOtp'));
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = formatPhone(phone);
      await login({
        type: 'phone',
        phone: formattedPhone,
        otp,
        role: 'farmer'
      });
      toast.success(t('messages.loginSuccess'));
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('expired')) {
          setError(t('messages.otpExpired'));
        } else {
          setError(t('messages.invalidOtp'));
        }
      } else {
        setError(t('messages.loginError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const formattedPhone = formatPhone(phone);
      await sendOtp(formattedPhone);
      toast.success(t('messages.otpSent', { phone: formattedPhone }));
    } catch (err) {
      setError(t('messages.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                <CardTitle>{t('auth.farmer')} {t('auth.login')}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'phone' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('auth.phonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-lg h-12"
                    dir="ltr"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t('language') === 'ml' 
                      ? 'ഉദാഹരണം: 9876543210 അല്ലെങ്കിൽ +91 9876543210'
                      : 'Example: 9876543210 or +91 9876543210'
                    }
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleSendOtp} 
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
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {t('auth.sendOtp')}
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <MessageSquare className="h-12 w-12 text-green-600 mx-auto" />
                  <h3 className="font-semibold">{t('auth.verifyOtp')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('messages.otpSent', { phone: formatPhone(phone) })}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">{t('auth.otpPlaceholder')}</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl h-14 tracking-widest"
                    maxLength={6}
                    dir="ltr"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Button 
                    onClick={handleVerifyOtp} 
                    className="w-full h-12"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('query.processing')}
                      </>
                    ) : (
                      t('auth.verifyOtp')
                    )}
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={handleResendOtp}
                    className="w-full"
                    disabled={loading}
                  >
                    {t('auth.resendOtp')}
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={() => setStep('phone')}
                    className="w-full"
                  >
                    {t('language') === 'ml' ? 'ഫോൺ നമ്പർ മാറ്റുക' : 'Change Phone Number'}
                  </Button>
                </div>
              </>
            )}

            {/* Debug info for testing */}
            {step === 'otp' && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  {language === 'ml' 
                    ? 'പരീക്ഷണത്തിനായി: കൺസോൾ ലോഗ് പരിശോധിച്ച് OTP കാണുക'
                    : 'For testing: Check console log for OTP'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}