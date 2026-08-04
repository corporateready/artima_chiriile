import React from "react";
import LogoHeaderSVG from "../assets/logo-dark/page";
import styles from "./header.module.scss";
import TelIcon from "../assets/header-terms-tel-mobile/page"
import TrackedPhoneLink from "../tracked-phone-link";

type Props = {};

const Page = (props: Props) => {
  
  return (

    <div className={styles.header}>
      <div className={styles.container}>
      <div className={styles.header__wrapper}>
        <LogoHeaderSVG />
        <TrackedPhoneLink
          className={styles.header__phone_btn__mob}
          labelMode="children"
        >
          <TelIcon/>
        </TrackedPhoneLink>
        <TrackedPhoneLink className={styles.header__phone_btn} />
      </div>
      </div>
    </div>
  );
};

export default Page;
