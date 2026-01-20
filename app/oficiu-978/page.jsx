"use client";
import React from "react";
import styles from "./sale.module.scss";
import Header from "./sections/header";
import Clients from "./sections/our-clients";
import Multi from "./sections/multi";
import Area from "./sections/area";
import Parking from "./sections/parking";
import Business from "./sections/business/page";
import Panoramic from "./sections/panoramic/page";
import Location from "./sections/location/page";
import About from "./sections/about";
import Footer from "./sections/footer/page";
import Form from "./form-popup-oficiu";
import { motion } from "framer-motion";
import useRudderStackAnalytics from "../useRudderAnalytics";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
// import { useAnalytics } from "../../lib/posthog";

const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

const Page = () => {
  // const { track, identify, alias } = useAnalytics();
  const eventIdGen = uuidv4();
  const formSubmittedEventId = uuidv4();

  const analytics = useRudderStackAnalytics();

  const [isOpen, setIsOpen] = React.useState(false);

  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [phoneValue, setPhoneValue] = React.useState("");

  const [userLocation, setUserLocation] = React.useState("");
  const [isEventId, setIsEventId] = React.useState("");
  const [isFBP, setIsFBP] = React.useState("");
  const [isFBC, setIsFBC] = React.useState("");
  const [isPageViewEventId, setIsPageViewEventId] = React.useState("");
  const [isFormSubmittedEventId, setIsFormSubmittedEventId] =
    React.useState("");
  const [isExternalId, setIsExternalId] = React.useState("");

  const [isIP, setIP] = React.useState(null);

  React.useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();
      if (locationData) {
        setUserLocation(locationData.city)
        setIP(locationData.ip);
      }
    };

    getClientLocation();
  }, []);

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
    setIsFormSubmittedEventId(formSubmittedEventId);
  };

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
       form_name: "descarca_prezentare_pdf_ro",
       form_type: "click_form",
       form_location: "hero",
       element_location: "bottom_form",
       element_type: "button",
       element_text: "trimite",
       action_type: "click",
       name: nameValue,
       phone: phoneValue,
       email: emailValue,
       location: userLocation,
       domain_source: "artima.md/oficiu-978",
     });

     analytics?.track("form_submitted", {
       form_name: "descarca_prezentare_pdf_ro",
       form_type: "click_form",
       form_location: "hero",
       element_location: "bottom_form",
       element_type: "button",
       element_text: "trimite",
       action_type: "click",
       name: nameValue,
       phone: phoneValue,
       email: emailValue,
       location: userLocation,
       domain_source: "artima.md/oficiu-978",
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

  const [isItemToggle, setIsItemToggle] = React.useState(false);
  const [isSlideItem, setIsSlideItem] = React.useState(0);

  const businessCollection = [
    {
      id: 1,
      slideIcon: SlideIcon1(),
      slideTitle: ["Operațional din", <br />, " 1 septembrie 2024"],
      slideText: [
        "recent lansat beneficiază de",
        <br className="inline-block sm:hidden" />,
        " o",
        <br className="hidden sm:inline-block" />,
        " infrastructură modernă și",
        <br />,
        " eficientă",
      ],
    },
    {
      id: 2,
      slideIcon: SlideIcon2(),
      slideTitle: [
        "Poziționat strategic",
        <br className="inline-block sm:hidden" />,
        " la",
        <br className="hidden sm:inline-block" />,
        " 5 minute de",
        <br className="inline-block sm:hidden" />,
        " centru",
      ],
      slideText: [
        "amplasat pe str. Calea Ieșilor,",
        <br className="inline-block sm:hidden" />,
        " una",
        <br className="hidden sm:inline-block" />,
        " dintre cele mai importante",
        <br className="inline-block sm:hidden" />,
        " artere din Chișinău",
      ],
    },
    {
      id: 3,
      slideIcon: SlideIcon3(),
      slideTitle: [
        "Cantitate fără precedent a locurilor",
        <br className="inline-block sm:hidden" />,
        " de parcare",
      ],
      slideText: [
        "facilități de parcare cu opțiuni",
        <br />,
        " flexibile de plată  pentru",
        <br className="inline-block sm:hidden" />,
        " confortul",
        <br className="hidden sm:inline-block" />,
        " clienților și",
        <br className="inline-block sm:hidden" />,
        " angajaților",
      ],
    },
    {
      id: 4,
      slideIcon: SlideIcon4(),
      slideTitle: ["Management", <br />, " profesionist"],
      slideText: [
        "administrare și suport rapid prin",
        <br className="hidden sm:inline-block" />,
        " sistemul Artima",
        <br className="inline-block sm:hidden" />,
        " Helpdesk®,",
        <br className="hidden sm:inline-block" />,
        " garantând funcționalitate impecabilă",
      ],
    },
  ];
  const ourClientsLogosCollection = [
    {
      id: 8,
      slideLogo: SlideLogo8(),
    },
    {
      id: 9,
      slideLogo: SlideLogo9(),
    },
    {
      id: 10,
      slideLogo: SlideLogo10(),
    },
    {
      id: 11,
      slideLogo: SlideLogo11(),
    },
    {
      id: 12,
      slideLogo: SlideLogo12(),
    },
    {
      id: 7,
      slideLogo: SlideLogo7(),
    },
    {
      id: 0,
      slideLogo: SlideLogo1(),
    },
    {
      id: 13,
      slideLogo: SlideLogo13(),
    },
    {
      id: 14,
      slideLogo: SlideLogo14(),
    },
    {
      id: 15,
      slideLogo: SlideLogo15(),
    },
    {
      id: 16,
      slideLogo: SlideLogo16(),
    },
    {
      id: 6,
      slideLogo: SlideLogo6(),
    },
    {
      id: 17,
      slideLogo: SlideLogo17(),
    },
    {
      id: 3,
      slideLogo: SlideLogo3(),
    },
    {
      id: 1,
      slideLogo: SlideLogo2(),
    },
    {
      id: 4,
      slideLogo: SlideLogo4(),
    },
    {
      id: 5,
      slideLogo: SlideLogo5(),
    },
  ];
  const ourClientsLogosCollectionForMobile = [
    {
      id: 10,
      slideLogo: SlideLogo10(),
    },
    {
      id: 11,
      slideLogo: SlideLogo11(),
    },
    {
      id: 12,
      slideLogo: SlideLogo12(),
    },
    {
      id: 3,
      slideLogo: SlideLogo3(),
    },
    {
      id: 1,
      slideLogo: SlideLogo2(),
    },
    {
      id: 4,
      slideLogo: SlideLogo4(),
    },
    {
      id: 5,
      slideLogo: SlideLogo5(),
    },
    {
      id: 6,
      slideLogo: SlideLogo6(),
    },
    // ===8
    {
      id: 8,
      slideLogo: SlideLogo8(),
    },
    {
      id: 9,
      slideLogo: SlideLogo9(),
    },
    {
      id: 7,
      slideLogo: SlideLogo7(),
    },
    {
      id: 0,
      slideLogo: SlideLogo1(),
    },
    {
      id: 13,
      slideLogo: SlideLogo13(),
    },
    {
      id: 14,
      slideLogo: SlideLogo14(),
    },
    {
      id: 15,
      slideLogo: SlideLogo15(),
    },
    {
      id: 16,
      slideLogo: SlideLogo16(),
    },
    {
      id: 17,
      slideLogo: SlideLogo17(),
    },
  ];
  const businessCollectionForModal = [
    {
      id: 0,
      slideIcon: ModalSlideIcon1(),
      slideTitle: ["Operațional din", <br />, " 1 septembrie 2024"],
      slideText: [
        "recent lansat beneficiază de",
        <br className="inline-block sm:hidden" />,
        " o",
        <br className="hidden sm:inline-block" />,
        " infrastructură modernă și",
        <br />,
        " eficientă",
      ],
    },
    {
      id: 1,
      slideIcon: ModalSlideIcon2(),
      slideTitle: [
        "Poziționat strategic",
        <br className="inline-block sm:hidden" />,
        " la",
        <br className="hidden sm:inline-block" />,
        " 5 minute de",
        <br className="inline-block sm:hidden" />,
        " centru",
      ],
      slideText: [
        "amplasat pe str. Calea Ieșilor,",
        <br className="inline-block sm:hidden" />,
        " una",
        <br className="hidden sm:inline-block" />,
        " dintre cele mai importante",
        <br className="inline-block sm:hidden" />,
        " artere din Chișinău",
      ],
    },
    {
      id: 2,
      slideIcon: ModalSlideIcon3(),
      slideTitle: [
        "Cantitate fără precedent",
        <br />,
        " a locurilor",
        <br className="inline-block sm:hidden" />,
        " de parcare",
      ],
      slideText: [
        "facilități de parcare cu opțiuni",
        <br />,
        " flexibile de plată  pentru",
        <br className="inline-block sm:hidden" />,
        " confortul",
        <br className="hidden sm:inline-block" />,
        " clienților și",
        <br className="inline-block sm:hidden" />,
        " angajaților",
      ],
    },
    {
      id: 3,
      slideIcon: ModalSlideIcon4(),
      slideTitle: ["Management", <br />, " profesionist"],
      slideText: [
        "administrare și suport rapid prin",
        <br className="hidden sm:inline-block" />,
        " sistemul Artima",
        <br className="inline-block sm:hidden" />,
        " Helpdesk®,",
        <br className="hidden sm:inline-block" />,
        " garantând funcționalitate impecabilă",
      ],
    },
    {
      id: 4,
      slideIcon: ModalSlideIcon5(),
      slideTitle: ["Design laconic", <br />, " original"],
      slideText: [
        "proiect unic cu holuri elegante",
        <br className="inline-block sm:hidden" />,
        " și",
        <br className="hidden sm:inline-block" />,
        " finisaje de înaltă calitate ce definesc",
        <br className="hidden sm:inline-block" />,
        " un mediu de afaceri exclusiv",
      ],
    },

    {
      id: 5,
      slideIcon: ModalSlideIcon1(),
      slideTitle: ["Operațional din", <br />, " 1 septembrie 2024"],
      slideText: [
        "recent lansat beneficiază de",
        <br className="inline-block sm:hidden" />,
        " o",
        <br className="hidden sm:inline-block" />,
        " infrastructură modernă și",
        <br />,
        " eficientă",
      ],
    },
    {
      id: 6,
      slideIcon: ModalSlideIcon2(),
      slideTitle: [
        "Poziționat strategic",
        <br className="inline-block sm:hidden" />,
        " la",
        <br className="hidden sm:inline-block" />,
        " 5 minute de",
        <br className="inline-block sm:hidden" />,
        " centru",
      ],
      slideText: [
        "amplasat pe str. Calea Ieșilor,",
        <br className="inline-block sm:hidden" />,
        " una",
        <br className="hidden sm:inline-block" />,
        " dintre cele mai importante",
        <br className="inline-block sm:hidden" />,
        " artere din Chișinău",
      ],
    },
    {
      id: 7,
      slideIcon: ModalSlideIcon3(),
      slideTitle: [
        "Cantitate fără precedent",
        <br />,
        " a locurilor",
        <br className="inline-block sm:hidden" />,
        " de parcare",
      ],
      slideText: [
        "facilități de parcare cu opțiuni",
        <br />,
        " flexibile de plată  pentru",
        <br className="inline-block sm:hidden" />,
        " confortul",
        <br className="hidden sm:inline-block" />,
        " clienților și",
        <br className="inline-block sm:hidden" />,
        " angajaților",
      ],
    },
    {
      id: 8,
      slideIcon: ModalSlideIcon4(),
      slideTitle: ["Management", <br />, " profesionist"],
      slideText: [
        "administrare și suport rapid prin",
        <br className="hidden sm:inline-block" />,
        " sistemul Artima",
        <br className="inline-block sm:hidden" />,
        " Helpdesk®,",
        <br className="hidden sm:inline-block" />,
        " garantând funcționalitate impecabilă",
      ],
    },
    {
      id: 9,
      slideIcon: ModalSlideIcon5(),
      slideTitle: ["Design laconic", <br />, " original"],
      slideText: [
        "proiect unic cu holuri elegante",
        <br className="inline-block sm:hidden" />,
        " și",
        <br className="hidden sm:inline-block" />,
        " finisaje de înaltă calitate ce definesc",
        <br className="hidden sm:inline-block" />,
        " un mediu de afaceri exclusiv",
      ],
    },

    {
      id: 10,
      slideIcon: ModalSlideIcon1(),
      slideTitle: ["Operațional din", <br />, " 1 septembrie 2024"],
      slideText: [
        "recent lansat beneficiază de",
        <br className="inline-block sm:hidden" />,
        " o",
        <br className="hidden sm:inline-block" />,
        " infrastructură modernă și",
        <br />,
        " eficientă",
      ],
    },
    {
      id: 11,
      slideIcon: ModalSlideIcon2(),
      slideTitle: [
        "Poziționat strategic",
        <br className="inline-block sm:hidden" />,
        " la",
        <br className="hidden sm:inline-block" />,
        " 5 minute de",
        <br className="inline-block sm:hidden" />,
        " centru",
      ],
      slideText: [
        "amplasat pe str. Calea Ieșilor,",
        <br className="inline-block sm:hidden" />,
        " una",
        <br className="hidden sm:inline-block" />,
        " dintre cele mai importante",
        <br className="inline-block sm:hidden" />,
        " artere din Chișinău",
      ],
    },
    {
      id: 12,
      slideIcon: ModalSlideIcon3(),
      slideTitle: [
        "Cantitate fără precedent",
        <br />,
        " a locurilor",
        <br className="inline-block sm:hidden" />,
        " de parcare",
      ],
      slideText: [
        "facilități de parcare cu opțiuni",
        <br />,
        " flexibile de plată  pentru",
        <br className="inline-block sm:hidden" />,
        " confortul",
        <br className="hidden sm:inline-block" />,
        " clienților și",
        <br className="inline-block sm:hidden" />,
        " angajaților",
      ],
    },
    {
      id: 13,
      slideIcon: ModalSlideIcon4(),
      slideTitle: ["Management", <br />, " profesionist"],
      slideText: [
        "administrare și suport rapid prin",
        <br className="hidden sm:inline-block" />,
        " sistemul Artima",
        <br className="inline-block sm:hidden" />,
        " Helpdesk®,",
        <br className="hidden sm:inline-block" />,
        " garantând funcționalitate impecabilă",
      ],
    },
    {
      id: 14,
      slideIcon: ModalSlideIcon5(),
      slideTitle: ["Design laconic", <br />, " original"],
      slideText: [
        "proiect unic cu holuri elegante",
        <br className="inline-block sm:hidden" />,
        " și",
        <br className="hidden sm:inline-block" />,
        " finisaje de înaltă calitate ce definesc",
        <br className="hidden sm:inline-block" />,
        " un mediu de afaceri exclusiv",
      ],
    },

    {
      id: 15,
      slideIcon: ModalSlideIcon1(),
      slideTitle: ["Operațional din", <br />, " 1 septembrie 2024"],
      slideText: [
        "recent lansat beneficiază de",
        <br className="inline-block sm:hidden" />,
        " o",
        <br className="hidden sm:inline-block" />,
        " infrastructură modernă și",
        <br />,
        " eficientă",
      ],
    },
    {
      id: 16,
      slideIcon: ModalSlideIcon2(),
      slideTitle: [
        "Poziționat strategic",
        <br className="inline-block sm:hidden" />,
        " la",
        <br className="hidden sm:inline-block" />,
        " 5 minute de",
        <br className="inline-block sm:hidden" />,
        " centru",
      ],
      slideText: [
        "amplasat pe str. Calea Ieșilor,",
        <br className="inline-block sm:hidden" />,
        " una",
        <br className="hidden sm:inline-block" />,
        " dintre cele mai importante",
        <br className="inline-block sm:hidden" />,
        " artere din Chișinău",
      ],
    },
    {
      id: 17,
      slideIcon: ModalSlideIcon3(),
      slideTitle: [
        "Cantitate fără precedent",
        <br />,
        " a locurilor",
        <br className="inline-block sm:hidden" />,
        " de parcare",
      ],
      slideText: [
        "facilități de parcare cu opțiuni",
        <br />,
        " flexibile de plată  pentru",
        <br className="inline-block sm:hidden" />,
        " confortul",
        <br className="hidden sm:inline-block" />,
        " clienților și",
        <br className="inline-block sm:hidden" />,
        " angajaților",
      ],
    },
    {
      id: 18,
      slideIcon: ModalSlideIcon4(),
      slideTitle: ["Management", <br />, " profesionist"],
      slideText: [
        "administrare și suport rapid prin",
        <br className="hidden sm:inline-block" />,
        " sistemul Artima",
        <br className="inline-block sm:hidden" />,
        " Helpdesk®,",
        <br className="hidden sm:inline-block" />,
        " garantând funcționalitate impecabilă",
      ],
    },
    {
      id: 19,
      slideIcon: ModalSlideIcon5(),
      slideTitle: ["Design laconic", <br />, " original"],
      slideText: [
        "proiect unic cu holuri elegante",
        <br className="inline-block sm:hidden" />,
        " și",
        <br className="hidden sm:inline-block" />,
        " finisaje de înaltă calitate ce definesc",
        <br className="hidden sm:inline-block" />,
        " un mediu de afaceri exclusiv",
      ],
    },
  ];
  const handlerItemToggle = (slideId) => {
    setIsItemToggle(!isItemToggle);
    setIsSlideItem(slideId);
  };

  React.useEffect(() => {
    if (isOpen || isItemToggle) {
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 600) {
        document.body.style.paddingRight = "14rem";
        document.body.style.background = "#fafafa";
      }
    } else {
      document.body.style.overflow = "auto";
      if (window.innerWidth > 600) document.body.style.paddingRight = "0";
    }
  }, [isOpen, isItemToggle]);

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
    setIsFBC(fbc)
  }, []);

  return (
    <div className={styles.wrapper_page}>
      <div className={styles.sale_head}>
        <Header />
        <div className={styles.sale_head__content}>
          <div className={styles.sale_header__wrapper}>
            <h2 className={styles.head_content__title}>
              Oficiu exclusiv de vânzare
              <br /> <span>978 m²</span> cu reparație{" "}
              <p className={styles.current__word}>inclusă</p> cadou
            </h2>
            <p className={styles.head_content__subtitle}>
              Ultimul oficiu disponibil cu priveliște panoramică de 360°,
              <br className="hidden sm:inline-block" /> situat la prima linie{" "}
              {""}
              <br className="inline-block sm:hidden" />
              pe str. Calea Ieșilor
            </p>
            <p className={styles.head_content__subtitle_mobile}>
              Panoramă 360°, prima linie Calea Ieșilor
            </p>
            <button
              type="button"
              className={styles.sale_head__btn}
              onClick={handleTogglePopup}
            >
              descarcă prezentarea pdf
            </button>
            <p className="block text-[10rem] sm:text-[15rem] text-white text-center mt-[24rem] leading-none">
              4,8 evaluare clienți
            </p>
            <svg
              className="block mt-[12rem] w-[116rem] h-[22rem] sm:w-[156rem] sm:h-[26rem] mx-auto"
              viewBox="0 0 116 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4768 2.60145L12.0279 1.68954L11.5795 2.60167L8.9063 8.03894L2.92769 8.9128L1.92863 9.05883L2.65033 9.76493L6.97875 13.9999L5.95684 19.9768L5.78586 20.9768L6.68307 20.5033L12.0283 17.6821L17.3768 20.5033L18.2738 20.9765L18.1029 19.9768L17.081 13.9999L21.4094 9.76493L22.1311 9.05883L21.132 8.9128L15.1533 8.03892L12.4768 2.60145Z"
                fill="white"
                stroke="white"
              />
              <path
                d="M58.447 2.60145L57.9981 1.68954L57.5497 2.60167L54.8765 8.03894L48.8979 8.9128L47.8988 9.05883L48.6205 9.76493L52.949 13.9999L51.9271 19.9768L51.7561 20.9768L52.6533 20.5033L57.9985 17.6821L63.347 20.5033L64.244 20.9765L64.0731 19.9768L63.0512 13.9999L67.3796 9.76493L68.1013 9.05883L67.1022 8.9128L61.1235 8.03892L58.447 2.60145Z"
                fill="white"
                stroke="white"
              />
              <path
                d="M35.4621 2.60145L35.0133 1.68954L34.5648 2.60167L31.8917 8.03894L25.913 8.9128L24.914 9.05883L25.6357 9.76493L29.9641 13.9999L28.9422 19.9768L28.7712 20.9768L29.6684 20.5033L35.0136 17.6821L40.3621 20.5033L41.2592 20.9765L41.0882 19.9768L40.0663 13.9999L44.3947 9.76493L45.1164 9.05883L44.1174 8.9128L38.1386 8.03892L35.4621 2.60145Z"
                fill="white"
                stroke="white"
              />
              <path
                d="M81.4319 2.60145L80.983 1.68954L80.5346 2.60167L77.8614 8.03894L71.8828 8.9128L70.8837 9.05883L71.6054 9.76493L75.9338 13.9999L74.9119 19.9768L74.7409 20.9768L75.6382 20.5033L80.9833 17.6821L86.3318 20.5033L87.2289 20.9765L87.058 19.9768L86.036 13.9999L90.3645 9.76493L91.0862 9.05883L90.0871 8.9128L84.1083 8.03892L81.4319 2.60145Z"
                fill="white"
                stroke="white"
              />
              <path
                d="M104.417 2.5995L103.968 1.68759L103.52 2.59971L100.847 8.03698L94.8681 8.91085L93.8691 9.05687L94.5908 9.76298L98.9192 13.9979L97.8973 19.9749L97.7263 20.9749L98.6235 20.5013L103.969 17.6801L109.317 20.5014L110.214 20.9746L110.043 19.9749L109.021 13.9979L113.35 9.76298L114.072 9.05687L113.072 8.91085L107.094 8.03696L104.417 2.5995Z"
                stroke="white"
              />
              <path
                d="M108.075 8.56717V19.6493L103.97 17.597L97.8134 20.4702L99.0447 13.903L94.5298 8.97762L100.687 8.15672L103.97 2L106.843 7.74627L108.075 8.56717Z"
                fill="white"
                stroke="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <Clients
        businessCollection={ourClientsLogosCollection}
        ourClientsLogosCollectionForMobile={ourClientsLogosCollectionForMobile}
      />
      <Multi
        handlerItemToggle={handlerItemToggle}
        businessCollection={businessCollection}
        isItemToggle={isItemToggle}
      />
      <Area handleTogglePopup={handleTogglePopup} />
      <Parking />
      <Business />
      <Panoramic />
      <Location />
      <About handleTogglePopup={handleTogglePopup} />
      <Footer />
      {isOpen && (
        <Form
          handleTogglePopup={handleTogglePopup}
          formSubmitTrack={formSubmitTrack}
          nameValue={nameValue}
          setNameValue={setNameValue}
          emailValue={emailValue}
          setEmailValue={setEmailValue}
          phoneValue={phoneValue}
          setPhoneValue={setPhoneValue}
          userLocation={userLocation}
        />
      )}
      {isItemToggle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { ease: "easeInOut", duration: 0.3 },
          }}
          exit={{ opacity: 0 }}
          className="w-full h-full absolute top-0 left-0 z-[3] bg-gray-500/70"
          onClick={() => handlerItemToggle()}
        >
          {businessCollectionForModal.flatMap((slide) => {
            if (slide.id === isSlideItem) {
              return (
                <div
                  key={slide.id}
                  className={`${styles.multi_carousel__slide_modal}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {slide.slideIcon}
                  <p className={styles.slide_modal__title}>
                    {slide.slideTitle}
                  </p>
                  <p className={styles.slide_modal__text}>{slide.slideText}</p>
                </div>
              );
            }
          })}
        </motion.div>
      )}
    </div>
  );
};

const SlideIcon1 = () => {
  return (
    <svg
      className="w-[60rem] h-[60rem]"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.2193 37.0002C40.0352 36.4895 39.472 36.2247 38.9613 36.4088C38.4506 36.5928 38.1858 37.156 38.3699 37.6667C38.3744 37.6792 38.3792 37.6916 38.3842 37.704C39.2807 40.0435 39.3456 41.8324 38.5612 42.6188C37.6097 43.5683 35.2398 43.2715 32.2201 41.8265C28.1775 39.7274 24.5029 36.9853 21.3399 33.7074C13.6404 26.0069 10.4635 18.451 12.4284 16.4861C13.0554 15.9909 13.8704 15.8007 14.6519 15.9671C15.1932 16.0069 15.6644 15.6002 15.7042 15.0588C15.7427 14.5355 15.3634 14.0743 14.8426 14.011C13.4759 13.7692 12.0737 14.1676 11.0385 15.0922C7.437 18.6928 12.9425 28.0849 19.95 35.0933C23.27 38.529 27.1278 41.4006 31.3719 43.5949C32.1404 43.9629 32.9324 44.2797 33.7427 44.5434L26.7589 47.1915C17.4331 43.646 10.7197 35.3784 9.16404 25.5233C9.07988 24.987 8.57685 24.6204 8.04053 24.7045C7.50421 24.7887 7.13757 25.2917 7.22173 25.828C7.37606 26.811 7.58248 27.7939 7.83509 28.7553C10.0986 37.3314 16.0603 44.4559 24.1029 48.1961L12.6083 52.5456C12.5556 52.4577 12.4892 52.3788 12.4117 52.3117C9.49038 49.9662 7.65743 46.5265 7.33969 42.7938L6.8836 37.2706C6.84772 36.7355 6.38475 36.3307 5.84953 36.3666C5.83934 36.3674 5.82914 36.3681 5.81906 36.3692C5.27795 36.4122 4.87408 36.8859 4.91708 37.427C4.9172 37.4292 4.91745 37.4315 4.9177 37.4337L5.38165 42.955C5.72716 46.9449 7.58837 50.6506 10.5824 53.3104L2.38267 56.4145L3.85709 50.3635C3.98574 49.8358 3.66234 49.3037 3.13462 49.1751C2.6069 49.0464 2.07488 49.3698 1.94623 49.8976L0.0284975 57.7612C-0.100761 58.2884 0.221893 58.8207 0.749246 58.9498C0.942642 58.9972 1.14574 58.9847 1.33189 58.9142L37.7011 45.1528C37.7589 45.1246 37.8136 45.0903 37.8643 45.0506C38.6513 44.9297 39.3811 44.5658 39.9511 44.0097C40.925 43.0356 41.7635 41.0274 40.2193 37.0002Z"
        fill="url(#paint0_linear_338_134)"
      />
      <path
        d="M49.4955 34.4652C44.1818 32.476 38.4386 31.9183 32.8414 32.8483L29.3293 33.438C28.7962 33.5405 28.4471 34.0557 28.5496 34.5888C28.6486 35.1039 29.1346 35.4505 29.6537 35.3764L33.1648 34.7916C38.4214 33.9176 43.8154 34.4418 48.8055 36.3112C48.9162 36.3504 49.0331 36.3701 49.1505 36.3692C49.6934 36.3701 50.1342 35.9308 50.1351 35.3879C50.1358 34.9769 49.8807 34.6089 49.4955 34.4652Z"
        fill="url(#paint1_linear_338_134)"
      />
      <path
        d="M52.99 19.2363C52.7565 18.7461 52.17 18.5379 51.6797 18.7714L31.0378 28.6009C30.5476 28.8342 30.3394 29.4207 30.5727 29.9109L30.5728 29.9112C30.8061 30.4013 31.3926 30.6096 31.8828 30.3762L31.8831 30.3761L52.5251 20.5466C53.0153 20.3132 53.2235 19.7266 52.99 19.2363Z"
        fill="url(#paint2_linear_338_134)"
      />
      <path
        d="M23.8727 6.6713C23.7646 6.13927 23.2457 5.79561 22.7137 5.90373C22.1817 6.01186 21.838 6.53073 21.9461 7.06276C21.9484 7.07455 21.9512 7.08623 21.954 7.0979C23.1981 12.6564 22.6854 18.4641 20.4864 23.7186L19.0572 27.1481C18.8507 27.6478 19.0865 28.2205 19.5851 28.4299C19.7045 28.4802 19.8329 28.5058 19.9625 28.5056C20.3593 28.5056 20.7171 28.2672 20.8698 27.9011L22.3 24.4755C24.656 18.847 25.2056 12.6256 23.8727 6.6713Z"
        fill="url(#paint3_linear_338_134)"
      />
      <path
        d="M54.0651 35.3862C52.4364 35.3862 51.1162 36.7065 51.1162 38.3351C51.1162 39.9637 52.4364 41.2839 54.0651 41.2839C55.6937 41.2839 57.0139 39.9637 57.0139 38.3351C57.0139 36.7065 55.6937 35.3862 54.0651 35.3862ZM54.0651 39.318C53.5222 39.318 53.0821 38.8779 53.0821 38.3351C53.0821 37.7922 53.5222 37.3521 54.0651 37.3521C54.6079 37.3521 55.048 37.7922 55.048 38.3351C55.048 38.8779 54.6079 39.318 54.0651 39.318Z"
        fill="url(#paint4_linear_338_134)"
      />
      <path
        d="M30.4742 7.86359C28.8456 7.86359 27.5254 9.18381 27.5254 10.8124C27.5254 12.4411 28.8456 13.7613 30.4742 13.7613C32.1029 13.7613 33.4231 12.4411 33.4231 10.8124C33.4231 9.18381 32.1029 7.86359 30.4742 7.86359ZM30.4742 11.7954C29.9314 11.7954 29.4913 11.3553 29.4913 10.8124C29.4913 10.2696 29.9314 9.82949 30.4742 9.82949C31.0171 9.82949 31.4572 10.2696 31.4572 10.8124C31.4572 11.3553 31.0171 11.7954 30.4742 11.7954Z"
        fill="url(#paint5_linear_338_134)"
      />
      <path
        d="M21.6275 3.9318C22.7133 3.9318 23.5934 3.05164 23.5934 1.9659C23.5934 0.880164 22.7133 0 21.6275 0C20.5418 0 19.6616 0.880164 19.6616 1.9659C19.6616 3.05164 20.5418 3.9318 21.6275 3.9318Z"
        fill="url(#paint6_linear_338_134)"
      />
      <path
        d="M49.1504 4.91473C48.6076 4.91473 48.1675 5.35485 48.1675 5.89768V6.88064C48.1675 7.42347 48.6076 7.86359 49.1504 7.86359C49.6933 7.86359 50.1334 7.42347 50.1334 6.88064V5.89768C50.1334 5.35485 49.6933 4.91473 49.1504 4.91473Z"
        fill="url(#paint7_linear_338_134)"
      />
      <path
        d="M49.1504 0C48.6076 0 48.1675 0.440116 48.1675 0.982951V1.9659C48.1675 2.50874 48.6076 2.94885 49.1504 2.94885C49.6933 2.94885 50.1334 2.50874 50.1334 1.9659V0.982951C50.1334 0.440116 49.6933 0 49.1504 0Z"
        fill="url(#paint8_linear_338_134)"
      />
      <path
        d="M52.0992 2.94885H51.1163C50.5734 2.94885 50.1333 3.38897 50.1333 3.9318C50.1333 4.47464 50.5734 4.91475 51.1163 4.91475H52.0992C52.642 4.91475 53.0822 4.47464 53.0822 3.9318C53.0822 3.38897 52.642 2.94885 52.0992 2.94885Z"
        fill="url(#paint9_linear_338_134)"
      />
      <path
        d="M47.1847 2.94885H46.2017C45.6589 2.94885 45.2188 3.38897 45.2188 3.9318C45.2188 4.47464 45.6589 4.91475 46.2017 4.91475H47.1847C47.7275 4.91475 48.1676 4.47464 48.1676 3.9318C48.1676 3.38897 47.7275 2.94885 47.1847 2.94885Z"
        fill="url(#paint10_linear_338_134)"
      />
      <path
        d="M42.2699 10.7918H37.3345C36.7917 10.7918 36.3516 11.2319 36.3516 11.7748V16.7102C36.3516 17.253 36.7917 17.6931 37.3345 17.6931H42.2699C42.8127 17.6931 43.2529 17.253 43.2529 16.7102V11.7748C43.2529 11.2319 42.8127 10.7918 42.2699 10.7918ZM41.287 15.7272H38.3175V12.7577H41.287V15.7272Z"
        fill="url(#paint11_linear_338_134)"
      />
      <path
        d="M35.1089 19C34.748 18.6148 34.1474 18.5833 33.7484 18.9287L23.9189 27.7753C23.5156 28.1385 23.483 28.7598 23.8461 29.1632C24.2093 29.5665 24.8307 29.599 25.234 29.2359L35.0635 20.3894C35.4598 20.0182 35.4801 19.3962 35.1089 19Z"
        fill="url(#paint12_linear_338_134)"
      />
      <path
        d="M53.0821 22.6078C52.5392 22.6078 52.0991 23.048 52.0991 23.5908V24.5738C52.0991 25.1166 52.5392 25.5567 53.0821 25.5567C53.6249 25.5567 54.065 25.1166 54.065 24.5738V23.5908C54.065 23.048 53.6249 22.6078 53.0821 22.6078Z"
        fill="url(#paint13_linear_338_134)"
      />
      <path
        d="M57.2528 22.4388L56.5579 21.7439C56.1674 21.3667 55.5452 21.3775 55.168 21.768C54.8001 22.1489 54.8001 22.7528 55.168 23.1338L55.8629 23.8287C56.2534 24.2059 56.8756 24.1951 57.2528 23.8046C57.6208 23.4236 57.6208 22.8197 57.2528 22.4388Z"
        fill="url(#paint14_linear_338_134)"
      />
      <path
        d="M57.9972 18.6761H57.0142C56.4714 18.6761 56.0312 19.1162 56.0312 19.659C56.0312 20.2019 56.4714 20.642 57.0142 20.642H57.9972C58.54 20.642 58.9801 20.2019 58.9801 19.659C58.9801 19.1162 58.54 18.6761 57.9972 18.6761Z"
        fill="url(#paint15_linear_338_134)"
      />
      <path
        d="M57.2289 15.4893C56.848 15.1215 56.2441 15.1215 55.8631 15.4893L55.1682 16.1843C54.7843 16.5683 54.7845 17.1906 55.1684 17.5744C55.3527 17.7586 55.6026 17.8622 55.8631 17.8622C56.1239 17.8622 56.3738 17.7585 56.5581 17.5742L57.253 16.8792C57.6302 16.4888 57.6194 15.8664 57.2289 15.4893Z"
        fill="url(#paint16_linear_338_134)"
      />
      <path
        d="M53.0821 13.7613C52.5392 13.7613 52.0991 14.2014 52.0991 14.7442V15.7272C52.0991 16.27 52.5392 16.7101 53.0821 16.7101C53.6249 16.7101 54.065 16.27 54.065 15.7272V14.7442C54.065 14.2014 53.6249 13.7613 53.0821 13.7613Z"
        fill="url(#paint17_linear_338_134)"
      />
      <path
        d="M50.9965 16.1843L50.3015 15.4893C49.9111 15.1122 49.2889 15.1229 48.9116 15.5134C48.5438 15.8943 48.5438 16.4982 48.9116 16.8792L49.6066 17.5742C49.9971 17.9514 50.6193 17.9406 50.9965 17.5501C51.3645 17.1691 51.3645 16.5652 50.9965 16.1843Z"
        fill="url(#paint18_linear_338_134)"
      />
      <path
        d="M11.7499 4.25026C11.6342 3.89468 11.3267 3.63567 10.9567 3.58186L8.07175 3.16214L6.78506 0.548468C6.49829 0.0615387 5.87104 -0.100771 5.38411 0.186005C5.23446 0.274102 5.10975 0.398814 5.02165 0.548468L3.72907 3.16214L0.844106 3.58186C0.3068 3.65939 -0.0658612 4.15786 0.011669 4.69517C0.0425091 4.90908 0.143016 5.10678 0.297585 5.25779L2.38439 7.2925L1.89291 10.1657C1.79855 10.7003 2.15536 11.2102 2.68997 11.3045C2.90523 11.3425 3.12689 11.3077 3.32016 11.2056L5.90041 9.84522L8.48065 11.2017C8.96119 11.4543 9.55551 11.2696 9.80813 10.7891C9.90876 10.5978 9.94341 10.3787 9.90692 10.1657L9.41544 7.2925L11.5032 5.25779C11.7705 4.9962 11.8661 4.60572 11.7499 4.25026ZM7.66972 6.24565C7.43823 6.47112 7.33244 6.79598 7.38663 7.11458L7.6304 8.53495L6.35748 7.86359C6.07132 7.71332 5.7295 7.71332 5.44333 7.86359L4.1655 8.53396L4.40927 7.1136C4.46444 6.79623 4.36049 6.47185 4.13109 6.24565L3.09801 5.24009L4.52427 5.03269C4.84447 4.98625 5.12129 4.78511 5.26444 4.49502L5.90041 3.2044L6.53736 4.49502C6.68038 4.78486 6.95671 4.98588 7.27654 5.03269L8.70182 5.24009L7.66972 6.24565Z"
        fill="url(#paint19_linear_338_134)"
      />
      <path
        d="M55.6594 49.2704H55.6555L55.2505 48.663C52.9798 45.2672 49.4091 42.9583 45.3807 42.2807C44.8433 42.204 44.3454 42.5775 44.2688 43.1149C44.1947 43.6342 44.5413 44.1201 45.0563 44.219C47.9619 44.7122 50.6099 46.1884 52.5572 48.4005C50.92 48.695 49.4881 49.6784 48.6254 51.1007C47.5668 52.9967 48.2457 55.3918 50.1416 56.4504C52.0376 57.509 54.4327 56.8302 55.4914 54.9342C55.8957 54.1536 56.1141 53.29 56.1293 52.411C57.1751 53.93 57.2588 55.9137 56.3446 57.5154C56.0676 57.9823 56.2216 58.5854 56.6885 58.8623C57.1554 59.1393 57.7584 58.9853 58.0354 58.5184C58.0442 58.5034 58.0527 58.4883 58.0608 58.4728C59.8606 55.2581 58.8005 51.1959 55.6594 49.2704ZM53.7771 53.9748C53.2524 54.9255 52.0566 55.2707 51.106 54.7461C50.1555 54.2214 49.8101 53.0256 50.3348 52.075C50.3377 52.0698 50.3407 52.0644 50.3436 52.0591C50.9237 51.1093 51.9021 50.4726 53.0055 50.3271C53.1764 50.3224 53.3456 50.3618 53.4969 50.4411C54.3266 50.9041 54.3708 52.9113 53.7771 53.9748Z"
        fill="url(#paint20_linear_338_134)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_134"
          x1="44.8444"
          y1="68.0925"
          x2="7.93212"
          y2="67.8883"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_134"
          x1="52.1191"
          y1="37.1704"
          x2="32.7246"
          y2="36.5281"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_134"
          x1="55.1621"
          y1="32.8592"
          x2="34.8455"
          y2="32.6229"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_134"
          x1="25.0983"
          y1="33.0838"
          x2="20.0641"
          y2="33.0762"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_338_134"
          x1="57.5555"
          y1="42.4775"
          x2="52.2552"
          y2="42.4454"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_338_134"
          x1="33.9647"
          y1="14.9549"
          x2="28.6644"
          y2="14.9227"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_338_134"
          x1="23.9545"
          y1="4.72753"
          x2="20.421"
          y2="4.70608"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_338_134"
          x1="50.3139"
          y1="8.46038"
          x2="48.5471"
          y2="8.45323"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_338_134"
          x1="50.3139"
          y1="3.54564"
          x2="48.5471"
          y2="3.5385"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_338_134"
          x1="53.353"
          y1="5.31262"
          x2="50.7029"
          y2="5.28849"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_338_134"
          x1="48.4384"
          y1="5.31262"
          x2="45.7884"
          y2="5.28849"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_338_134"
          x1="43.8867"
          y1="19.0898"
          x2="37.6844"
          y2="19.0522"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_338_134"
          x1="36.4564"
          y1="31.6739"
          x2="25.8691"
          y2="31.6038"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_338_134"
          x1="54.2456"
          y1="26.1535"
          x2="52.4788"
          y2="26.1463"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_338_134"
          x1="57.771"
          y1="24.6384"
          x2="55.4013"
          y2="24.624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_338_134"
          x1="59.2509"
          y1="21.0398"
          x2="56.6009"
          y2="21.0157"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_338_134"
          x1="57.7722"
          y1="18.3982"
          x2="55.3919"
          y2="18.3838"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_338_134"
          x1="54.2456"
          y1="17.3069"
          x2="52.4788"
          y2="17.2998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_338_134"
          x1="51.5146"
          y1="18.3838"
          x2="49.145"
          y2="18.3694"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_338_134"
          x1="12.882"
          y1="13.6014"
          x2="2.27988"
          y2="13.5341"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_338_134"
          x1="60.2842"
          y1="62.3857"
          x2="47.0933"
          y2="62.3155"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const SlideIcon2 = () => {
  return (
    <svg
      className="w-[60rem] h-[60rem]"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9178 34.1306C9.90174 34.7333 9.21875 35.8409 9.21875 37.1055C9.21875 39.0117 10.7696 40.5625 12.6758 40.5625C14.178 40.5625 15.4589 39.599 15.9346 38.2578H24.8906C26.7968 38.2578 28.3477 39.8086 28.3477 41.7148C28.3477 43.6211 26.7968 45.1719 24.8906 45.1719H11.0625C7.88549 45.1719 5.30078 47.7566 5.30078 50.9336C5.30078 54.1106 7.88549 56.6953 11.0625 56.6953H22.5859C23.2224 56.6953 23.7383 56.1794 23.7383 55.543C23.7383 54.9065 23.2224 54.3906 22.5859 54.3906H11.0625C9.15629 54.3906 7.60547 52.8398 7.60547 50.9336C7.60547 49.0274 9.15629 47.4766 11.0625 47.4766H24.8906C28.0676 47.4766 30.6523 44.8919 30.6523 41.7148C30.6523 38.5378 28.0676 35.9531 24.8906 35.9531H15.9346C15.6621 35.1847 15.1253 34.5407 14.4338 34.1306L23.2352 19.6899C24.6197 17.6087 25.3516 15.1837 25.3516 12.6758C25.3516 5.68636 19.6652 0 12.6758 0C5.68636 0 0 5.68636 0 12.6758C0 15.1837 0.731853 17.6087 2.11639 19.6899L10.9178 34.1306ZM12.6758 38.2578C12.0404 38.2578 11.5234 37.7409 11.5234 37.1055C11.5234 36.4701 12.0404 35.9531 12.6758 35.9531C13.3112 35.9531 13.8281 36.4701 13.8281 37.1055C13.8281 37.7409 13.3112 38.2578 12.6758 38.2578ZM12.6758 2.30469C18.3944 2.30469 23.0469 6.95716 23.0469 12.6758C23.0469 14.7348 22.4445 16.7245 21.3051 18.43C21.2962 18.4433 21.2876 18.4567 21.2793 18.4705L12.6758 32.5866C12.6758 32.5866 4.05533 18.4433 4.04646 18.43C2.90702 16.7245 2.30469 14.7348 2.30469 12.6758C2.30469 6.95716 6.95716 2.30469 12.6758 2.30469Z"
        fill="url(#paint0_linear_338_198)"
      />
      <path
        d="M12.6758 18.4375C15.8528 18.4375 18.4375 15.8528 18.4375 12.6758C18.4375 9.49877 15.8528 6.91406 12.6758 6.91406C9.49877 6.91406 6.91406 9.49877 6.91406 12.6758C6.91406 15.8528 9.49877 18.4375 12.6758 18.4375ZM12.6758 9.21875C14.582 9.21875 16.1328 10.7696 16.1328 12.6758C16.1328 14.582 14.582 16.1328 12.6758 16.1328C10.7696 16.1328 9.21875 14.582 9.21875 12.6758C9.21875 10.7696 10.7696 9.21875 12.6758 9.21875Z"
        fill="url(#paint1_linear_338_198)"
      />
      <path
        d="M46.3242 19.1289C39.3348 19.1289 33.6484 24.8153 33.6484 31.8047C33.6484 34.3167 34.3826 36.7454 35.7715 38.8287L44.54 52.5831C43.8611 52.9939 43.3346 53.6318 43.0655 54.3906H32.957C32.3206 54.3906 31.8047 54.9065 31.8047 55.543C31.8047 56.1794 32.3206 56.6953 32.957 56.6953H43.0654C43.5411 58.0365 44.8219 59 46.3242 59C48.2304 59 49.7812 57.4492 49.7812 55.543C49.7812 54.2891 49.1102 53.1892 48.1085 52.5831L56.877 38.8287C58.2658 36.7454 59 34.3167 59 31.8047C59 24.8153 53.3136 19.1289 46.3242 19.1289ZM46.3242 56.6953C45.6888 56.6953 45.1719 56.1784 45.1719 55.543C45.1719 54.9076 45.6888 54.3906 46.3242 54.3906C46.9596 54.3906 47.4766 54.9076 47.4766 55.543C47.4766 56.1784 46.9596 56.6953 46.3242 56.6953ZM54.9535 37.5589C54.9491 37.5658 46.3242 51.0946 46.3242 51.0946C46.3242 51.0946 37.6994 37.5657 37.6949 37.5589C36.5555 35.8534 35.9531 33.8637 35.9531 31.8047C35.9531 26.0861 40.6056 21.4336 46.3242 21.4336C52.0428 21.4336 56.6953 26.0861 56.6953 31.8047C56.6953 33.8637 56.093 35.8534 54.9535 37.5589Z"
        fill="url(#paint2_linear_338_198)"
      />
      <path
        d="M46.3242 26.043C43.1472 26.043 40.5625 28.6277 40.5625 31.8047C40.5625 34.9817 43.1472 37.5664 46.3242 37.5664C49.5012 37.5664 52.0859 34.9817 52.0859 31.8047C52.0859 28.6277 49.5012 26.043 46.3242 26.043ZM46.3242 35.2617C44.418 35.2617 42.8672 33.7109 42.8672 31.8047C42.8672 29.8985 44.418 28.3477 46.3242 28.3477C48.2304 28.3477 49.7812 29.8985 49.7812 31.8047C49.7812 33.7109 48.2304 35.2617 46.3242 35.2617Z"
        fill="url(#paint3_linear_338_198)"
      />
      <path
        d="M27.7715 56.6953C28.4079 56.6953 28.9238 56.1794 28.9238 55.543C28.9238 54.9065 28.4079 54.3906 27.7715 54.3906C27.1351 54.3906 26.6191 54.9065 26.6191 55.543C26.6191 56.1794 27.1351 56.6953 27.7715 56.6953Z"
        fill="url(#paint4_linear_338_198)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_198"
          x1="33.4674"
          y1="68.1694"
          x2="5.91918"
          y2="68.079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_198"
          x1="19.4958"
          y1="20.7696"
          x2="9.13959"
          y2="20.7068"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_198"
          x1="61.4975"
          y1="67.0691"
          x2="37.0564"
          y2="66.968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_198"
          x1="53.1442"
          y1="39.8985"
          x2="42.788"
          y2="39.8357"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_338_198"
          x1="29.1355"
          y1="57.1617"
          x2="27.0642"
          y2="57.1492"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const SlideIcon3 = () => {
  return (
    <svg
      className="w-[60rem] h-[60rem]"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.5664 24.3145C37.5664 20.8197 34.7232 17.9766 31.2285 17.9766H22.5859C21.9496 17.9766 21.4336 18.4926 21.4336 19.1289V29.5C21.4336 30.1363 21.9496 30.6523 22.5859 30.6523H31.2285C34.7232 30.6523 37.5664 27.8092 37.5664 24.3145ZM23.7383 20.2812H31.2285C33.4524 20.2812 35.2617 22.0905 35.2617 24.3145C35.2617 26.5384 33.4524 28.3477 31.2285 28.3477H23.7383V20.2812Z"
        fill="url(#paint0_linear_338_204)"
      />
      <path
        d="M44.4805 24.3145C44.4805 17.0073 38.5356 11.0625 31.2285 11.0625H15.6719C15.0356 11.0625 14.5195 11.5785 14.5195 12.2148V46.7852C14.5195 47.4215 15.0356 47.9375 15.6719 47.9375H22.5859C23.2223 47.9375 23.7383 47.4215 23.7383 46.7852V37.5664H31.2285C38.5356 37.5664 44.4805 31.6216 44.4805 24.3145ZM22.5859 35.2617C21.9496 35.2617 21.4336 35.7777 21.4336 36.4141V45.6328H16.8242V13.3672H31.2285C37.2648 13.3672 42.1758 18.2781 42.1758 24.3145C42.1758 30.3508 37.2648 35.2617 31.2285 35.2617H22.5859Z"
        fill="url(#paint1_linear_338_204)"
      />
      <path
        d="M29.5 59C30.1364 59 30.6523 58.4841 30.6523 57.8477C30.6523 57.2112 30.1364 56.6953 29.5 56.6953C28.8636 56.6953 28.3477 57.2112 28.3477 57.8477C28.3477 58.4841 28.8636 59 29.5 59Z"
        fill="url(#paint2_linear_338_204)"
      />
      <path
        d="M54.3906 0H4.60938C2.06777 0 0 2.06777 0 4.60938V54.3906C0 56.9322 2.06777 59 4.60938 59H24.3145C24.9508 59 25.4668 58.484 25.4668 57.8477C25.4668 57.2113 24.9508 56.6953 24.3145 56.6953H4.60938C3.33857 56.6953 2.30469 55.6614 2.30469 54.3906V4.60938C2.30469 3.33857 3.33857 2.30469 4.60938 2.30469H54.3906C55.6614 2.30469 56.6953 3.33857 56.6953 4.60938V54.3906C56.6953 55.6614 55.6614 56.6953 54.3906 56.6953H22.6855C22.0492 56.6953 21.5332 57.2113 21.5332 57.8477C21.5332 58.484 22.0492 59 22.6855 59H54.3906C56.9322 59 59 56.9322 59 54.3906V4.60938C59 2.06777 56.9322 0 54.3906 0Z"
        fill="url(#paint3_linear_338_204)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_204"
          x1="39.048"
          y1="33.2177"
          x2="24.5497"
          y2="33.1057"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_204"
          x1="47.232"
          y1="55.4003"
          x2="20.3056"
          y2="55.2675"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_204"
          x1="30.864"
          y1="59.4664"
          x2="28.7928"
          y2="59.4539"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_204"
          x1="64.4184"
          y1="70.9405"
          x2="11.3947"
          y2="70.6187"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const SlideIcon4 = () => {
  return (
    <svg
      className="w-[60rem] h-[60rem]"
      viewBox="0 0 49 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.8069 32.6404C47.4204 35.4836 48.86 39.1652 48.86 43.0065V57.564C48.86 58.3574 48.2174 59 47.424 59H1.436C0.642612 59 0 58.3574 0 57.564V43.0065C0 39.1652 1.43959 35.4854 4.05312 32.6404C6.65049 29.815 10.1669 28.0703 13.9526 27.7256C14.5952 27.6664 15.2001 28.0469 15.4281 28.6519L18.0398 35.6272L19.9838 40.7322L21.0016 35.34L17.9877 29.7827C17.7472 29.3376 17.758 28.7991 18.0165 28.3629C18.2749 27.9285 18.7434 27.661 19.2496 27.661H29.605C30.1112 27.661 30.5797 27.9267 30.8382 28.3629C31.0967 28.7973 31.1074 29.3376 30.8669 29.7827L27.8531 35.34L28.8709 40.7322L30.8184 35.6201L33.4284 28.6519C33.6563 28.0451 34.2577 27.6682 34.9039 27.7256C38.6913 28.0703 42.2077 29.815 44.8051 32.6404H44.8069ZM22.775 56.1262L15.3545 36.6414L13.1412 30.7305C7.30387 31.7877 2.87201 36.9825 2.87201 43.0047V56.1262H22.775ZM24.43 52.4016L26.9215 45.8624L24.9416 35.3706C24.8806 35.0457 24.9326 34.71 25.0906 34.4192L27.1979 30.533H21.6657L23.773 34.4192C23.931 34.71 23.9831 35.0457 23.922 35.3706L21.9421 45.8624L24.4336 52.4016H24.43ZM45.988 43.0047C45.988 36.9825 41.5579 31.7877 35.7206 30.7305L33.5091 36.6342L26.085 56.1262H45.988V43.0047ZM24.43 0C31.7267 0 37.6646 5.93608 37.6646 13.2346C37.6646 20.5331 31.7285 26.4691 24.43 26.4691C17.1315 26.4691 11.1954 20.5313 11.1954 13.2346C11.1954 5.93788 17.1333 0 24.43 0ZM24.43 2.87201C18.7165 2.87201 14.0675 7.52107 14.0675 13.2346C14.0675 18.9481 18.7165 23.5971 24.43 23.5971C30.1435 23.5971 34.7926 18.9481 34.7926 13.2346C34.7926 7.52107 30.1435 2.87201 24.43 2.87201Z"
        fill="url(#paint0_linear_338_242)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_242"
          x1="53.3472"
          y1="70.9405"
          x2="9.43585"
          y2="70.7198"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const SlideIcon5 = () => {
  return (
    <svg
      className="w-[60rem] h-[60rem]"
      viewBox="0 0 68 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3013 13.5236H43.8856C44.6532 13.5236 45.2777 12.8991 45.2777 12.1315V1.39213C45.2777 0.624472 44.6532 0 43.8856 0H29.3013C28.5337 0 27.9092 0.624472 27.9092 1.39213V12.1315C27.9092 12.8991 28.5337 13.5236 29.3013 13.5236ZM29.8979 1.98876H43.289V11.5348H29.8979V1.98876Z"
        fill="url(#paint0_linear_338_319)"
      />
      <path
        d="M40.5708 3.31464H32.6158C31.8481 3.31464 31.2236 3.93911 31.2236 4.70677V8.81688C31.2236 9.58455 31.8481 10.209 32.6158 10.209H40.5708C41.3385 10.209 41.963 9.58455 41.963 8.81688V4.70677C41.963 3.93911 41.3385 3.31464 40.5708 3.31464ZM39.9742 8.22025H33.2124V5.3034H39.9742V8.22025Z"
        fill="url(#paint1_linear_338_319)"
      />
      <path
        d="M29.3013 35.9303H43.8856C44.6532 35.9303 45.2777 35.3059 45.2777 34.5382V16.6393C45.2777 15.8717 44.6532 15.2472 43.8856 15.2472H29.3013C28.5337 15.2472 27.9092 15.8717 27.9092 16.6393V34.5382C27.9092 35.3059 28.5337 35.9303 29.3013 35.9303ZM29.8979 17.236H43.289V33.9416H29.8979V17.236Z"
        fill="url(#paint2_linear_338_319)"
      />
      <path
        d="M48.3931 29.964H62.9774C63.745 29.964 64.3695 29.3396 64.3695 28.5719V19.6887C64.3695 19.1395 63.9244 18.6944 63.3751 18.6944C62.8258 18.6944 62.3808 19.1395 62.3808 19.6887V27.9753H48.9897V11.2696H62.3808V25.0483C62.3808 25.5976 62.8258 26.0427 63.3751 26.0427C63.9244 26.0427 64.3695 25.5976 64.3695 25.0483V10.673C64.3695 9.90536 63.745 9.28088 62.9774 9.28088H48.3931C47.6254 9.28088 47.001 9.90536 47.001 10.673V28.5719C47.001 29.3396 47.6254 29.964 48.3931 29.964Z"
        fill="url(#paint3_linear_338_319)"
      />
      <path
        d="M51.7081 12.5955C50.9404 12.5955 50.3159 13.22 50.3159 13.9877V25.2573C50.3159 26.025 50.9404 26.6495 51.7081 26.6495H59.6631C60.4308 26.6495 61.0552 26.025 61.0552 25.2573V13.9877C61.0552 13.22 60.4308 12.5955 59.6631 12.5955H51.7081ZM58.1113 14.5843L55.9126 17.6158L53.4168 14.5843H58.1113ZM52.3047 16.3622L54.706 19.2794L52.3047 22.5904V16.3622ZM59.0665 24.6607H53.2598L59.0665 16.6546V24.6607Z"
        fill="url(#paint4_linear_338_319)"
      />
      <path
        d="M66.2258 52.7686H63.1848L65.5517 42.8861C65.6705 42.3895 65.5574 41.8746 65.2411 41.4738C64.9248 41.0729 64.4505 40.8429 63.94 40.8429H63.7356C64.9135 39.2222 65.3525 37.1747 64.9078 35.1738C64.7904 34.6451 64.3728 34.2276 63.8444 34.1102C61.4752 33.5837 59.0374 34.292 57.3241 36.0053C56.9671 36.3623 56.6563 36.7524 56.3886 37.1652C56.1208 36.7521 55.8091 36.3624 55.4518 36.0053C53.7387 34.2923 51.3016 33.5837 48.9317 34.1102C48.4035 34.2276 47.986 34.6448 47.8681 35.1738C47.4235 37.1747 47.8625 39.2222 49.0404 40.8429H48.8361C48.3254 40.8429 47.8511 41.0728 47.5349 41.4738C47.2187 41.8746 47.1056 42.3895 47.2244 42.8861L49.5913 52.7686H25.3761C25.7252 52.1429 25.9796 51.4533 26.1151 50.716L26.1579 50.4829C26.2472 49.9975 26.1172 49.5018 25.8014 49.1225C25.4856 48.7434 25.0214 48.5259 24.528 48.5259H23.3981L26.0951 37.2655C26.214 36.7688 26.1008 36.254 25.7846 35.8531C25.4684 35.4521 24.9941 35.2221 24.4834 35.2221H21.3432C21.6229 34.5556 21.8854 33.8726 22.125 33.1725C23.6512 28.7115 24.1256 24.225 23.4607 20.5394C23.3708 20.0412 23.018 19.6302 22.5401 19.4666C22.0623 19.3031 21.5316 19.4119 21.1553 19.7508C20.2206 20.5925 19.3324 21.5849 18.5066 22.6999C18.2067 18.8029 17.2747 15.2297 15.8047 12.4372C15.5626 11.977 15.0898 11.6912 14.571 11.6912C14.0522 11.6912 13.5794 11.9769 13.3372 12.4371C11.8672 15.2297 10.9352 18.803 10.6352 22.6999C9.80951 21.5847 8.92133 20.5923 7.98661 19.7507C7.61034 19.4121 7.07987 19.303 6.6019 19.4666C6.12407 19.63 5.77126 20.0412 5.68137 20.5394C5.01646 24.225 5.49071 28.7115 7.01702 33.1725C7.2566 33.8726 7.51912 34.5556 7.79887 35.2221H4.65848C4.1479 35.2221 3.67365 35.452 3.35743 35.8529C3.04109 36.2539 2.92786 36.7687 3.04679 37.2653L5.74355 48.5259H4.6138C4.12032 48.5259 3.65628 48.7433 3.34046 49.1224C3.02465 49.5015 2.89458 49.9974 2.98381 50.4828L3.02663 50.716C3.16213 51.4535 3.4167 52.1429 3.76579 52.7686H1.6573C0.7434 52.7686 0 53.512 0 54.4259V57.3427C0 58.2566 0.7434 59 1.6573 59H59.7191C60.2684 59 60.7135 58.5549 60.7135 58.0056C60.7135 57.4563 60.2684 57.0112 59.7191 57.0112H1.98876V54.7573H65.8944V57.0112H54.3596C53.8103 57.0112 53.3652 57.4563 53.3652 58.0056C53.3652 58.5549 53.8103 59 54.3596 59H66.2258C67.1397 59 67.8831 58.2566 67.8831 57.3427V54.4259C67.8831 53.512 67.1397 52.7686 66.2258 52.7686ZM21.6635 22.0286C21.9867 25.1421 21.4858 28.897 20.2434 32.5286C19.9269 33.4538 19.5661 34.3545 19.17 35.222H15.2912C15.543 33.8892 15.8969 32.5358 16.3544 31.198C17.597 27.5663 19.5008 24.2917 21.6635 22.0286ZM14.5709 14.4612C15.8847 17.4729 16.6259 21.4048 16.6259 25.466C16.6259 25.5289 16.6243 25.5914 16.6239 25.6541C15.8397 27.0833 15.1488 28.636 14.5714 30.2754C13.994 28.6356 13.302 27.0834 12.5177 25.6541C12.5173 25.5913 12.5157 25.5289 12.5157 25.466C12.5158 21.4048 13.2571 17.4729 14.5709 14.4612ZM7.47828 22.0286C9.64087 24.2917 11.5448 27.5665 12.7872 31.1982C13.0837 32.0647 13.3364 32.9379 13.5468 33.8078C13.4387 34.2818 13.3449 34.7531 13.2617 35.222H9.9718C9.57563 34.3545 9.215 33.4538 8.89839 32.5286C7.65595 28.8968 7.15491 25.1424 7.47828 22.0286ZM22.923 52.7686H6.21873C5.63245 52.1572 5.20539 51.3862 5.01447 50.5146H21.982C22.5312 50.5146 22.9764 50.0695 22.9764 49.5202C22.9764 48.9709 22.5312 48.5259 21.982 48.5259H7.78866L5.07864 37.2108H24.0631L21.3531 48.5259H19.6225C19.0733 48.5259 18.6281 48.9709 18.6281 49.5202C18.6281 50.0695 19.0733 50.5146 19.6225 50.5146H24.1272C23.9364 51.3862 23.5092 52.1572 22.923 52.7686ZM58.7305 37.4116C59.8695 36.2723 61.4553 35.7522 63.0357 35.9823C63.2658 37.5627 62.7456 39.1486 61.6066 40.2876C61.4008 40.4934 61.18 40.6783 60.9477 40.8429H57.25C57.2848 39.5655 57.8017 38.3402 58.7305 37.4116ZM49.7401 35.9823C51.3202 35.7524 52.9063 36.2724 54.0455 37.4116C54.7015 38.0676 55.1509 38.8721 55.3713 39.738C55.3062 40.1013 55.2707 40.4706 55.2634 40.8429H51.8272C51.5952 40.6785 51.3749 40.4931 51.1693 40.2876C50.0301 39.1483 49.5099 37.5623 49.7401 35.9823ZM51.6361 52.7686L49.2563 42.8316H63.5197L61.1398 52.7686H51.6361Z"
        fill="url(#paint5_linear_338_319)"
      />
      <path
        d="M40.5708 18.5618H32.6158C31.8481 18.5618 31.2236 19.1862 31.2236 19.9539V31.2236C31.2236 31.9912 31.8481 32.6157 32.6158 32.6157H40.5708C41.3385 32.6157 41.963 31.9912 41.963 31.2236V19.9539C41.963 19.1862 41.3385 18.5618 40.5708 18.5618ZM39.9742 30.6269H33.2124V29.2348H39.9742V30.6269ZM39.9742 27.246H33.2124V20.5505H39.9742V27.246Z"
        fill="url(#paint6_linear_338_319)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_319"
          x1="46.8728"
          y1="16.2605"
          x2="31.2639"
          y2="16.1389"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_319"
          x1="42.9492"
          y1="11.6043"
          x2="33.2982"
          y2="11.5131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_319"
          x1="46.8728"
          y1="40.1162"
          x2="31.2634"
          y2="40.0367"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_319"
          x1="65.9646"
          y1="34.1499"
          x2="50.3552"
          y2="34.0704"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_338_319"
          x1="62.0415"
          y1="29.4937"
          x2="52.3899"
          y2="29.4489"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_338_319"
          x1="74.1173"
          y1="68.5744"
          x2="13.1127"
          y2="68.0432"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_338_319"
          x1="42.9492"
          y1="35.4599"
          x2="33.2976"
          y2="35.4152"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ModalSlideIcon1 = () => {
  return (
    <svg
      className="w-[88rem] h-[88rem]"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.2193 37.0002C40.0352 36.4895 39.472 36.2247 38.9613 36.4088C38.4506 36.5928 38.1858 37.156 38.3699 37.6667C38.3744 37.6792 38.3792 37.6916 38.3842 37.704C39.2807 40.0435 39.3456 41.8324 38.5612 42.6188C37.6097 43.5683 35.2398 43.2715 32.2201 41.8265C28.1775 39.7274 24.5029 36.9853 21.3399 33.7074C13.6404 26.0069 10.4635 18.451 12.4284 16.4861C13.0554 15.9909 13.8704 15.8007 14.6519 15.9671C15.1932 16.0069 15.6644 15.6002 15.7042 15.0588C15.7427 14.5355 15.3634 14.0743 14.8426 14.011C13.4759 13.7692 12.0737 14.1676 11.0385 15.0922C7.437 18.6928 12.9425 28.0849 19.95 35.0933C23.27 38.529 27.1278 41.4006 31.3719 43.5949C32.1404 43.9629 32.9324 44.2797 33.7427 44.5434L26.7589 47.1915C17.4331 43.646 10.7197 35.3784 9.16404 25.5233C9.07988 24.987 8.57685 24.6204 8.04053 24.7045C7.50421 24.7887 7.13757 25.2917 7.22173 25.828C7.37606 26.811 7.58248 27.7939 7.83509 28.7553C10.0986 37.3314 16.0603 44.4559 24.1029 48.1961L12.6083 52.5456C12.5556 52.4577 12.4892 52.3788 12.4117 52.3117C9.49038 49.9662 7.65743 46.5265 7.33969 42.7938L6.8836 37.2706C6.84772 36.7355 6.38475 36.3307 5.84953 36.3666C5.83934 36.3674 5.82914 36.3681 5.81906 36.3692C5.27795 36.4122 4.87408 36.8859 4.91708 37.427C4.9172 37.4292 4.91745 37.4315 4.9177 37.4337L5.38165 42.955C5.72716 46.9449 7.58837 50.6506 10.5824 53.3104L2.38267 56.4145L3.85709 50.3635C3.98574 49.8358 3.66234 49.3037 3.13462 49.1751C2.6069 49.0464 2.07488 49.3698 1.94623 49.8976L0.0284975 57.7612C-0.100761 58.2884 0.221893 58.8207 0.749246 58.9498C0.942642 58.9972 1.14574 58.9847 1.33189 58.9142L37.7011 45.1528C37.7589 45.1246 37.8136 45.0903 37.8643 45.0506C38.6513 44.9297 39.3811 44.5658 39.9511 44.0097C40.925 43.0356 41.7635 41.0274 40.2193 37.0002Z"
        fill="url(#paint0_linear_338_134)"
      />
      <path
        d="M49.4955 34.4652C44.1818 32.476 38.4386 31.9183 32.8414 32.8483L29.3293 33.438C28.7962 33.5405 28.4471 34.0557 28.5496 34.5888C28.6486 35.1039 29.1346 35.4505 29.6537 35.3764L33.1648 34.7916C38.4214 33.9176 43.8154 34.4418 48.8055 36.3112C48.9162 36.3504 49.0331 36.3701 49.1505 36.3692C49.6934 36.3701 50.1342 35.9308 50.1351 35.3879C50.1358 34.9769 49.8807 34.6089 49.4955 34.4652Z"
        fill="url(#paint1_linear_338_134)"
      />
      <path
        d="M52.99 19.2363C52.7565 18.7461 52.17 18.5379 51.6797 18.7714L31.0378 28.6009C30.5476 28.8342 30.3394 29.4207 30.5727 29.9109L30.5728 29.9112C30.8061 30.4013 31.3926 30.6096 31.8828 30.3762L31.8831 30.3761L52.5251 20.5466C53.0153 20.3132 53.2235 19.7266 52.99 19.2363Z"
        fill="url(#paint2_linear_338_134)"
      />
      <path
        d="M23.8727 6.6713C23.7646 6.13927 23.2457 5.79561 22.7137 5.90373C22.1817 6.01186 21.838 6.53073 21.9461 7.06276C21.9484 7.07455 21.9512 7.08623 21.954 7.0979C23.1981 12.6564 22.6854 18.4641 20.4864 23.7186L19.0572 27.1481C18.8507 27.6478 19.0865 28.2205 19.5851 28.4299C19.7045 28.4802 19.8329 28.5058 19.9625 28.5056C20.3593 28.5056 20.7171 28.2672 20.8698 27.9011L22.3 24.4755C24.656 18.847 25.2056 12.6256 23.8727 6.6713Z"
        fill="url(#paint3_linear_338_134)"
      />
      <path
        d="M54.0651 35.3862C52.4364 35.3862 51.1162 36.7065 51.1162 38.3351C51.1162 39.9637 52.4364 41.2839 54.0651 41.2839C55.6937 41.2839 57.0139 39.9637 57.0139 38.3351C57.0139 36.7065 55.6937 35.3862 54.0651 35.3862ZM54.0651 39.318C53.5222 39.318 53.0821 38.8779 53.0821 38.3351C53.0821 37.7922 53.5222 37.3521 54.0651 37.3521C54.6079 37.3521 55.048 37.7922 55.048 38.3351C55.048 38.8779 54.6079 39.318 54.0651 39.318Z"
        fill="url(#paint4_linear_338_134)"
      />
      <path
        d="M30.4742 7.86359C28.8456 7.86359 27.5254 9.18381 27.5254 10.8124C27.5254 12.4411 28.8456 13.7613 30.4742 13.7613C32.1029 13.7613 33.4231 12.4411 33.4231 10.8124C33.4231 9.18381 32.1029 7.86359 30.4742 7.86359ZM30.4742 11.7954C29.9314 11.7954 29.4913 11.3553 29.4913 10.8124C29.4913 10.2696 29.9314 9.82949 30.4742 9.82949C31.0171 9.82949 31.4572 10.2696 31.4572 10.8124C31.4572 11.3553 31.0171 11.7954 30.4742 11.7954Z"
        fill="url(#paint5_linear_338_134)"
      />
      <path
        d="M21.6275 3.9318C22.7133 3.9318 23.5934 3.05164 23.5934 1.9659C23.5934 0.880164 22.7133 0 21.6275 0C20.5418 0 19.6616 0.880164 19.6616 1.9659C19.6616 3.05164 20.5418 3.9318 21.6275 3.9318Z"
        fill="url(#paint6_linear_338_134)"
      />
      <path
        d="M49.1504 4.91473C48.6076 4.91473 48.1675 5.35485 48.1675 5.89768V6.88064C48.1675 7.42347 48.6076 7.86359 49.1504 7.86359C49.6933 7.86359 50.1334 7.42347 50.1334 6.88064V5.89768C50.1334 5.35485 49.6933 4.91473 49.1504 4.91473Z"
        fill="url(#paint7_linear_338_134)"
      />
      <path
        d="M49.1504 0C48.6076 0 48.1675 0.440116 48.1675 0.982951V1.9659C48.1675 2.50874 48.6076 2.94885 49.1504 2.94885C49.6933 2.94885 50.1334 2.50874 50.1334 1.9659V0.982951C50.1334 0.440116 49.6933 0 49.1504 0Z"
        fill="url(#paint8_linear_338_134)"
      />
      <path
        d="M52.0992 2.94885H51.1163C50.5734 2.94885 50.1333 3.38897 50.1333 3.9318C50.1333 4.47464 50.5734 4.91475 51.1163 4.91475H52.0992C52.642 4.91475 53.0822 4.47464 53.0822 3.9318C53.0822 3.38897 52.642 2.94885 52.0992 2.94885Z"
        fill="url(#paint9_linear_338_134)"
      />
      <path
        d="M47.1847 2.94885H46.2017C45.6589 2.94885 45.2188 3.38897 45.2188 3.9318C45.2188 4.47464 45.6589 4.91475 46.2017 4.91475H47.1847C47.7275 4.91475 48.1676 4.47464 48.1676 3.9318C48.1676 3.38897 47.7275 2.94885 47.1847 2.94885Z"
        fill="url(#paint10_linear_338_134)"
      />
      <path
        d="M42.2699 10.7918H37.3345C36.7917 10.7918 36.3516 11.2319 36.3516 11.7748V16.7102C36.3516 17.253 36.7917 17.6931 37.3345 17.6931H42.2699C42.8127 17.6931 43.2529 17.253 43.2529 16.7102V11.7748C43.2529 11.2319 42.8127 10.7918 42.2699 10.7918ZM41.287 15.7272H38.3175V12.7577H41.287V15.7272Z"
        fill="url(#paint11_linear_338_134)"
      />
      <path
        d="M35.1089 19C34.748 18.6148 34.1474 18.5833 33.7484 18.9287L23.9189 27.7753C23.5156 28.1385 23.483 28.7598 23.8461 29.1632C24.2093 29.5665 24.8307 29.599 25.234 29.2359L35.0635 20.3894C35.4598 20.0182 35.4801 19.3962 35.1089 19Z"
        fill="url(#paint12_linear_338_134)"
      />
      <path
        d="M53.0821 22.6078C52.5392 22.6078 52.0991 23.048 52.0991 23.5908V24.5738C52.0991 25.1166 52.5392 25.5567 53.0821 25.5567C53.6249 25.5567 54.065 25.1166 54.065 24.5738V23.5908C54.065 23.048 53.6249 22.6078 53.0821 22.6078Z"
        fill="url(#paint13_linear_338_134)"
      />
      <path
        d="M57.2528 22.4388L56.5579 21.7439C56.1674 21.3667 55.5452 21.3775 55.168 21.768C54.8001 22.1489 54.8001 22.7528 55.168 23.1338L55.8629 23.8287C56.2534 24.2059 56.8756 24.1951 57.2528 23.8046C57.6208 23.4236 57.6208 22.8197 57.2528 22.4388Z"
        fill="url(#paint14_linear_338_134)"
      />
      <path
        d="M57.9972 18.6761H57.0142C56.4714 18.6761 56.0312 19.1162 56.0312 19.659C56.0312 20.2019 56.4714 20.642 57.0142 20.642H57.9972C58.54 20.642 58.9801 20.2019 58.9801 19.659C58.9801 19.1162 58.54 18.6761 57.9972 18.6761Z"
        fill="url(#paint15_linear_338_134)"
      />
      <path
        d="M57.2289 15.4893C56.848 15.1215 56.2441 15.1215 55.8631 15.4893L55.1682 16.1843C54.7843 16.5683 54.7845 17.1906 55.1684 17.5744C55.3527 17.7586 55.6026 17.8622 55.8631 17.8622C56.1239 17.8622 56.3738 17.7585 56.5581 17.5742L57.253 16.8792C57.6302 16.4888 57.6194 15.8664 57.2289 15.4893Z"
        fill="url(#paint16_linear_338_134)"
      />
      <path
        d="M53.0821 13.7613C52.5392 13.7613 52.0991 14.2014 52.0991 14.7442V15.7272C52.0991 16.27 52.5392 16.7101 53.0821 16.7101C53.6249 16.7101 54.065 16.27 54.065 15.7272V14.7442C54.065 14.2014 53.6249 13.7613 53.0821 13.7613Z"
        fill="url(#paint17_linear_338_134)"
      />
      <path
        d="M50.9965 16.1843L50.3015 15.4893C49.9111 15.1122 49.2889 15.1229 48.9116 15.5134C48.5438 15.8943 48.5438 16.4982 48.9116 16.8792L49.6066 17.5742C49.9971 17.9514 50.6193 17.9406 50.9965 17.5501C51.3645 17.1691 51.3645 16.5652 50.9965 16.1843Z"
        fill="url(#paint18_linear_338_134)"
      />
      <path
        d="M11.7499 4.25026C11.6342 3.89468 11.3267 3.63567 10.9567 3.58186L8.07175 3.16214L6.78506 0.548468C6.49829 0.0615387 5.87104 -0.100771 5.38411 0.186005C5.23446 0.274102 5.10975 0.398814 5.02165 0.548468L3.72907 3.16214L0.844106 3.58186C0.3068 3.65939 -0.0658612 4.15786 0.011669 4.69517C0.0425091 4.90908 0.143016 5.10678 0.297585 5.25779L2.38439 7.2925L1.89291 10.1657C1.79855 10.7003 2.15536 11.2102 2.68997 11.3045C2.90523 11.3425 3.12689 11.3077 3.32016 11.2056L5.90041 9.84522L8.48065 11.2017C8.96119 11.4543 9.55551 11.2696 9.80813 10.7891C9.90876 10.5978 9.94341 10.3787 9.90692 10.1657L9.41544 7.2925L11.5032 5.25779C11.7705 4.9962 11.8661 4.60572 11.7499 4.25026ZM7.66972 6.24565C7.43823 6.47112 7.33244 6.79598 7.38663 7.11458L7.6304 8.53495L6.35748 7.86359C6.07132 7.71332 5.7295 7.71332 5.44333 7.86359L4.1655 8.53396L4.40927 7.1136C4.46444 6.79623 4.36049 6.47185 4.13109 6.24565L3.09801 5.24009L4.52427 5.03269C4.84447 4.98625 5.12129 4.78511 5.26444 4.49502L5.90041 3.2044L6.53736 4.49502C6.68038 4.78486 6.95671 4.98588 7.27654 5.03269L8.70182 5.24009L7.66972 6.24565Z"
        fill="url(#paint19_linear_338_134)"
      />
      <path
        d="M55.6594 49.2704H55.6555L55.2505 48.663C52.9798 45.2672 49.4091 42.9583 45.3807 42.2807C44.8433 42.204 44.3454 42.5775 44.2688 43.1149C44.1947 43.6342 44.5413 44.1201 45.0563 44.219C47.9619 44.7122 50.6099 46.1884 52.5572 48.4005C50.92 48.695 49.4881 49.6784 48.6254 51.1007C47.5668 52.9967 48.2457 55.3918 50.1416 56.4504C52.0376 57.509 54.4327 56.8302 55.4914 54.9342C55.8957 54.1536 56.1141 53.29 56.1293 52.411C57.1751 53.93 57.2588 55.9137 56.3446 57.5154C56.0676 57.9823 56.2216 58.5854 56.6885 58.8623C57.1554 59.1393 57.7584 58.9853 58.0354 58.5184C58.0442 58.5034 58.0527 58.4883 58.0608 58.4728C59.8606 55.2581 58.8005 51.1959 55.6594 49.2704ZM53.7771 53.9748C53.2524 54.9255 52.0566 55.2707 51.106 54.7461C50.1555 54.2214 49.8101 53.0256 50.3348 52.075C50.3377 52.0698 50.3407 52.0644 50.3436 52.0591C50.9237 51.1093 51.9021 50.4726 53.0055 50.3271C53.1764 50.3224 53.3456 50.3618 53.4969 50.4411C54.3266 50.9041 54.3708 52.9113 53.7771 53.9748Z"
        fill="url(#paint20_linear_338_134)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_134"
          x1="44.8444"
          y1="68.0925"
          x2="7.93212"
          y2="67.8883"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_134"
          x1="52.1191"
          y1="37.1704"
          x2="32.7246"
          y2="36.5281"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_134"
          x1="55.1621"
          y1="32.8592"
          x2="34.8455"
          y2="32.6229"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_134"
          x1="25.0983"
          y1="33.0838"
          x2="20.0641"
          y2="33.0762"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_338_134"
          x1="57.5555"
          y1="42.4775"
          x2="52.2552"
          y2="42.4454"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_338_134"
          x1="33.9647"
          y1="14.9549"
          x2="28.6644"
          y2="14.9227"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_338_134"
          x1="23.9545"
          y1="4.72753"
          x2="20.421"
          y2="4.70608"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_338_134"
          x1="50.3139"
          y1="8.46038"
          x2="48.5471"
          y2="8.45323"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_338_134"
          x1="50.3139"
          y1="3.54564"
          x2="48.5471"
          y2="3.5385"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_338_134"
          x1="53.353"
          y1="5.31262"
          x2="50.7029"
          y2="5.28849"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_338_134"
          x1="48.4384"
          y1="5.31262"
          x2="45.7884"
          y2="5.28849"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_338_134"
          x1="43.8867"
          y1="19.0898"
          x2="37.6844"
          y2="19.0522"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_338_134"
          x1="36.4564"
          y1="31.6739"
          x2="25.8691"
          y2="31.6038"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_338_134"
          x1="54.2456"
          y1="26.1535"
          x2="52.4788"
          y2="26.1463"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_338_134"
          x1="57.771"
          y1="24.6384"
          x2="55.4013"
          y2="24.624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_338_134"
          x1="59.2509"
          y1="21.0398"
          x2="56.6009"
          y2="21.0157"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_338_134"
          x1="57.7722"
          y1="18.3982"
          x2="55.3919"
          y2="18.3838"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_338_134"
          x1="54.2456"
          y1="17.3069"
          x2="52.4788"
          y2="17.2998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_338_134"
          x1="51.5146"
          y1="18.3838"
          x2="49.145"
          y2="18.3694"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_338_134"
          x1="12.882"
          y1="13.6014"
          x2="2.27988"
          y2="13.5341"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_338_134"
          x1="60.2842"
          y1="62.3857"
          x2="47.0933"
          y2="62.3155"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const ModalSlideIcon2 = () => {
  return (
    <svg
      className="w-[88rem] h-[88rem]"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9178 34.1306C9.90174 34.7333 9.21875 35.8409 9.21875 37.1055C9.21875 39.0117 10.7696 40.5625 12.6758 40.5625C14.178 40.5625 15.4589 39.599 15.9346 38.2578H24.8906C26.7968 38.2578 28.3477 39.8086 28.3477 41.7148C28.3477 43.6211 26.7968 45.1719 24.8906 45.1719H11.0625C7.88549 45.1719 5.30078 47.7566 5.30078 50.9336C5.30078 54.1106 7.88549 56.6953 11.0625 56.6953H22.5859C23.2224 56.6953 23.7383 56.1794 23.7383 55.543C23.7383 54.9065 23.2224 54.3906 22.5859 54.3906H11.0625C9.15629 54.3906 7.60547 52.8398 7.60547 50.9336C7.60547 49.0274 9.15629 47.4766 11.0625 47.4766H24.8906C28.0676 47.4766 30.6523 44.8919 30.6523 41.7148C30.6523 38.5378 28.0676 35.9531 24.8906 35.9531H15.9346C15.6621 35.1847 15.1253 34.5407 14.4338 34.1306L23.2352 19.6899C24.6197 17.6087 25.3516 15.1837 25.3516 12.6758C25.3516 5.68636 19.6652 0 12.6758 0C5.68636 0 0 5.68636 0 12.6758C0 15.1837 0.731853 17.6087 2.11639 19.6899L10.9178 34.1306ZM12.6758 38.2578C12.0404 38.2578 11.5234 37.7409 11.5234 37.1055C11.5234 36.4701 12.0404 35.9531 12.6758 35.9531C13.3112 35.9531 13.8281 36.4701 13.8281 37.1055C13.8281 37.7409 13.3112 38.2578 12.6758 38.2578ZM12.6758 2.30469C18.3944 2.30469 23.0469 6.95716 23.0469 12.6758C23.0469 14.7348 22.4445 16.7245 21.3051 18.43C21.2962 18.4433 21.2876 18.4567 21.2793 18.4705L12.6758 32.5866C12.6758 32.5866 4.05533 18.4433 4.04646 18.43C2.90702 16.7245 2.30469 14.7348 2.30469 12.6758C2.30469 6.95716 6.95716 2.30469 12.6758 2.30469Z"
        fill="url(#paint0_linear_338_198)"
      />
      <path
        d="M12.6758 18.4375C15.8528 18.4375 18.4375 15.8528 18.4375 12.6758C18.4375 9.49877 15.8528 6.91406 12.6758 6.91406C9.49877 6.91406 6.91406 9.49877 6.91406 12.6758C6.91406 15.8528 9.49877 18.4375 12.6758 18.4375ZM12.6758 9.21875C14.582 9.21875 16.1328 10.7696 16.1328 12.6758C16.1328 14.582 14.582 16.1328 12.6758 16.1328C10.7696 16.1328 9.21875 14.582 9.21875 12.6758C9.21875 10.7696 10.7696 9.21875 12.6758 9.21875Z"
        fill="url(#paint1_linear_338_198)"
      />
      <path
        d="M46.3242 19.1289C39.3348 19.1289 33.6484 24.8153 33.6484 31.8047C33.6484 34.3167 34.3826 36.7454 35.7715 38.8287L44.54 52.5831C43.8611 52.9939 43.3346 53.6318 43.0655 54.3906H32.957C32.3206 54.3906 31.8047 54.9065 31.8047 55.543C31.8047 56.1794 32.3206 56.6953 32.957 56.6953H43.0654C43.5411 58.0365 44.8219 59 46.3242 59C48.2304 59 49.7812 57.4492 49.7812 55.543C49.7812 54.2891 49.1102 53.1892 48.1085 52.5831L56.877 38.8287C58.2658 36.7454 59 34.3167 59 31.8047C59 24.8153 53.3136 19.1289 46.3242 19.1289ZM46.3242 56.6953C45.6888 56.6953 45.1719 56.1784 45.1719 55.543C45.1719 54.9076 45.6888 54.3906 46.3242 54.3906C46.9596 54.3906 47.4766 54.9076 47.4766 55.543C47.4766 56.1784 46.9596 56.6953 46.3242 56.6953ZM54.9535 37.5589C54.9491 37.5658 46.3242 51.0946 46.3242 51.0946C46.3242 51.0946 37.6994 37.5657 37.6949 37.5589C36.5555 35.8534 35.9531 33.8637 35.9531 31.8047C35.9531 26.0861 40.6056 21.4336 46.3242 21.4336C52.0428 21.4336 56.6953 26.0861 56.6953 31.8047C56.6953 33.8637 56.093 35.8534 54.9535 37.5589Z"
        fill="url(#paint2_linear_338_198)"
      />
      <path
        d="M46.3242 26.043C43.1472 26.043 40.5625 28.6277 40.5625 31.8047C40.5625 34.9817 43.1472 37.5664 46.3242 37.5664C49.5012 37.5664 52.0859 34.9817 52.0859 31.8047C52.0859 28.6277 49.5012 26.043 46.3242 26.043ZM46.3242 35.2617C44.418 35.2617 42.8672 33.7109 42.8672 31.8047C42.8672 29.8985 44.418 28.3477 46.3242 28.3477C48.2304 28.3477 49.7812 29.8985 49.7812 31.8047C49.7812 33.7109 48.2304 35.2617 46.3242 35.2617Z"
        fill="url(#paint3_linear_338_198)"
      />
      <path
        d="M27.7715 56.6953C28.4079 56.6953 28.9238 56.1794 28.9238 55.543C28.9238 54.9065 28.4079 54.3906 27.7715 54.3906C27.1351 54.3906 26.6191 54.9065 26.6191 55.543C26.6191 56.1794 27.1351 56.6953 27.7715 56.6953Z"
        fill="url(#paint4_linear_338_198)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_198"
          x1="33.4674"
          y1="68.1694"
          x2="5.91918"
          y2="68.079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_198"
          x1="19.4958"
          y1="20.7696"
          x2="9.13959"
          y2="20.7068"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_198"
          x1="61.4975"
          y1="67.0691"
          x2="37.0564"
          y2="66.968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_198"
          x1="53.1442"
          y1="39.8985"
          x2="42.788"
          y2="39.8357"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_338_198"
          x1="29.1355"
          y1="57.1617"
          x2="27.0642"
          y2="57.1492"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const ModalSlideIcon3 = () => {
  return (
    <svg
      className="w-[88rem] h-[88rem]"
      viewBox="0 0 59 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.5664 24.3145C37.5664 20.8197 34.7232 17.9766 31.2285 17.9766H22.5859C21.9496 17.9766 21.4336 18.4926 21.4336 19.1289V29.5C21.4336 30.1363 21.9496 30.6523 22.5859 30.6523H31.2285C34.7232 30.6523 37.5664 27.8092 37.5664 24.3145ZM23.7383 20.2812H31.2285C33.4524 20.2812 35.2617 22.0905 35.2617 24.3145C35.2617 26.5384 33.4524 28.3477 31.2285 28.3477H23.7383V20.2812Z"
        fill="url(#paint0_linear_338_204)"
      />
      <path
        d="M44.4805 24.3145C44.4805 17.0073 38.5356 11.0625 31.2285 11.0625H15.6719C15.0356 11.0625 14.5195 11.5785 14.5195 12.2148V46.7852C14.5195 47.4215 15.0356 47.9375 15.6719 47.9375H22.5859C23.2223 47.9375 23.7383 47.4215 23.7383 46.7852V37.5664H31.2285C38.5356 37.5664 44.4805 31.6216 44.4805 24.3145ZM22.5859 35.2617C21.9496 35.2617 21.4336 35.7777 21.4336 36.4141V45.6328H16.8242V13.3672H31.2285C37.2648 13.3672 42.1758 18.2781 42.1758 24.3145C42.1758 30.3508 37.2648 35.2617 31.2285 35.2617H22.5859Z"
        fill="url(#paint1_linear_338_204)"
      />
      <path
        d="M29.5 59C30.1364 59 30.6523 58.4841 30.6523 57.8477C30.6523 57.2112 30.1364 56.6953 29.5 56.6953C28.8636 56.6953 28.3477 57.2112 28.3477 57.8477C28.3477 58.4841 28.8636 59 29.5 59Z"
        fill="url(#paint2_linear_338_204)"
      />
      <path
        d="M54.3906 0H4.60938C2.06777 0 0 2.06777 0 4.60938V54.3906C0 56.9322 2.06777 59 4.60938 59H24.3145C24.9508 59 25.4668 58.484 25.4668 57.8477C25.4668 57.2113 24.9508 56.6953 24.3145 56.6953H4.60938C3.33857 56.6953 2.30469 55.6614 2.30469 54.3906V4.60938C2.30469 3.33857 3.33857 2.30469 4.60938 2.30469H54.3906C55.6614 2.30469 56.6953 3.33857 56.6953 4.60938V54.3906C56.6953 55.6614 55.6614 56.6953 54.3906 56.6953H22.6855C22.0492 56.6953 21.5332 57.2113 21.5332 57.8477C21.5332 58.484 22.0492 59 22.6855 59H54.3906C56.9322 59 59 56.9322 59 54.3906V4.60938C59 2.06777 56.9322 0 54.3906 0Z"
        fill="url(#paint3_linear_338_204)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_204"
          x1="39.048"
          y1="33.2177"
          x2="24.5497"
          y2="33.1057"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_204"
          x1="47.232"
          y1="55.4003"
          x2="20.3056"
          y2="55.2675"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_204"
          x1="30.864"
          y1="59.4664"
          x2="28.7928"
          y2="59.4539"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_204"
          x1="64.4184"
          y1="70.9405"
          x2="11.3947"
          y2="70.6187"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const ModalSlideIcon4 = () => {
  return (
    <svg
      className="w-[88rem] h-[88rem]"
      viewBox="0 0 49 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.8069 32.6404C47.4204 35.4836 48.86 39.1652 48.86 43.0065V57.564C48.86 58.3574 48.2174 59 47.424 59H1.436C0.642612 59 0 58.3574 0 57.564V43.0065C0 39.1652 1.43959 35.4854 4.05312 32.6404C6.65049 29.815 10.1669 28.0703 13.9526 27.7256C14.5952 27.6664 15.2001 28.0469 15.4281 28.6519L18.0398 35.6272L19.9838 40.7322L21.0016 35.34L17.9877 29.7827C17.7472 29.3376 17.758 28.7991 18.0165 28.3629C18.2749 27.9285 18.7434 27.661 19.2496 27.661H29.605C30.1112 27.661 30.5797 27.9267 30.8382 28.3629C31.0967 28.7973 31.1074 29.3376 30.8669 29.7827L27.8531 35.34L28.8709 40.7322L30.8184 35.6201L33.4284 28.6519C33.6563 28.0451 34.2577 27.6682 34.9039 27.7256C38.6913 28.0703 42.2077 29.815 44.8051 32.6404H44.8069ZM22.775 56.1262L15.3545 36.6414L13.1412 30.7305C7.30387 31.7877 2.87201 36.9825 2.87201 43.0047V56.1262H22.775ZM24.43 52.4016L26.9215 45.8624L24.9416 35.3706C24.8806 35.0457 24.9326 34.71 25.0906 34.4192L27.1979 30.533H21.6657L23.773 34.4192C23.931 34.71 23.9831 35.0457 23.922 35.3706L21.9421 45.8624L24.4336 52.4016H24.43ZM45.988 43.0047C45.988 36.9825 41.5579 31.7877 35.7206 30.7305L33.5091 36.6342L26.085 56.1262H45.988V43.0047ZM24.43 0C31.7267 0 37.6646 5.93608 37.6646 13.2346C37.6646 20.5331 31.7285 26.4691 24.43 26.4691C17.1315 26.4691 11.1954 20.5313 11.1954 13.2346C11.1954 5.93788 17.1333 0 24.43 0ZM24.43 2.87201C18.7165 2.87201 14.0675 7.52107 14.0675 13.2346C14.0675 18.9481 18.7165 23.5971 24.43 23.5971C30.1435 23.5971 34.7926 18.9481 34.7926 13.2346C34.7926 7.52107 30.1435 2.87201 24.43 2.87201Z"
        fill="url(#paint0_linear_338_242)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_242"
          x1="53.3472"
          y1="70.9405"
          x2="9.43585"
          y2="70.7198"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const ModalSlideIcon5 = () => {
  return (
    <svg
      className="w-[88rem] h-[88rem]"
      viewBox="0 0 68 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3013 13.5236H43.8856C44.6532 13.5236 45.2777 12.8991 45.2777 12.1315V1.39213C45.2777 0.624472 44.6532 0 43.8856 0H29.3013C28.5337 0 27.9092 0.624472 27.9092 1.39213V12.1315C27.9092 12.8991 28.5337 13.5236 29.3013 13.5236ZM29.8979 1.98876H43.289V11.5348H29.8979V1.98876Z"
        fill="url(#paint0_linear_338_319)"
      />
      <path
        d="M40.5708 3.31464H32.6158C31.8481 3.31464 31.2236 3.93911 31.2236 4.70677V8.81688C31.2236 9.58455 31.8481 10.209 32.6158 10.209H40.5708C41.3385 10.209 41.963 9.58455 41.963 8.81688V4.70677C41.963 3.93911 41.3385 3.31464 40.5708 3.31464ZM39.9742 8.22025H33.2124V5.3034H39.9742V8.22025Z"
        fill="url(#paint1_linear_338_319)"
      />
      <path
        d="M29.3013 35.9303H43.8856C44.6532 35.9303 45.2777 35.3059 45.2777 34.5382V16.6393C45.2777 15.8717 44.6532 15.2472 43.8856 15.2472H29.3013C28.5337 15.2472 27.9092 15.8717 27.9092 16.6393V34.5382C27.9092 35.3059 28.5337 35.9303 29.3013 35.9303ZM29.8979 17.236H43.289V33.9416H29.8979V17.236Z"
        fill="url(#paint2_linear_338_319)"
      />
      <path
        d="M48.3931 29.964H62.9774C63.745 29.964 64.3695 29.3396 64.3695 28.5719V19.6887C64.3695 19.1395 63.9244 18.6944 63.3751 18.6944C62.8258 18.6944 62.3808 19.1395 62.3808 19.6887V27.9753H48.9897V11.2696H62.3808V25.0483C62.3808 25.5976 62.8258 26.0427 63.3751 26.0427C63.9244 26.0427 64.3695 25.5976 64.3695 25.0483V10.673C64.3695 9.90536 63.745 9.28088 62.9774 9.28088H48.3931C47.6254 9.28088 47.001 9.90536 47.001 10.673V28.5719C47.001 29.3396 47.6254 29.964 48.3931 29.964Z"
        fill="url(#paint3_linear_338_319)"
      />
      <path
        d="M51.7081 12.5955C50.9404 12.5955 50.3159 13.22 50.3159 13.9877V25.2573C50.3159 26.025 50.9404 26.6495 51.7081 26.6495H59.6631C60.4308 26.6495 61.0552 26.025 61.0552 25.2573V13.9877C61.0552 13.22 60.4308 12.5955 59.6631 12.5955H51.7081ZM58.1113 14.5843L55.9126 17.6158L53.4168 14.5843H58.1113ZM52.3047 16.3622L54.706 19.2794L52.3047 22.5904V16.3622ZM59.0665 24.6607H53.2598L59.0665 16.6546V24.6607Z"
        fill="url(#paint4_linear_338_319)"
      />
      <path
        d="M66.2258 52.7686H63.1848L65.5517 42.8861C65.6705 42.3895 65.5574 41.8746 65.2411 41.4738C64.9248 41.0729 64.4505 40.8429 63.94 40.8429H63.7356C64.9135 39.2222 65.3525 37.1747 64.9078 35.1738C64.7904 34.6451 64.3728 34.2276 63.8444 34.1102C61.4752 33.5837 59.0374 34.292 57.3241 36.0053C56.9671 36.3623 56.6563 36.7524 56.3886 37.1652C56.1208 36.7521 55.8091 36.3624 55.4518 36.0053C53.7387 34.2923 51.3016 33.5837 48.9317 34.1102C48.4035 34.2276 47.986 34.6448 47.8681 35.1738C47.4235 37.1747 47.8625 39.2222 49.0404 40.8429H48.8361C48.3254 40.8429 47.8511 41.0728 47.5349 41.4738C47.2187 41.8746 47.1056 42.3895 47.2244 42.8861L49.5913 52.7686H25.3761C25.7252 52.1429 25.9796 51.4533 26.1151 50.716L26.1579 50.4829C26.2472 49.9975 26.1172 49.5018 25.8014 49.1225C25.4856 48.7434 25.0214 48.5259 24.528 48.5259H23.3981L26.0951 37.2655C26.214 36.7688 26.1008 36.254 25.7846 35.8531C25.4684 35.4521 24.9941 35.2221 24.4834 35.2221H21.3432C21.6229 34.5556 21.8854 33.8726 22.125 33.1725C23.6512 28.7115 24.1256 24.225 23.4607 20.5394C23.3708 20.0412 23.018 19.6302 22.5401 19.4666C22.0623 19.3031 21.5316 19.4119 21.1553 19.7508C20.2206 20.5925 19.3324 21.5849 18.5066 22.6999C18.2067 18.8029 17.2747 15.2297 15.8047 12.4372C15.5626 11.977 15.0898 11.6912 14.571 11.6912C14.0522 11.6912 13.5794 11.9769 13.3372 12.4371C11.8672 15.2297 10.9352 18.803 10.6352 22.6999C9.80951 21.5847 8.92133 20.5923 7.98661 19.7507C7.61034 19.4121 7.07987 19.303 6.6019 19.4666C6.12407 19.63 5.77126 20.0412 5.68137 20.5394C5.01646 24.225 5.49071 28.7115 7.01702 33.1725C7.2566 33.8726 7.51912 34.5556 7.79887 35.2221H4.65848C4.1479 35.2221 3.67365 35.452 3.35743 35.8529C3.04109 36.2539 2.92786 36.7687 3.04679 37.2653L5.74355 48.5259H4.6138C4.12032 48.5259 3.65628 48.7433 3.34046 49.1224C3.02465 49.5015 2.89458 49.9974 2.98381 50.4828L3.02663 50.716C3.16213 51.4535 3.4167 52.1429 3.76579 52.7686H1.6573C0.7434 52.7686 0 53.512 0 54.4259V57.3427C0 58.2566 0.7434 59 1.6573 59H59.7191C60.2684 59 60.7135 58.5549 60.7135 58.0056C60.7135 57.4563 60.2684 57.0112 59.7191 57.0112H1.98876V54.7573H65.8944V57.0112H54.3596C53.8103 57.0112 53.3652 57.4563 53.3652 58.0056C53.3652 58.5549 53.8103 59 54.3596 59H66.2258C67.1397 59 67.8831 58.2566 67.8831 57.3427V54.4259C67.8831 53.512 67.1397 52.7686 66.2258 52.7686ZM21.6635 22.0286C21.9867 25.1421 21.4858 28.897 20.2434 32.5286C19.9269 33.4538 19.5661 34.3545 19.17 35.222H15.2912C15.543 33.8892 15.8969 32.5358 16.3544 31.198C17.597 27.5663 19.5008 24.2917 21.6635 22.0286ZM14.5709 14.4612C15.8847 17.4729 16.6259 21.4048 16.6259 25.466C16.6259 25.5289 16.6243 25.5914 16.6239 25.6541C15.8397 27.0833 15.1488 28.636 14.5714 30.2754C13.994 28.6356 13.302 27.0834 12.5177 25.6541C12.5173 25.5913 12.5157 25.5289 12.5157 25.466C12.5158 21.4048 13.2571 17.4729 14.5709 14.4612ZM7.47828 22.0286C9.64087 24.2917 11.5448 27.5665 12.7872 31.1982C13.0837 32.0647 13.3364 32.9379 13.5468 33.8078C13.4387 34.2818 13.3449 34.7531 13.2617 35.222H9.9718C9.57563 34.3545 9.215 33.4538 8.89839 32.5286C7.65595 28.8968 7.15491 25.1424 7.47828 22.0286ZM22.923 52.7686H6.21873C5.63245 52.1572 5.20539 51.3862 5.01447 50.5146H21.982C22.5312 50.5146 22.9764 50.0695 22.9764 49.5202C22.9764 48.9709 22.5312 48.5259 21.982 48.5259H7.78866L5.07864 37.2108H24.0631L21.3531 48.5259H19.6225C19.0733 48.5259 18.6281 48.9709 18.6281 49.5202C18.6281 50.0695 19.0733 50.5146 19.6225 50.5146H24.1272C23.9364 51.3862 23.5092 52.1572 22.923 52.7686ZM58.7305 37.4116C59.8695 36.2723 61.4553 35.7522 63.0357 35.9823C63.2658 37.5627 62.7456 39.1486 61.6066 40.2876C61.4008 40.4934 61.18 40.6783 60.9477 40.8429H57.25C57.2848 39.5655 57.8017 38.3402 58.7305 37.4116ZM49.7401 35.9823C51.3202 35.7524 52.9063 36.2724 54.0455 37.4116C54.7015 38.0676 55.1509 38.8721 55.3713 39.738C55.3062 40.1013 55.2707 40.4706 55.2634 40.8429H51.8272C51.5952 40.6785 51.3749 40.4931 51.1693 40.2876C50.0301 39.1483 49.5099 37.5623 49.7401 35.9823ZM51.6361 52.7686L49.2563 42.8316H63.5197L61.1398 52.7686H51.6361Z"
        fill="url(#paint5_linear_338_319)"
      />
      <path
        d="M40.5708 18.5618H32.6158C31.8481 18.5618 31.2236 19.1862 31.2236 19.9539V31.2236C31.2236 31.9912 31.8481 32.6157 32.6158 32.6157H40.5708C41.3385 32.6157 41.963 31.9912 41.963 31.2236V19.9539C41.963 19.1862 41.3385 18.5618 40.5708 18.5618ZM39.9742 30.6269H33.2124V29.2348H39.9742V30.6269ZM39.9742 27.246H33.2124V20.5505H39.9742V27.246Z"
        fill="url(#paint6_linear_338_319)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_338_319"
          x1="46.8728"
          y1="16.2605"
          x2="31.2639"
          y2="16.1389"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_338_319"
          x1="42.9492"
          y1="11.6043"
          x2="33.2982"
          y2="11.5131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_338_319"
          x1="46.8728"
          y1="40.1162"
          x2="31.2634"
          y2="40.0367"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_338_319"
          x1="65.9646"
          y1="34.1499"
          x2="50.3552"
          y2="34.0704"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_338_319"
          x1="62.0415"
          y1="29.4937"
          x2="52.3899"
          y2="29.4489"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_338_319"
          x1="74.1173"
          y1="68.5744"
          x2="13.1127"
          y2="68.0432"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_338_319"
          x1="42.9492"
          y1="35.4599"
          x2="33.2976"
          y2="35.4152"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#916527" />
          <stop offset="1" stopColor="#DAA22E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const SlideLogo1 = () => {
  return (
    <img
      src="/sales/our-clients-logo/aquetrade-logo.png"
      className="w-[41rem] h-[45rem] sm:w-[90rem] sm:h-[100rem]"
      alt=""
    />
  );
};

const SlideLogo2 = () => {
  return (
    <img
      src="/sales/our-clients-logo/romana-x-logo.webp"
      className="w-[43rem] h-[41rem] sm:w-[103rem] sm:h-[99rem]"
      alt=""
    />
  );
};

const SlideLogo3 = () => {
  return (
    <img
      src="/sales/our-clients-logo/neuroscan.webp"
      className="w-[195rem] h-[26rem] sm:w-[471rem] sm:h-[63rem]"
      alt=""
    />
  );
};

const SlideLogo4 = () => {
  return (
    <img
      src="/sales/our-clients-logo/romanescu-logo.webp"
      className="w-[149rem] h-[41rem] sm:w-[360rem] sm:h-[99rem]"
      alt=""
    />
  );
};

const SlideLogo5 = () => {
  return (
    <img
      src="/sales/our-clients-logo/slavata-grup-logo.webp"
      className="w-[82rem] h-[45rem] sm:w-[198rem] sm:h-[108rem]"
      alt=""
    />
  );
};

const SlideLogo6 = () => {
  return (
    <img
      src="/sales/our-clients-logo/next-logo.webp"
      className="w-[111rem] h-[27rem] sm:w-[268rem] sm:h-[65rem]"
      alt=""
    />
  );
};

const SlideLogo7 = () => {
  return (
    <img
      src="/sales/our-clients-logo/flo-logo.png"
      className="w-[138rem] h-[28rem] sm:w-[162rem] sm:h-[55rem]"
      alt=""
    />
  );
};

const SlideLogo8 = () => {
  return (
    <img
      src="/sales/our-clients-logo/golban-trade-logo.webp"
      className="w-[98rem] h-[42rem] sm:w-[235rem] sm:h-[100rem]"
      alt=""
    />
  );
};

const SlideLogo9 = () => {
  return (
    <img
      src="/sales/our-clients-logo/ro-expert-logo.webp"
      className="w-[45rem] h-[45rem] sm:w-[108rem] sm:h-[108rem]"
      alt=""
    />
  );
};

const SlideLogo10 = () => {
  return (
    <img
      src="/sales/our-clients-logo/shape-robotics-logo.webp"
      className="w-[101rem] h-[41rem] sm:w-[243rem] sm:h-[100rem]"
      alt=""
    />
  );
};

const SlideLogo11 = () => {
  return (
    <img
      src="/sales/our-clients-logo/jysk-logo.webp"
      className="w-[84rem] h-[39rem] sm:w-[203rem] sm:h-[94rem]"
      alt=""
    />
  );
};

const SlideLogo12 = () => {
  return (
    <img
      src="/sales/our-clients-logo/dyninno-logo.webp"
      className="w-[156rem] h-[16rem] sm:w-[376rem] sm:h-[38rem]"
      alt=""
    />
  );
};

const SlideLogo13 = () => {
  return (
    <img
      src="/sales/our-clients-logo/imaso-logo.png"
      className="w-[83rem] h-[27rem] sm:w-[184rem] sm:h-[60rem]"
      alt=""
    />
  );
};

const SlideLogo14 = () => {
  return (
    <img
      src="/sales/our-clients-logo/marcodop-logo.png"
      className="w-[55rem] h-[33rem] sm:w-[122rem] sm:h-[74rem]"
      alt=""
    />
  );
};

const SlideLogo15 = () => {
  return (
    <img
      src="/sales/our-clients-logo/natural-smile-logo.png"
      className="w-[121rem] h-[31rem] sm:w-[270rem] sm:h-[70rem]"
      alt=""
    />
  );
};

const SlideLogo16 = () => {
  return (
    <img
      src="/sales/our-clients-logo/mvv-tur-logo.png"
      className="w-[78rem] h-[41rem] sm:w-[168rem] sm:h-[90rem]"
      alt=""
    />
  );
};

const SlideLogo17 = () => {
  return (
    <img
      src="/sales/our-clients-logo/solovov-logo.png"
      className="w-[122rem] h-[32rem] sm:w-[272rem] sm:h-[70rem]"
      alt=""
    />
  );
};

export default Page;
