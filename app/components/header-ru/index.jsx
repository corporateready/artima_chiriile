import React from "react";
import LogoHeaderSVG from "../assets/logo/page";
import styles from "./header.module.scss";
import TelIcon from "../assets/header-tel-mobile/page";
import Link from "next/link";
import TrackedPhoneLink from "../tracked-phone-link";

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
          <TrackedPhoneLink
            className={styles.header__phone_btn__mob}
            labelMode="hidden"
          />
          <TelIcon />
          <TrackedPhoneLink
            className={styles.header__phone_btn}
            id="header-phone-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
