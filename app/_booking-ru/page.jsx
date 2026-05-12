"use client";
import React from "react";
import Footer from "../oficiu-978/sections/footer/page";
import Header from "../components/header-booking-ru"
import Cal, { getCalApi } from "@calcom/embed-react";

function ICallEmbed() {
  
  React.useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "программирование-визита",
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
          elementOrSelector: "#my-cal-inline-booking-ru",
          calLink: "team/artima-business-lifestyle/программирование-визита",
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
      id="my-cal-inline-booking-ru"
      namespace="программирование-визита"
      calLink="team/artima-business-lifestyle/программирование-визита"
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        paddingTop: "40rem",
        paddingBottom: "40rem",
      }}
      config={{ layout: "month_view" }}
      calOrigin="https://cal-xy6mp-u17606.vm.elestio.app"
      embedJsUrl="https://cal-xy6mp-u17606.vm.elestio.app/embed/embed.js"
    />
  );
};

const Page = () => {

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <Header />
      <ICallEmbed />
      <Footer />
    </div>
  );
};

export default Page;
