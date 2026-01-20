"use client";
import React, { Suspense } from "react";
import styles from "../../sale.module.scss";
import Link from "next/link";
import Logo from "../../../shared/logo";
import Script from "next/script";

type Props = {};

const Index = (props: Props) => {
  const [pathName, setPathName] = React.useState(false);

  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === "/booking") {
      setPathName(true);
    }
  }, [pathName]);
  return (
    <header className={styles.sale_header}>
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
      <div className={styles.sale_header__wrapper}>
        <div className={styles.sale_header__inner}>
          <Logo />
          <div className={styles.sale_header__navigate}>
            <Link
              href={"/oficiu-978-ru"}
              className={styles.header_navigate__lang}
            >
              ru
            </Link>
            <div className='relative top-0 left-0 bg-none'>
              
              <svg
                className="w-[29rem] h-[29rem] sm:hidden"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.2235 21.4912L23.6497 16.8954C22.6121 15.8462 20.927 15.8443 19.8866 16.8906L19.8818 16.8954L17.2611 19.5381C17.0628 19.7381 16.75 19.766 16.5201 19.6035C15.0858 18.5928 13.7431 17.4561 12.5081 16.2059C11.4018 15.0932 10.3843 13.894 9.464 12.6198C9.29711 12.3909 9.32191 12.0736 9.52122 11.8735L12.2067 9.16547C13.2434 8.11821 13.2434 6.42182 12.2067 5.37455L7.63298 0.762367C6.57918 -0.254122 4.91886 -0.254122 3.86506 0.762367L2.41645 2.22315C0.228747 4.40423 -0.552301 7.64314 0.398499 10.5936C1.10802 12.7525 2.11032 14.8009 3.37678 16.6829C4.51736 18.4072 5.82579 20.0132 7.28298 21.4749C8.86701 23.0838 10.6217 24.5119 12.5157 25.7341C14.5976 27.1036 16.8835 28.1287 19.2867 28.7702C19.9047 28.924 20.5389 29.001 21.175 29C23.356 28.9865 25.4426 28.1008 26.977 26.5381L28.2225 25.2822C29.2592 24.2349 29.2592 22.5385 28.2225 21.4912H28.2235ZM27.0715 24.1628C27.0715 24.1628 27.0695 24.1647 27.0686 24.1657L27.0762 24.1407L25.8307 25.3966C24.2315 27.0305 21.9007 27.7027 19.6863 27.169C17.4557 26.567 15.3338 25.6082 13.4036 24.3301C11.6097 23.1742 9.94847 21.823 8.4474 20.3007C7.0665 18.9188 5.82674 17.4012 4.74434 15.7712C3.56084 14.0171 2.62435 12.1063 1.96155 10.0925C1.20148 7.72681 1.8309 5.13221 3.58945 3.38774L5.03806 1.92695C5.44051 1.5192 6.09567 1.51728 6.50003 1.92407C6.50098 1.92503 6.50193 1.92599 6.50289 1.92695L11.0766 6.53914C11.481 6.94497 11.4829 7.60564 11.0795 8.01339L11.0766 8.01627L8.39114 10.7243C7.62058 11.4927 7.5233 12.714 8.16321 13.5969C9.13404 14.9413 10.2098 16.2059 11.378 17.3801C12.6807 18.6995 14.0969 19.8997 15.6094 20.9662C16.4839 21.5807 17.6693 21.4778 18.4246 20.72L21.0205 18.061C21.4229 17.6532 22.0771 17.6513 22.4824 18.0581L22.4853 18.061L27.0667 22.6895C27.471 23.0953 27.4729 23.755 27.0705 24.1628H27.0715Z"
                  fill="white"
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
      </div>
    </header>
  );
};
export default Index;
