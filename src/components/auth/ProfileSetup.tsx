import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { User, MapPin, Sprout, ArrowRight, SkipForward } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function ProfileSetup() {
  const { t, language } = useLanguage();
  const { updateProfile, user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    panchayat: '',
    district: '',
    primaryCrops: [] as string[],
    landSize: '',
    experience: ''
  });

  const keralaCrops = {
    ml: [
      'നെല്ല്', 'വാഴ', 'തേങ്ങ', 'റബ്ബർ', 'കുരുമുളക്', 'ഏലം', 'കാപ്പി', 'തക്കാളി',
      'വഴുതന', 'ചേന', 'ചെറുപയർ', 'മുത്തിരവത്തി', 'പപ്പായ', 'മാവ്', 'അരയ്ക്കാ',
      'കാശുമാവ്', 'ഇഞ്ചി', 'മഞ്ഞൾ', 'കരിമ്പ്', 'പച്ചക്കറികൾ'
    ],
    en: [
      'Rice', 'Banana', 'Coconut', 'Rubber', 'Black Pepper', 'Cardamom', 'Coffee', 'Tomato',
      'Brinjal', 'Yam', 'Green Gram', 'Amaranthus', 'Papaya', 'Mango', 'Jackfruit',
      'Cashew', 'Ginger', 'Turmeric', 'Sugarcane', 'Vegetables'
    ]
  };

  const keralaDistricts = {
    ml: [
      'തിരുവനന്തപുരം', 'കൊല്ലം', 'പത്തനംതിട്ട', 'ആലപ്പുഴ', 'കൊട്ടയം', 'ഇടുക്കി',
      'എറണാകുളം', 'തൃശ്ശൂർ', 'പാലക്കാട്', 'മലപ്പുറം', 'കോഴിക്കോട്', 'വയനാട്',
      'കണ്ണൂർ', 'കാസർഗോഡ്'
    ],
    en: [
      'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki',
      'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad',
      'Kannur', 'Kasaragod'
    ]
  };

  const handleCropToggle = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(crop)
        ? prev.primaryCrops.filter(c => c !== crop)
        : [...prev.primaryCrops, crop]
    }));
  };

  const handleSave = () => {
    if (!user) return;

    const profileData = {
      ...formData,
      landSize: formData.landSize ? parseFloat(formData.landSize) : undefined,
      experience: formData.experience ? parseInt(formData.experience) : undefined,
      profileCompleted: true
    };

    updateProfile(profileData);
    toast.success(t('language') === 'ml' ? 'പ്രൊഫൈൽ സേവ് ചെയ്തു!' : 'Profile saved successfully!');
  };

  const handleSkip = () => {
    if (!user) return;
    updateProfile({ profileCompleted: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <User className="h-6 w-6 text-green-600" />
              {t('profile.setup')}
            </CardTitle>
            <p className="text-muted-foreground">
              {language === 'ml' 
                ? 'നിങ്ങളുടെ കൃഷി അനുഭവം മെച്ചപ്പെടുത്താൻ ഞങ്ങളെ സഹായിക്കുക'
                : 'Help us provide you with personalized farming guidance'
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <User className="h-4 w-4" />
                {t('profile.personalInfo')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('profile.name')}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={language === 'ml' ? 'നിങ്ങളുടെ പേര്' : 'Your full name'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">{t('profile.farmingExperience')}</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder={language === 'ml' ? 'വർഷങ്ങൾ' : 'Years'}
                    min="0"
                    max="60"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4" />
                {language === 'ml' ? 'സ്ഥാന വിവരങ്ങൾ' : 'Location Information'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">{t('profile.district')}</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ml' ? 'ജില്ല തിരഞ്ഞെടുക്കുക' : 'Select district'} />
                    </SelectTrigger>
                    <SelectContent>
                      {keralaDistricts[language].map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panchayat">{t('profile.panchayat')}</Label>
                  <Input
                    id="panchayat"
                    value={formData.panchayat}
                    onChange={(e) => setFormData(prev => ({ ...prev, panchayat: e.target.value }))}
                    placeholder={language === 'ml' ? 'പഞ്ചായത്ത് പേര്' : 'Panchayat name'}
                  />
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <Sprout className="h-4 w-4" />
                {t('profile.farmInfo')}
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="landSize">{t('profile.landSize')}</Label>
                <Input
                  id="landSize"
                  type="number"
                  value={formData.landSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))}
                  placeholder={language === 'ml' ? 'ഏക്കറിൽ' : 'In acres'}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-3">
                <Label>{t('profile.primaryCrops')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {keralaCrops[language].map((crop) => (
                    <div key={crop} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop}
                        checked={formData.primaryCrops.includes(crop)}
                        onCheckedChange={() => handleCropToggle(crop)}
                      />
                      <Label htmlFor={crop} className="text-sm cursor-pointer">
                        {crop}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'ml' 
                    ? 'നിങ്ങൾ കൃഷി ചെയ്യുന്ന പ്രധാന വിളകൾ തിരഞ്ഞെടുക്കുക'
                    : 'Select the main crops you grow'
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1 h-12">
                <ArrowRight className="mr-2 h-4 w-4" />
                {t('profile.save')}
              </Button>
              <Button variant="outline" onClick={handleSkip} className="h-12">
                <SkipForward className="mr-2 h-4 w-4" />
                {t('profile.skip')}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              {language === 'ml'
                ? 'ഈ വിവരങ്ങൾ നിങ്ങൾക്ക് മികച്ച കൃഷി ഉപദേശം നൽകാൻ സഹായിക്കും'
                : 'This information helps us provide better agricultural guidance'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}