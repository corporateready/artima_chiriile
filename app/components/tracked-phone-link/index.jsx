"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  FALLBACK_PHONE_DISPLAY,
  FALLBACK_PHONE_HREF,
  formatContactPhone,
} from "@/lib/contact-phone";
import { loadConsent, subscribeToConsent } from "@/lib/consent";

const PHONE_UPDATED_EVENT = "artima:tracked-phone-updated";

function getAnalyticsConsentSnapshot() {
  return loadConsent()?.analytics === true;
}

function getServerAnalyticsConsentSnapshot() {
  return false;
}

function phoneLabelFromHref(href, label) {
  if ((label.match(/\d/g) ?? []).length >= 6) return label;
  return formatContactPhone(href.replace(/^tel:/i, ""));
}

function readDynamicPhone(anchor) {
  const href = anchor.getAttribute("href")?.trim() ?? "";

  if (!href.startsWith("tel:") || href === FALLBACK_PHONE_HREF) return null;

  return {
    href,
    label: phoneLabelFromHref(href, anchor.textContent?.trim() ?? ""),
  };
}

/**
 * @param {Omit<import("react").ComponentPropsWithoutRef<"a">, "href"> & {
 *   fallbackLabel?: string,
 *   labelMode?: "text" | "hidden" | "children"
 * }} props
 */
export default function TrackedPhoneLink({
  fallbackLabel = FALLBACK_PHONE_DISPLAY,
  labelMode = "text",
  children = null,
  ...props
}) {
  const anchorRef = useRef(null);
  const lastPublishedPhoneRef = useRef("");
  const analyticsAllowed = useSyncExternalStore(
    subscribeToConsent,
    getAnalyticsConsentSnapshot,
    getServerAnalyticsConsentSnapshot,
  );
  const fallbackPhone = useMemo(
    () => ({ href: FALLBACK_PHONE_HREF, label: fallbackLabel }),
    [fallbackLabel],
  );
  const [phone, setPhone] = useState(fallbackPhone);

  useEffect(() => {
    const applyFallbackPhone = () => {
      lastPublishedPhoneRef.current = "";
      const anchor = anchorRef.current;
      const expectedText = labelMode === "text" ? fallbackPhone.label : "";

      setPhone((currentPhone) =>
        currentPhone.href === fallbackPhone.href &&
        currentPhone.label === fallbackPhone.label
          ? currentPhone
          : fallbackPhone,
      );

      if (!anchor) return;
      if (anchor.getAttribute("href") !== fallbackPhone.href) {
        anchor.setAttribute("href", fallbackPhone.href);
      }
      if (labelMode !== "children" && anchor.textContent !== expectedText) {
        anchor.textContent = expectedText;
      }
    };

    const applyPhone = (nextPhone, publish) => {
      setPhone((currentPhone) =>
        currentPhone.href === nextPhone.href &&
        currentPhone.label === nextPhone.label
          ? currentPhone
          : nextPhone,
      );

      const phoneKey = `${nextPhone.href}|${nextPhone.label}`;
      if (publish && lastPublishedPhoneRef.current !== phoneKey) {
        lastPublishedPhoneRef.current = phoneKey;
        window.dispatchEvent(
          new CustomEvent(PHONE_UPDATED_EVENT, { detail: nextPhone }),
        );
      }
    };

    const syncFromAnchor = () => {
      if (!anchorRef.current) return;
      if (!analyticsAllowed) {
        applyFallbackPhone();
        return;
      }

      const dynamicPhone = readDynamicPhone(anchorRef.current);
      if (dynamicPhone) applyPhone(dynamicPhone, true);
    };

    const syncFromPage = () => {
      for (const element of document.querySelectorAll(
        'a[data-tracked-phone="true"]',
      )) {
        const dynamicPhone = readDynamicPhone(element);
        if (dynamicPhone) {
          applyPhone(dynamicPhone, false);
          return;
        }
      }
    };

    const handlePhoneUpdated = (event) => {
      if (event.detail) applyPhone(event.detail, false);
    };

    const observer = new MutationObserver(syncFromAnchor);
    if (anchorRef.current) {
      observer.observe(anchorRef.current, {
        attributes: true,
        attributeFilter: ["href"],
        childList: labelMode !== "children",
        characterData: labelMode !== "children",
        subtree: labelMode !== "children",
      });
    }

    if (!analyticsAllowed) {
      applyFallbackPhone();
      return () => observer.disconnect();
    }

    window.addEventListener(PHONE_UPDATED_EVENT, handlePhoneUpdated);
    syncFromAnchor();
    syncFromPage();

    const retryTimers = [500, 1500, 4000].map((delay) =>
      window.setTimeout(() => {
        syncFromAnchor();
        syncFromPage();
      }, delay),
    );

    return () => {
      observer.disconnect();
      window.removeEventListener(PHONE_UPDATED_EVENT, handlePhoneUpdated);
      retryTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [analyticsAllowed, fallbackPhone, labelMode]);

  const content =
    labelMode === "text" ? phone.label : labelMode === "children" ? children : null;

  return (
    <a
      {...props}
      ref={anchorRef}
      href={phone.href}
      aria-label={props["aria-label"] || (labelMode === "text" ? undefined : phone.label)}
      data-tracked-phone="true"
    >
      {content}
    </a>
  );
}
