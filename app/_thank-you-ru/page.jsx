"use client";
import React from "react";
import Footer from "../oficiu-978/sections/footer/page";
import styles from "./thanks.module.scss"
import Header from "../components/header-thank-you-ru"
import WistiaVideo from "../components/video/thanks-page";
import Cal, { getCalApi } from "@calcom/embed-react";
// import { v4 as uuidv4 } from "uuid";

function ICallEmbed() {
  React.useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "программирование-визита-t",
        embedLibUrl: "https://cal-xy6mp-u17606.vm.elestio.app/embed/embed.js",
      });
      
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#be8f3e",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      const params = new URLSearchParams(window.location.search);
      const utm_source = params.get("utm_source") || "";
      const utm_medium = params.get("utm_medium") || "";
      const utm_campaign = params.get("utm_campaign") || "";
      const utm_content = params.get("utm_content") || "";
      const utm_term = params.get("utm_term") || "";

      const currentPageUrl = new URLSearchParams(window.location.href);
      const decodedUrl = decodeURIComponent(currentPageUrl);

      cal("inline", {
        elementOrSelector: "#my-cal-inline-thanks-ru",
        calLink: "team/artima-business-lifestyle/программирование-визита-t",
        config: {
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_campaign: utm_campaign,
          utm_content: utm_content,
          utm_term: utm_term,
          landing_page: decodedUrl.slice(0, -1),
          metadata: {
            landing_page: decodedUrl.slice(0, -1),
          },
        },
      });

    })();
  }, []);
  return (
    <Cal
      id="my-cal-inline-thanks-ru"
      namespace="программирование-визита-t"
      calLink="team/artima-business-lifestyle/программирование-визита-t"
      calOrigin="https://cal-xy6mp-u17606.vm.elestio.app"
      embedJsUrl="https://cal-xy6mp-u17606.vm.elestio.app/embed/embed.js"
    />
  );
};

const Page = () => {
  // React.useEffect(() => {
  //   const pageview_event_id =
  //     document.documentElement.getAttribute("data-request-id");
  //   if (pageview_event_id) {
  //     window.dataLayer = window.dataLayer || [];
  //     window.dataLayer.push({
  //       event: "pageview_event_id",
  //       pageview_event_id: pageview_event_id,
  //     });
  //   }
  // }, []);
  return (
    <div className={styles.thanks}>
      <Header />
      <div>
        <h6 className={styles.thanks__title}>Спасибо!</h6>
        <p className={styles.thanks__subtitle}>
          {/* Solicitarea ta a fost înregistrată{" "}
          <br className="inline-block sm:hidden" />
          cu succes
          <br />
          <span className=" inline-block mt-[15rem] sm:mt-0">
            În cel mai scurt timp vei primi prezentarea PDF pe e-mail
          </span> */}
          Твоя заявка была успешно
          <br className="inline-block sm:hidden" /> {""}
          зарегистрирована
          <br />{" "}
          <span className=" inline-block mt-[15rem] sm:mt-0">
            В течение ближайшего {""}
            <br className="inline-block sm:hidden" />
            времени ты получишь PDF-
            <br />
            презентацию на e-mail
          </span>
        </p>
        <img
          src="/sales/thanks/gmail-thanks.png"
          className="w-[183rem] h-[180rem] sm:w-[258rem] sm:h-[254rem] mx-auto mt-[20rem] sm:mt-[50rem]"
          alt="gmail thanks page ARTIMA Business & Lifestyles"
        />
      </div>
      <p className={styles.thanks__video_title}>
        {/* Încă nu ai văzut video-ul cu
        <br className="inline-block sm:hidden" /> biroul de 978 m2,
        <br className="hidden sm:inline-block" /> {""}
        filmat
        <br className="inline-block sm:hidden" /> {""} special pentru acest
        spațiu? */}
        Ты еще не смотрел наше видео {""}
        <br className="hidden sm:inline-block" />
        {""}
        про офис
        <br className="inline-block sm:hidden" /> {""}
        площадью 978 м²?
      </p>
      <div className={styles.thanks__video}>
       < WistiaVideo />
      </div>
      <p className={styles.thanks__video_text}>
        {/* Te invităm să programezi
        <br className="inline-block sm:hidden" /> {""}acum o vizită ca să
        <br className="hidden sm:inline-block" />
        descoperi
        <br className="inline-block sm:hidden" />
        {""} biroul premium în realitate */}
        Приглашаем тебя
        <br className="inline-block sm:hidden" /> {""}
        запрограммировать
        <br className="hidden sm:inline-block" /> визит,
        <br className="inline-block sm:hidden" />
        чтобы посмотреть {""}
        <br className="inline-block sm:hidden" />{""}
        премиум-офис {""}
        <br className="hidden sm:inline-block" />{""}
        своими {""}
        <br className="inline-block sm:hidden" /> {""}
        глазами
      </p>
      <p className={styles.thanks__programming_title}>
        {/* Programează vizita în calendar */}
        Установи дату визита в календаре
      </p>
      <div className="pb-[130rem]">
        <ICallEmbed />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
