"use client";
import React from "react";
import styles from "./location.module.scss";

const Page = () => {

  return (
    <div className={styles.location}>
      <div className={styles.location_wrapper}>
        <p className={styles.location_title}>
          <span className={styles.location_text__yellow}>
            Стратегическое расположение {""}
          </span>

          <span className={styles.location_text}>
            <br className="" />с большим потенциалом
          </span>
        </p>
      </div>
      <div className={styles.location_map} id="map">
        <div className="w-full sm:w-[1300rem] h-[590rem] sm:h-[610rem] mx-auto relative mt-[60rem] sm:mt-[100rem] sm:px-[20rem]">
          <iframe
            src="https://www.google.com/maps/embed?iwloc=near&pb=!1m18!1m12!1m3!1d2719.076307789317!2d28.804286012113554!3d47.03873342689825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97ddacb33684b%3A0xdf913e55bc66e66b!2sArtima%20Business%20%26%20Lifestyle!5e0!3m2!1sru!2s!4v1744781412925!5m2!1sru!2s"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Page;
