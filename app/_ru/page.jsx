"use client";
import React from "react";
import styles from "../components/home-page/home.page.module.scss";
import Header from "../components/header-ru";
import FormPopupRu from "../components/form-popup-ru";
import Link from "next/link";
import useRudderStackAnalytics from "../useRudderAnalytics";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";


const PIXEL_ID = "1297393634749549";

const getClientIdFromGaCookie = () => {
  const gaCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_ga"));
  if (gaCookie) {
    const value = gaCookie.split("=")[1];
    const cid = value.split(".").slice(2).join(".");
    return cid;
  }
  return null;
};

export default function Page() {
   
   const eventIdGen = uuidv4();
   const formSubmittedEventId = uuidv4();

  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [phoneValue, setPhoneValue] = React.useState("+373");
  const [clientId, setClientId] = React.useState(null);

  const [userLocation, setUserLocation] = React.useState("");
  const [isEventId, setIsEventId] = React.useState("");
  const [isFBP, setIsFBP] = React.useState("");
  const [isFBC, setIsFBC] = React.useState("");
  const [isPageViewEventId, setIsPageViewEventId] = React.useState("");
  const [isFormSubmittedEventId, setIsFormSubmittedEventId] =
    React.useState("");
  const [isExternalId, setIsExternalId] = React.useState("");

  const [isIP, setIP] = React.useState(null);

  const analytics = useRudderStackAnalytics();

  React.useEffect(() => {
    setClientId(getClientIdFromGaCookie());
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
    setIsFormSubmittedEventId(formSubmittedEventId);
  };

  React.useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();
      if (locationData) {
        setUserLocation(locationData.city);
        setIP(locationData.ip);
      }
    };

    getClientLocation();
  }, []);

  React.useEffect(() => {
    const guid = uuidv4();
    if (guid) {
      setIsEventId(guid);
    }
  }, []);

  React.useEffect(() => {
    const pvei = localStorage.getItem("pageview_event_id");
    const ei = localStorage.getItem("external_id");

    if (typeof window !== "undefined") {
      setIsPageViewEventId(pvei);
      setIsExternalId(ei);
    }
  }, []);

  const formSubmitTrack = () => {
    analytics?.identify("form_submitted", {
      form_name: "скачать_PDF_презентацию",
      form_type: "click_form",
      form_location: "hero",
      element_location: "bottom_form",
      element_type: "button",
      element_text: "СКАЧАТЬ PDF-ПРЕЗЕНТАЦИЮ",
      action_type: "click",
      name: nameValue,
      phone: phoneValue,
      email: emailValue,
      location: userLocation,
      domain_source: "artima.md/ru",
    });

    analytics?.track("form_submitted", {
      form_name: "скачать_PDF_презентацию",
      form_type: "click_form",
      form_location: "hero",
      element_location: "bottom_form",
      element_type: "button",
      element_text: "СКАЧАТЬ PDF-ПРЕЗЕНТАЦИЮ",
      action_type: "click",
      name: nameValue,
      phone: phoneValue,
      email: emailValue,
      location: userLocation,
      domain_source: "artima.md/ru",
      fbp: isFBP,
      fbc: isFBC,
      eventID: isEventId,
      pageview_event_id: isPageViewEventId,
      external_id: isExternalId,
    });

    if (typeof window !== "undefined" && typeof window.fbq !== "undefined") {
      window.fbq(
        "track",
        "Lead",
        {},
        {
          eventID: isFormSubmittedEventId,
          fbc: isFBC,
          em: emailValue,
          ph: phoneValue,
          fn: nameValue,
          ct: userLocation,
          ip: isIP,
          pageview_event_id: isPageViewEventId,
          external_id: isExternalId,
        }
      );
    }

    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture("form_submitted", {
        fbc: isFBC,
        fbp: isFBP,
        email: emailValue,
        phone: phoneValue,
        name: nameValue,
        pageview_event_id: isPageViewEventId,
        external_id: isExternalId,
        form_submitted_event_id: isFormSubmittedEventId,
      });
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (!isOpen) {
        setNameValue("");
        setEmailValue("");
        setPhoneValue("");
      }
    }, [3000]);
  }, [nameValue, emailValue, phoneValue, isOpen]);

  React.useEffect(() => {
    const fbp = Cookies.get("_fbp");
    setIsEventId(eventIdGen);
    setIsFBP(fbp);
  }, []);

  React.useEffect(() => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("init", PIXEL_ID);
    }
    const fbc = Cookies.get("_fbc");
    setIsFBC(fbc);
  }, []);

  return (
    <div className="w-screen min-h-[100dvh] h-[100dvh] relative bg-black/90">
      <Header />
      <div className={styles.home__main}>
        <span className={styles.home__section__bg_shadow}></span>
        <span className={styles.home__section__bg_shadow__up}></span>
      </div>
      <p className={styles.bottom__text}>
        Ⓒ {new Date().getFullYear()} Все права защищены. Чтобы ознакомиться с
        положениями, перейдите по{" "}
        <Link href="https://anunturi.artima.md/"> ссылке.</Link>
      </p>
      <p className={styles.bottom__text_address}>
        ул. Каля Ешилор, 6А, MD-2069, Кишинев, Молдова
      </p>
      <div className={styles.bottom__links}>
        <Link href="/terms" as={"/terms"}>
          {" "}
          Условия и положения
        </Link>
        <Link href="/policy-privacy" as={"/policy-privacy"}>
          Политика конфиденциальности
        </Link>
      </div>

      <div className={styles.home__content}>
        <div className={styles.container}>
          <h1 className={styles.home__title_ru}>
            Купи новый офис сегодня {""}
            <br className="hidden sm:block" />и переезжай в него в этот же день
          </h1>
          <h4 className={styles.home__subtitle_ru}>
            <span className={styles.home__subtitle_ru__span}>
              Новый бизнес-центр,
            </span>{" "}
            открытый в сентябре 2024 года
          </h4>
          <button
            type="button"
            className={styles.home__PDF_btn}
            onClick={() => handleTogglePopup()}
          >
            СКАЧАТЬ PDF-ПРЕЗЕНТАЦИЮ
          </button>
          <p className={styles.bottom__text_mob}>
            Ⓒ {new Date().getFullYear()} Все права защищены. Чтобы ознакомиться
            с положениями, перейдите по
            <Link href="https://anunturi.artima.md/"> ссылке.</Link>
          </p>
          <p className={styles.bottom__text_mob__address}>
            ул. Каля Ешилор, 6А, MD-2069, Кишинев, Молдова
          </p>
          <div className={styles.bottom__links_mob}>
            <Link href="/terms" as="/terms">
              {" "}
              Условия и положения
            </Link>
            <Link href="/policy-privacy" as="/policy-privacy">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
        {isOpen && (
          <FormPopupRu
            handleTogglePopup={handleTogglePopup}
            formSubmitTrack={formSubmitTrack}
            nameValue={nameValue}
            setNameValue={setNameValue}
            emailValue={emailValue}
            setEmailValue={setEmailValue}
            phoneValue={phoneValue}
            setPhoneValue={setPhoneValue}
          />
        )}
      </div>
    </div>
  );
}
