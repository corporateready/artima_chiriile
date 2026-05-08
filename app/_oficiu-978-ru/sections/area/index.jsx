"use client";
import React from "react";
import styles from "./area.module.scss";
import SliderLaptop from "./slider-laptop/page";
import SliderMobile from "./slider-mobile/page";

const Index = ( {handleTogglePopup }) => {
  return (
    <div className={styles.area}>
      <div className={styles.area_wrapper}>
        <p className={styles.area_title}>
          <span className={styles.area_text__yellow}>Зоны отдыха, {""}</span>
          расположенные
          <span className={styles.area_text}>
            <br className="hidden sm:inline-block" /> во дворе, идеальные для{" "}
            {""}
            <br className="hidden sm:inline-block" />
            нетворкинга и расслабления
          </span>
        </p>
        <SliderLaptop />
        <SliderMobile />
        <button
          type="button"
          className={styles.presentation_btn}
          onClick={handleTogglePopup}
        >
          Скачай PDF-презентацию и
          <br /> получи предложение по ценам
        </button>
      </div>
    </div>
  );
};

export default Index;
