"use client";
import React from "react";
import LogoHeaderSVG from "../assets/logo/page";
import styles from "./header.module.scss";
import TelIcon from "../assets/header-tel-mobile/page";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import TrackedPhoneLink from "../tracked-phone-link";

const Page = () => {
  const idGeneration = uuidv4();
  const [isCallingId, setIsCallingId] = React.useState("");


  const handlerCallingPhone = () => {
    
    setIsCallingId(idGeneration)

  }
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__wrapper}>
          <LogoHeaderSVG />
          <Link href={"/ru"} className={styles.select__lang}>
            RU
          </Link>
          <TrackedPhoneLink
            className={styles.header__phone_btn__mob}
            labelMode="hidden"
          />
          <TelIcon />
          <TrackedPhoneLink
            className={styles.header__phone_btn}
            id="header-phone-btn"
            onClick={handlerCallingPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
