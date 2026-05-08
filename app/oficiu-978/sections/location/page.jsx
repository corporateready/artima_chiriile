"use client";
import React from "react";
import styles from "./location.module.scss";
import Link from "next/link";
import MapComponent from "./MapComponent"
 
const Page = () => {
  
  return (
    <div className={styles.location}>
      <div className={styles.location_wrapper}>
        <p className={styles.location_title}>
          <span className={styles.location_text__yellow}>
            Amplasare stragetică {""}
          </span>

          <span className={styles.location_text}>
            <br className="inline-block sm:hidden" />
            cu potențial extins
          </span>
        </p>
      </div>
      <MapComponent />
    </div>
  );
};

export default Page;
