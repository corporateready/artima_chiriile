"use client"
import React from "react"
import styles from "./multy.module.scss"
import GridLaptop from "./grid-laptop";
import GridMobile from "./grid-mobile";


const Index = ({ businessCollection, handlerItemToggle, isItemToggle }) => {
  return (
    <div className={styles.multi}>
      <div className={styles.multi_wrapper}>
        <p className={styles.multi_title}>
          <span className={styles.multi_text__yellow}>
            Масштабный многофункциональный проект, {""}
          </span>
          <span className={styles.multi_text}>
            <br className="hidden sm:inline-block" />
            включающий премиальные офисы и {""}
            <br className="hidden sm:inline-block" />
            обширные торговые зоны
          </span>
        </p>
        <div className={styles.multi_carousel__wrapper}>
          <GridLaptop />
          <GridMobile handlerItemToggle={handlerItemToggle} />
        </div>
      </div>
    </div>
  );
};

export default Index;