import { useTranslation } from "react-i18next";
import React from "react";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language">
      {
        i18n.options.whitelist &&
        i18n.options.whitelist.filter(
          lang => (process.env.NODE_ENV !== "production" || lang !== "cimode")
        ).map(
          lang => <a href="#!"
            key={lang}
            onClick={(e) => { e.preventDefault(); changeLanguage(lang) }}
            className={i18n.language === lang || i18n.language.startsWith(lang + "-") ? 'active' : ''}>{lang}</a>
        )
      }
    </div>
  );
}
