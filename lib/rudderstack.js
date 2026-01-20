// import { Analytics } from "@rudderstack/analytics-js";

// const RUDDERSTACK_WRITE_KEY = "ВАШ_WRITE_KEY";
// const RUDDERSTACK_DATA_PLANE_URL = "ВАШ_DATA_PLANE_URL";

// export const analytics = new Analytics(
//   RUDDERSTACK_WRITE_KEY,
//   RUDDERSTACK_DATA_PLANE_URL,
//   {
//     logLevel: "DEBUG",
//     integrations: { All: true },
//   }
// );

// export function getUTMParams() {
//   if (typeof window === "undefined") return {};
//   const urlParams = new URLSearchParams(window.location.search);
//   return {
//     utm_source: urlParams.get("utm_source") || null,
//     utm_medium: urlParams.get("utm_medium") || null,
//     utm_campaign: urlParams.get("utm_campaign") || null,
//     utm_term: urlParams.get("utm_term") || null,
//     utm_content: urlParams.get("utm_content") || null,
//   };
// }

// analytics.load();
