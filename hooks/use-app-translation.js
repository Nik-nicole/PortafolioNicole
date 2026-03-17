import { useTranslation } from 'react-i18next';

export const useAppTranslation = () => {
  const { t } = useTranslation();
  
  return {
    t,
    // Helper para HTML con dangerouslySetInnerHTML
    html: (key, options) => ({
      dangerouslySetInnerHTML: { __html: t(key, options) }
    }),
    // Helper para texto con formato
    format: (key, values) => t(key, { returnObjects: true, ...values })
  };
};
