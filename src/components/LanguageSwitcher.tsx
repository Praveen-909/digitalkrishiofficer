import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className="flex items-center gap-1 cursor-pointer hover:bg-accent"
        onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
      >
        <Languages className="h-3 w-3" />
        {language === 'en' ? 'മലയാളം' : 'English'}
      </Badge>
    </div>
  );
}