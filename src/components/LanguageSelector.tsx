import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Text } from './Text';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-500 hover:bg-gray-500 transition-colors">
        <Globe className="w-4 h-4" />
<Text variant="c1" className="font-medium">
          {languages.find(lang => lang.code === i18n.language)?.flag}
        </Text>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
              i18n.language === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
<Text variant="p1" className="text-lg">{language.flag}</Text>
<Text variant="c1" className="font-medium">{language.name}</Text>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
