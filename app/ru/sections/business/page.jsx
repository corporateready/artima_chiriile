"use client";
import React from "react";
import styles from "./business.module.scss";
import SliderLaptop from "./slider-laptop/page";
import SliderMobile from "./slider-mobile/page"

const Page = () => {
  return (
    <div className={styles.business}>
      <div className={styles.business_wrapper}>
        <p className={styles.business_title}>
          <span className={styles.business_text__yellow}>
            ARTIMA Business & Lifestyle{" "}
            <span className="hidden sm:inline-block">-</span> {""}
          </span>

          <span className={styles.business_text}>
            <br />
            деловой центр, предлагающий {""}
            <br className="hidden sm:inline-block" />
            новый {""}
            <br className="inline-block sm:hidden" />
            взгляд на мир бизнеса
          </span>
        </p>
        <div className={styles.slider__laptop_wrapper}>
          <SliderLaptop />
        </div>
        <div className={styles.slider__mobile_wrapper}>
          <SliderMobile />
        </div>
      </div>
    </div>
  );
};

export default Page;
