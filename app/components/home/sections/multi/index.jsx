"use client";
import React from "react";
import styles from "./multy.module.scss";
import GridLaptop from "./grid-laptop";
import GridMobile from "./grid-mobile";

const Page = ({ handlerItemToggle, businessCollection, isItemToggle }) => {
  return (
    <div className={styles.multi}>
      <div className={styles.multi_wrapper}>
        <p className={styles.multi_title}>
          <span className={styles.multi_text__yellow}>
            Un proiect multifuncțional {""}
          </span>
          <br className="inline-block sm:hidden" />
          de anvergură{" "}
          <span className={styles.multi_text}>
            <br className="hidden sm:inline-block" />
            ce include spații {/* <br className="inline-block" /> */}
            de birouri premium și {""}
            <br className="hidden sm:inline-block" />
            zone comerciale extinse
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

export default Page;
