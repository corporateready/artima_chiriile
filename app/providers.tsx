// "use client";
// import posthog from "posthog-js";
// import { PostHogProvider } from "posthog-js/react";

// // const getFBPCookie = () => {
// //   const fbpCookie = document.cookie
// //     .split("; ")
// //     .find((row) => row.startsWith("_fbp"));
// //   if (fbpCookie) {
// //     const value = fbpCookie.split("=")[1];
// //     const fbp = value;
// //     return fbp;
// //   }
// //   return null;
// // };

// if (typeof window !== "undefined") {
//   posthog.init("phc_v2HcUOBJx1tfJJpA37ipBy9lDvMwRPzrqxT3m4NetAP", {
//     api_host: "https://eu.i.posthog.com",
//     // debug: true,
//     // capture_pageview: false,
//     // autocapture: false, 
//     // before_send: (event) => {
//     //   return Math.random() < 0.5 ? event : null
//     // },
//     // loaded: (posthog) => {
//     //   posthog.register({ fbp: getFBPCookie() });
//     //   posthog.register({
//     //     pageview_event_id: localStorage.getItem("pageview_event_id"),
//     //   });
//     //   posthog.register({ external_id: localStorage.getItem("external_id") });
//     //   if (process.env.NODE_ENV === "development") posthog.debug();
//     // },
//   });
// }

// export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
//   return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
// }
