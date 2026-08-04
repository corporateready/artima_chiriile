const RUSSIAN_ROUTE = "/ru";

export function getConsentLocale(pathname = "") {
  return pathname === RUSSIAN_ROUTE || pathname.startsWith(`${RUSSIAN_ROUTE}/`)
    ? "ru"
    : "ro";
}

export const CONSENT_TRANSLATIONS = {
  ro: {
    regionLabel: "Consimțământ pentru cookie-uri",
    languageSelectorLabel: "Limba notificării despre cookie-uri",
    bannerTitle: "Acest site utilizează cookie-uri",
    bannerDescription:
      "Utilizăm cookie-uri pentru a personaliza conținutul și reclamele, pentru a oferi funcționalități pentru rețelele sociale și pentru a analiza traficul. De asemenea, partajăm informații despre utilizarea site-ului cu partenerii noștri de social media, publicitate și analiză.",
    deny: "Respinge",
    customize: "Personalizează",
    allowAll: "Acceptă toate",
    savePreferences: "Salvează preferințele",
    preferencesTitle: "Preferințe cookie-uri",
    close: "Închide",
    essentials: "Esențiale",
    essentialsDescription:
      "Necesare pentru funcționarea de bază a site-ului. Numărul de contact poate fi apelat fără cookie-uri.",
    alwaysActive: "Mereu active",
    analytics: "Analiză și performanță",
    analyticsDescription:
      "Ne ajută să înțelegem cum este utilizat site-ul și să atribuim apelurile prin înlocuirea dinamică a numărului (Google Analytics, PostHog, Roistat).",
    marketing: "Marketing și publicitate",
    marketingDescription:
      "Permit afișarea și măsurarea reclamelor relevante (Meta Pixel, LinkedIn Ads, Google Ads).",
  },
  ru: {
    regionLabel: "Согласие на использование cookie",
    languageSelectorLabel: "Язык уведомления о cookie",
    bannerTitle: "Этот сайт использует файлы cookie",
    bannerDescription:
      "Мы используем файлы cookie для персонализации контента и рекламы, предоставления функций социальных сетей и анализа трафика. Мы также делимся информацией об использовании сайта с нашими партнерами по социальным сетям, рекламе и аналитике.",
    deny: "Отклонить",
    customize: "Настроить",
    allowAll: "Принять все",
    savePreferences: "Сохранить настройки",
    preferencesTitle: "Настройки файлов cookie",
    close: "Закрыть",
    essentials: "Обязательные",
    essentialsDescription:
      "Необходимы для базовой работы сайта. Позвонить по контактному номеру можно без файлов cookie.",
    alwaysActive: "Всегда активны",
    analytics: "Аналитика и производительность",
    analyticsDescription:
      "Помогают понять, как используется сайт, и связать звонки с источником через динамическую подмену номера (Google Analytics, PostHog, Roistat).",
    marketing: "Маркетинг и реклама",
    marketingDescription:
      "Позволяют показывать и оценивать эффективную рекламу (Meta Pixel, LinkedIn Ads, Google Ads).",
  },
};
