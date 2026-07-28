"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import {
  loadConsent,
  saveConsent,
  subscribeToConsent,
  updateGTMConsent,
  pushConsentEvent,
} from "../../../lib/consent";
import {
  applyAnalyticsConsent,
  initializeConsentMode,
} from "../../../lib/analytics";
import {
  CONSENT_TRANSLATIONS,
  getConsentLocale,
} from "./consent-translations";
import { Cookie } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/logo-artima-black.webp";
const DEFAULT_PREFS = { analytics: false, marketing: false };

function getConsentSnapshot() {
  return Boolean(loadConsent());
}

function getServerConsentSnapshot() {
  return true;
}

export default function ConsentManager() {
  const pathname = usePathname();
  const routeLocale = getConsentLocale(pathname);
  const [locale, setLocale] = useState(routeLocale);
  const copy = CONSENT_TRANSLATIONS[locale];
  const hasConsent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [consentReady, setConsentReady] = useState(false);
  const previousFocusRef = useRef(null);
  const dialogRef = useRef(null);
  const bannerVisible = !hasConsent;
  const ctaVisible = consentReady && hasConsent && !modalOpen;

  useEffect(() => {
    initializeConsentMode();
    const consent = loadConsent();

    if (consent) updateGTMConsent(consent);
    void applyAnalyticsConsent(consent?.analytics === true);
    setConsentReady(true);
  }, []);

  const openSettings = useCallback(() => {
    const consent = loadConsent();
    previousFocusRef.current = document.activeElement;
    setPrefs(
      consent
        ? {
            analytics: consent.analytics,
            marketing: consent.marketing,
          }
        : DEFAULT_PREFS,
    );
    setModalOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("open-consent-manager", openSettings);
    return () =>
      window.removeEventListener("open-consent-manager", openSettings);
  }, [openSettings]);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeSettings();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [closeSettings, modalOpen]);

  const applyConsent = useCallback((newPrefs, eventName) => {
    saveConsent(newPrefs);
    updateGTMConsent(newPrefs);
    if (newPrefs.analytics) pushConsentEvent(eventName, newPrefs);
    void applyAnalyticsConsent(newPrefs.analytics);
    setModalOpen(false);
  }, []);

  const handleAcceptAll = () =>
    applyConsent({ analytics: true, marketing: true }, "consent_accepted_all");

  const handleRejectAll = () =>
    applyConsent(
      { analytics: false, marketing: false },
      "consent_rejected_all",
    );

  const handleSavePrefs = () => applyConsent(prefs, "consent_saved_custom");

  return (
    <>
      {bannerVisible && !modalOpen && (
        <div
          role="region"
          aria-label={copy.regionLabel}
          lang={locale}
          className="fixed bottom-1/2 left-1/2 z-[9999] h-dvh w-dvw -translate-x-1/2 translate-y-1/2 border-t border-white/[0.07] bg-transparent"
        >
          <div
            className="absolute left-1/2 top-1/2 mx-auto flex h-auto w-[380rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-white sm:top-1/2 sm:w-[740rem] sm:gap-0 rounded-[10rem] border-none"
          >
            <div className="py-[6rem] sm:py-[1rem] w-full h-auto flex items-center justify-between pr-[20rem] sm:pr-[30rem] pl-[10rem] sm:sm:pl-[20rem]">
              <Image src={Logo} alt="artima dark logo" width={50} height={50} />
              <div
                role="group"
                aria-label={copy.languageSelectorLabel}
                className="flex gap-[20rem] relative z-0"
              >
                <span className="inline-flex w-[3rem] h-[3rem] rounded-full bg-slate-400 absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2"></span>
                <button
                  type="button"
                  lang="ro"
                  aria-pressed={locale === "ro"}
                  className={`text-[16rem] font-medium ${locale === "ro" ? "border-b border-b-orange-400" : "border-none"}`}
                  onClick={() => setLocale("ro")}
                >
                  RO
                </button>
                <button
                  type="button"
                  lang="ru"
                  aria-pressed={locale === "ru"}
                  className={`text-[16rem] font-medium ${locale === "ru" ? "border-b border-b-orange-400" : "border-none"}`}
                  onClick={() => setLocale("ru")}
                >
                  RU
                </button>
              </div>

            </div>
            <p className="text-black text-[15rem] m-0 font-[Inter,sans-serif] font-400 px-100 border-t border-black/[0.1] py-[20rem] px-[20rem] sm:px-[30rem]">
              <b>{copy.bannerTitle}</b>
              <span className="inline-flex mt-40 leading-[150%] text-[#646962]">
                {copy.bannerDescription}
              </span>
            </p>

            <div className="flex sm:w-full w-full shrink-0 flex-col sm:flex-row items-center gap-40 w-1120 border-t border-black/[0.1] py-[20rem] px-[20rem] sm:px-[30rem]">
              <BannerButton onClick={handleRejectAll} variant="ghost">
                {copy.deny}
              </BannerButton>
              <BannerButton onClick={openSettings} variant="ghost">
                {copy.customize}
              </BannerButton>
              <BannerButton onClick={handleAcceptAll} variant="ghost">
                {copy.allowAll}
              </BannerButton>
            </div>
          </div>
        </div>
      )}

      {ctaVisible && (
        <CookieCTA
          label={copy.preferencesTitle}
          onClick={openSettings}
        />
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-[16rem] backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSettings();
          }}
        >
          <div
            ref={dialogRef}
            id="cookie-settings-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            lang={locale}
            tabIndex={-1}
            className="max-h-[calc(100dvh-32rem)] w-full overflow-y-auto rounded-[12rem] border border-black/10 bg-white p-[24rem] font-['Inter',sans-serif] text-black shadow-[0_24rem_80rem_rgba(0,0,0,0.28)] outline-none sm:w-[520rem] sm:p-[32rem]"
          >
            <div className="mb-[24rem] flex items-center justify-between gap-[20rem]">
              <div className="flex items-center gap-[12rem]">
                <span className="flex h-[42rem] w-[42rem] shrink-0 items-center justify-center rounded-full bg-[#DAA22E]">
                  <Cookie color="#fff" size={21} strokeWidth={1.8} />
                </span>
                <h2
                  id="cookie-settings-title"
                  className="m-0 text-[18rem] font-semibold tracking-[-0.01em] text-black"
                >
                  {copy.preferencesTitle}
                </h2>
              </div>
              <button
                type="button"
                aria-label={copy.close}
                onClick={closeSettings}
                className="flex h-[36rem] w-[36rem] items-center justify-center rounded-full border border-black/10 bg-white text-[17rem] leading-none text-black transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA22E]"
              >
                ✕
              </button>
            </div>

            <ConsentRow
              label={copy.essentials}
              description={copy.essentialsDescription}
              alwaysActiveLabel={copy.alwaysActive}
              alwaysOn
            />

            <ConsentRow
              label={copy.analytics}
              description={copy.analyticsDescription}
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />

            <ConsentRow
              label={copy.marketing}
              description={copy.marketingDescription}
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              last
            />

            <div className="mt-[28rem] grid grid-cols-1 gap-[10rem] sm:grid-cols-3">
              <ModalButton onClick={handleRejectAll} variant="primary">
                {copy.deny}
              </ModalButton>
              <ModalButton onClick={handleSavePrefs} variant="primary">
                {copy.savePreferences}
              </ModalButton>
              <ModalButton onClick={handleAcceptAll} variant="primary">
                {copy.allowAll}
              </ModalButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ConsentRow({
  label,
  description,
  checked,
  onChange,
  alwaysOn,
  alwaysActiveLabel,
  last,
}) {
  return (
    <div
      style={{
        paddingBottom: last ? 0 : "20rem",
        marginBottom: last ? 0 : "20rem",
        borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: "14rem", fontWeight: 500 }}>{label}</p>
        <p
          style={{
            margin: "5rem 0 0",
            fontSize: "12rem",
            color: "black",
            lineHeight: "1.5",
          }}
        >
          {description}
        </p>
      </div>
      {alwaysOn ? (
        <span
          style={{
            fontSize: "11rem",
            color: "black",
            whiteSpace: "nowrap",
            marginTop: "3rem",
            flexShrink: 0,
          }}
        >
          {alwaysActiveLabel}
        </span>
      ) : (
        <Toggle ariaLabel={label} checked={checked} onChange={onChange} />
      )}
    </div>
  );
}

function Toggle({ ariaLabel, checked, onChange }) {
  return (
    <button
      role="switch"
      aria-label={ariaLabel}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: "42rem",
        height: "24rem",
        borderRadius: "12rem",
        border: "1rem solid rgba(0,0,0,0.18)",
        background: checked ? "rgba(218, 162, 46, 0.22)" : "#ece9e3",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.18s ease",
        outline: "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3rem",
          left: checked ? "21rem" : "3rem",
          width: "18rem",
          height: "18rem",
          borderRadius: "50%",
          background: checked ? "#DAA22E" : "#8b877f",
          transition: "left 0.18s ease, background 0.18s ease",
        }}
      />
    </button>
  );
}

