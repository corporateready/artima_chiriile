"use client";
import React from "react";
import styles from "./area.module.scss";
import SliderLaptop from "./slider-laptop/page";
import SliderMobile from "./slider-mobile/page";

const Page = ({ handleTogglePopup }) => {
  return (
    <div className={styles.area}>
      <div className={styles.area_wrapper}>
        <p className={styles.area_title}>
          <span className={styles.area_text__yellow}>
            Zone de recreere {""}
          </span>
          în curtea
          <span className={styles.area_text}>
            <br /> exterioară, ideale pentru networking {""}
            <br className="hidden sm:inline-block" />
            și momente de relaxare
          </span>
        </p>
        <SliderLaptop />
        <SliderMobile />
        <button
          type="button"
          className={styles.presentation_btn}
          onClick={handleTogglePopup}
        >
          Descarcă prezentarea PDF
          <br /> și obține oferta de preț
        </button>
      </div>
    </div>
  );
};

export default Page;
