"use client";
import React from "react";
import Footer from "../oficiu-978/sections/footer/page";
import styles from "./thanks.module.scss"
import Header from "../components/header-thank-you"
import WistiaVideo from "../components/video/thanks-page"
import Cal, { getCalApi } from "@calcom/embed-react";

function ICallEmbed() {
  React.useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "programeaza-t",
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
        elementOrSelector: "#my-cal-inline-thanks",
        calLink: "team/artima-business-lifestyle/programeaza-t",
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
      id="my-cal-inline-thanks"
      namespace="programeaza-t"
      calLink="team/artima-business-lifestyle/programeaza-t"
      // style={{ width: "100%", height: "100%", overflow: "scroll" }}
      calOrigin="https://cal-xy6mp-u17606.vm.elestio.app"
      embedJsUrl="https://cal-xy6mp-u17606.vm.elestio.app/embed/embed.js"
    />
  );
};

const Page = () => {

  return (
    <div className={styles.thanks}>
      <Header />
      <div>
        <h6 className={styles.thanks__title}>Mulțumim!</h6>
        <p className={styles.thanks__subtitle}>
          Solicitarea ta a fost înregistrată{" "}
          <br className="inline-block sm:hidden" />
          cu succes
          <br />
          <span className=" inline-block mt-[15rem] sm:mt-0">
            În cel mai scurt timp vei primi prezentarea PDF pe e-mail
          </span>
        </p>
        <img
          src="/sales/thanks/gmail-thanks.png"
          className="w-[183rem] h-[180rem] sm:w-[258rem] sm:h-[254rem] mx-auto mt-[20rem] sm:mt-[50rem]"
          alt="gmail thanks page ARTIMA Business & Lifestyles"
        />
      </div>
      <p className={styles.thanks__video_title}>
        Încă nu ai văzut video-ul cu
        <br className="inline-block sm:hidden" /> biroul de 978 m2,
        <br className="hidden sm:inline-block" /> {""}
        filmat
        <br className="inline-block sm:hidden" /> {""} special pentru acest
        spațiu?
      </p>
      <div className={styles.thanks__video}>
       <WistiaVideo />
      </div>
      <p className={styles.thanks__video_text}>
        Te invităm să programezi
        <br className="inline-block sm:hidden" /> {""}acum o vizită ca să {""}
        <br className="hidden sm:inline-block" />
        descoperi
        <br className="inline-block sm:hidden" />
        {""} biroul premium în realitate
      </p>
      <p className={styles.thanks__programming_title}>
        Programează vizita în calendar
      </p>
      <div className="pb-[130rem]">
        <ICallEmbed />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
