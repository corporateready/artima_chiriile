"use client";

import React from "react";

// A Google Maps embed sends the visitor's IP to Google and can set cookies, so
// the iframe is only loaded after the visitor asks for the map.
const TEXT = {
  ro: {
    note: "Harta este furnizată de Google Maps. Când o încarci, Google primește adresa ta IP și poate seta cookie-uri.",
    show: "Afișează harta",
    open: "Deschide în Google Maps",
  },
  ru: {
    note: "Карта предоставляется Google Maps. При её загрузке Google получит ваш IP-адрес и может установить cookie.",
    show: "Показать карту",
    open: "Открыть в Google Maps",
  },
};

const ClickToLoadMap = ({ src, externalHref, lang = "ro" }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const text = TEXT[lang];

  if (isLoaded) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-[20rem] px-[24rem] text-center bg-[#e9e9e9]">
      <p className="max-w-[560rem] text-[18rem] leading-[140%] text-[#555]">
        {text.note}
      </p>
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        className="px-[32rem] py-[14rem] rounded-[35rem] text-[18rem] font-semibold text-white bg-gradient-to-r from-[#916527] to-[#daa22e]"
      >
        {text.show}
      </button>
      {externalHref && (
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[16rem] underline text-[#231f20]"
        >
          {text.open}
        </a>
      )}
    </div>
  );
};

export default ClickToLoadMap;