function BannerButton({ onClick, variant, children }) {
  const base = {
    cursor: "pointer",
    fontSize: "15rem",
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    padding: "12rem",
    borderRadius: "50rem",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
    transition: "opacity 0.15s",
    width: "100%",
  };
  const ghost = {
    background: "#DAA22E",
    fontWeight: 600,
    color: "#3b2a0a",
  };
  const primary = {
    background: "rgba(255,255,255,0.94)",
    border: "none",
    color: "#fff",
    fontWeight: 700,
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...(variant === "primary" ? primary : ghost) }}
      className="hover:opacity-90"
    >
      {children}
    </button>
  );
}

function ModalButton({ onClick, variant, children }) {
  const base = {
    cursor: "pointer",
    fontSize: "13rem",
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    padding: "11rem 12rem",
    borderRadius: "35rem",
    letterSpacing: "0.01em",
    lineHeight: "130%",
    width: "100%",
  };
  const variants = {
    outline: {
      background: "#fff",
      border: "1rem solid rgba(0,0,0,0.14)",
      color: "#0e0e0e",
    },
    secondary: {
      background: "rgba(218,162,46,0.16)",
      border: "1rem solid rgba(218,162,46,0.28)",
      color: "#3b2a0a",
    },
    primary: {
    background: "#DAA22E",
    border: "none",
      color: "#3b2a0a",
    },
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      className="transition-all duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA22E]"
    >
      {children}
    </button>
  );
}

function CookieCTA({ label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      aria-controls="cookie-settings-dialog"
      title={label}
      onClick={onClick}
      className="fixed bottom-[10rem] left-[10rem] z-[9998] flex h-[50rem] w-[50rem] items-center justify-center rounded-full border border-black/10 bg-[#DAA22E] shadow-[0_8rem_24rem_rgba(0,0,0,0.22)] transition-transform duration-150 hover:scale-105 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DAA22E] sm:bottom-[50rem] sm:left-[50rem]"
    >
      <Cookie color="#fff" size={40} strokeWidth={1.8} />
    </button>
  );
}
