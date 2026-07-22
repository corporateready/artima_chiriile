const RUSSIAN_ROUTE = "/ru";

export function getConsentLocale(pathname = "") {
  return pathname === RUSSIAN_ROUTE || pathname.startsWith(`${RUSSIAN_ROUTE}/`)
    ? "ru"
    : "ro";
}

export const CONSENT_TRANSLATIONS = {
  ro: {
    regionLabel: "Consimțământ pentru cookie-uri",
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
      "Necesare pentru funcționarea site-ului: urmărirea apelurilor și înlocuirea numărului de telefon.",
    alwaysActive: "Mereu active",
    analytics: "Analiză și performanță",
    analyticsDescription:
      "Ne ajută să înțelegem cum este utilizat site-ul (Google Analytics, PostHog).",
    marketing: "Marketing și publicitate",
    marketingDescription:
      "Permit afișarea și măsurarea reclamelor relevante (Meta Pixel, LinkedIn Ads, Google Ads).",
  },
  ru: {
    regionLabel: "Согласие на использование cookie",
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
      "Необходимы для работы сайта: отслеживание звонков и подмена номера телефона.",
    alwaysActive: "Всегда активны",
    analytics: "Аналитика и производительность",
    analyticsDescription:
      "Помогают нам понять, как используется сайт (Google Analytics, PostHog).",
    marketing: "Маркетинг и реклама",
    marketingDescription:
      "Позволяют показывать и оценивать эффективную рекламу (Meta Pixel, LinkedIn Ads, Google Ads).",
  },
};
