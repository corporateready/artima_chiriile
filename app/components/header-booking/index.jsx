"use client";
import React, { Suspense } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "./logo";
import Script from "next/script";

const Index = () => {
  return (
    <header className={styles.booking_header}>
      <Script
        async
        id="roistat-script"
        dangerouslySetInnerHTML={{
          __html: `
              (function (w, d, s, h, id) {
              w.roistatProjectId = id;
              w.roistatHost = h;
              var p = d.location.protocol == "https:" ? "https://" : "http://";
              var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie)
                ? "/dist/module.js"
                : "/api/site/1.0/" +
                  id +
                  "/init?referrer=" +
                  encodeURIComponent(d.location.href);
              var js = d.createElement(s);
              js.charset = "UTF-8";
              js.async = 1;
              js.src = p + h + u;
              var js2 = d.getElementsByTagName(s)[0];
              js2.parentNode.insertBefore(js, js2);
              console.log("Roistat is work!")
            })(
              window,
              document,
              "script",
              "cloud.roistat.com",
              "e39442a8581e616d741b8f0786da960e"
            )
          `,
        }}
      />
      <div className={styles.booking_header__inner}>
        <Logo />

        <div className={styles.booking_header__navigate}>
          <Link href={"/booking-ru"} className={styles.header_navigate__lang}>
            ru
          </Link>
          <div className="relative top-0 left-0 bg-none">
            <svg
              className="w-[29rem] h-[29rem] sm:hidden absolute top-1/2 -translate-y-[50%] left-0"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.2235 21.466L23.6497 16.8756C22.6121 15.8276 20.927 15.8257 19.8866 16.8708L19.8818 16.8756L17.2611 19.5151C17.0628 19.7149 16.75 19.7428 16.5201 19.5804C15.0858 18.5709 13.7431 17.4355 12.5081 16.1868C11.4018 15.0755 10.3843 13.8777 9.464 12.605C9.29711 12.3764 9.32191 12.0594 9.52122 11.8596L12.2067 9.1547C13.2434 8.10867 13.2434 6.41427 12.2067 5.36824L7.63298 0.761471C6.57918 -0.253824 4.91886 -0.253824 3.86506 0.761471L2.41645 2.22054C0.228747 4.39905 -0.552301 7.63416 0.398499 10.5811C1.10802 12.7375 2.11032 14.7835 3.37678 16.6633C4.51736 18.3855 5.82579 19.9896 7.28298 21.4497C8.86701 23.0567 10.6217 24.4831 12.5157 25.7039C14.5976 27.0717 16.8835 28.0957 19.2867 28.7363C19.9047 28.89 20.5389 28.9669 21.175 28.9659C23.356 28.9525 25.4426 28.0678 26.977 26.5069L28.2225 25.2525C29.2592 24.2064 29.2592 22.512 28.2225 21.466H28.2235ZM27.0715 24.1344C27.0715 24.1344 27.0695 24.1363 27.0686 24.1373L27.0762 24.1123L25.8307 25.3668C24.2315 26.9987 21.9007 27.6701 19.6863 27.137C17.4557 26.5357 15.3338 25.5781 13.4036 24.3015C11.6097 23.1469 9.94847 21.7974 8.4474 20.2768C7.0665 18.8965 5.82674 17.3808 4.74434 15.7527C3.56084 14.0006 2.62435 12.092 1.96155 10.0807C1.20148 7.71773 1.8309 5.12618 3.58945 3.38375L5.03806 1.92469C5.44051 1.51742 6.09567 1.5155 6.50003 1.92181C6.50098 1.92277 6.50193 1.92373 6.50289 1.92469L11.0766 6.53146C11.481 6.93681 11.4829 7.5967 11.0795 8.00397L11.0766 8.00685L8.39114 10.7117C7.62058 11.4792 7.5233 12.6991 8.16321 13.5809C9.13404 14.9237 10.2098 16.1868 11.378 17.3597C12.6807 18.6775 14.0969 19.8763 15.6094 20.9415C16.4839 21.5553 17.6693 21.4525 18.4246 20.6956L21.0205 18.0397C21.4229 17.6325 22.0771 17.6305 22.4824 18.0368L22.4853 18.0397L27.0667 22.6628C27.471 23.0682 27.4729 23.7271 27.0705 24.1344H27.0715Z"
                fill="#333132"
              />
            </svg>
            <a
              href={"tel:"}
              className={styles.header_navigate__phone}
            >
              {/* +373 760 119 96 */}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Index;
