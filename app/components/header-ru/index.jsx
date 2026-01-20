import React from "react";
import LogoHeaderSVG from "../assets/logo/page";
import styles from "./header.module.scss";
import TelIcon from "../assets/header-tel-mobile/page";
import Link from "next/link";

const Page = () => {

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__wrapper}>
          <LogoHeaderSVG />
          <Link
            href={{
              pathname: "/",
            }}
            replace={true}
            prefetch={false}
            className={styles.select__lang}
          >
            RO
          </Link>
          <a
            href="tel:"
            className={styles.header__phone_btn__mob}
          ></a>
          <TelIcon />
          <Link
            href="tel:"
            // href="tel:+373776037107"
            className={styles.header__phone_btn}
            id="header-phone-btn"
          >
            {/* +373 760 119 96 */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
