"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
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

const DEFAULT_PREFS = { analytics: false, marketing: false };

function getConsentSnapshot() {
  return Boolean(loadConsent());
}

function getServerConsentSnapshot() {
  return true;
}

export default function ConsentManager() {
  const pathname = usePathname();
  const locale = getConsentLocale(pathname);
  const copy = CONSENT_TRANSLATIONS[locale];
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const hasConsent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [forceBannerVisible, setForceBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const bannerVisible = forceBannerVisible || !hasConsent;

  useEffect(() => {
    initializeConsentMode();
    const consent = loadConsent();

    if (consent) updateGTMConsent(consent);
    void applyAnalyticsConsent(consent?.analytics === true);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => {
      const consent = loadConsent();
      setPrefs(
        consent
          ? {
              analytics: consent.analytics,
              marketing: consent.marketing,
            }
          : DEFAULT_PREFS,
      );
      setForceBannerVisible(true);
      setModalOpen(true);
    };
    window.addEventListener("open-consent-manager", handleOpenModal);
    return () =>
      window.removeEventListener("open-consent-manager", handleOpenModal);
  }, []);

  const applyConsent = useCallback((newPrefs, eventName) => {
    saveConsent(newPrefs);
    updateGTMConsent(newPrefs);
    if (newPrefs.analytics) pushConsentEvent(eventName, newPrefs);
    void applyAnalyticsConsent(newPrefs.analytics);
    setForceBannerVisible(false);
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

  if (!bannerVisible) return null;

  return (
    <>
      {!modalOpen && (
        <div
          role="region"
          aria-label={copy.regionLabel}
          className="fixed bottom-1/2 left-1/2 z-[9999] h-dvh w-dvw -translate-x-1/2 translate-y-1/2 border-t border-white/[0.07] bg-[rgba(12,12,12,0.1)]"
        >
          <div
            className="absolute left-1/2 top-1/2 mx-auto flex h-[640rem] w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[20rem] bg-white pt-[60rem] pb-[30rem] sm:pb-[30rem] sm:top-1/2 sm:h-[260rem] sm:w-[800rem] sm:gap-0 rounded-none sm:rounded-[10rem] border-none"
          >
            <p className="text-black text-[15rem] m-0 flex-[1_1_280rem] font-[Inter,sans-serif] font-400 px-100 border-t border-black/[0.1] pt-[10rem] px-[20rem]">
              <b>{copy.bannerTitle}</b>
              <span className="inline-flex mt-40 leading-[150%]">
                {copy.bannerDescription}
              </span>
            </p>

            <div className="flex sm:w-full w-full shrink-0 flex-col sm:flex-row items-center gap-40 w-1120 border-t border-black/[0.1] pt-[10rem] sm:mt-[20rem] px-[20rem]">
              <BannerButton onClick={handleRejectAll} variant="ghost">
                {copy.deny}
              </BannerButton>
              <BannerButton onClick={() => setModalOpen(true)} variant="ghost">
                {copy.customize}
              </BannerButton>
              <BannerButton onClick={handleAcceptAll} variant="ghost">
                {copy.allowAll}
              </BannerButton>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.preferencesTitle}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[rgba(12,12,12,0.1)] p-[16rem]"
        >
          <div
            className="
              w-full sm:w-[400rem] rounded-[10rem] border-[1rem] border-none bg-white p-[32rem] font-['Inter',sans-serif] text-black/65"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "28px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {copy.preferencesTitle}
              </h2>
              <button
                aria-label={copy.close}
                onClick={() => setModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(0,0,0,0.95)",
                  cursor: "pointer",
                  fontSize: "18rem",
                  lineHeight: 1,
                  padding: "4rem 6rem",
                  borderRadius: "4rem",
                }}
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

            <div className="mt-[20rem] flex justify-center gap-32">
              <ModalButton onClick={handleRejectAll} variant="ghost">
                {copy.deny}
              </ModalButton>
              <ModalButton onClick={handleSavePrefs} variant="ghost">
                {copy.savePreferences}
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
        paddingBottom: last ? 0 : "20px",
        marginBottom: last ? 0 : "20px",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>{label}</p>
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
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
            fontSize: "11px",
            color: "black",
            whiteSpace: "nowrap",
            marginTop: "3px",
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
        background: checked
          ? "rgba(218, 162, 46, 0.2)"
          : "rgba(0,0,0,0.1)",
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
          height: "18rem ",
          borderRadius: "50%",
          background: checked ? "#DAA22E" : "#0e0e0e",
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
    padding: "10rem",
    borderRadius: "50rem",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
    transition: "opacity 0.15s",
    width: "100%",
  };
  const ghost = {
    background: "#DAA22E",
    fontWeight: 700,
    color: "#fff",
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
    fontSize: "16rem",
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    padding: "10rem",
    borderRadius: "35rem",
    letterSpacing: "0.01em",
    lineHeight: "130%"
  };
  const ghost = {
    background: "#DAA22E",
    border: "none",
    color: "#fff",
    width: "100%",
  };
  const primary = {
    background: "rgba(255,255,255,0.94)",
    border: "none",
    color: "#0e0e0e",
    fontWeight: 600,
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...(variant === "primary" ? primary : ghost) }}
      className="hover:opacity-90 transition-all duration-150"
    >
      {children}
    </button>
  );
}
