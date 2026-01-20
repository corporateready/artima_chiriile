"use client";
import React from "react";
import styles from "./location.module.scss";
import Link from "next/link";

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
        <div className="w-full sm:w-[1300rem] h-[640rem] sm:h-[680rem] mx-auto relative mt-[40rem] sm:mt-[64rem]">
          <iframe
            src="https://www.google.com/maps/embed?iwloc=near&pb=!1m18!1m12!1m3!1d2719.076307789317!2d28.804286012113554!3d47.03873342689825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97ddacb33684b%3A0xdf913e55bc66e66b!2sArtima%20Business%20%26%20Lifestyle!5e0!3m2!1sru!2s!4v1744781412925!5m2!1sru!2s"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <div
            className="flex flex-col justify-between gap-0 absolute top-[9rem] left-[10rem] sm:left-[-1000rem] w-[270rem] h-[114rem] bg-white py-[30rem] pl-[20rem] rounded-[2rem] shadow-lg z-[1000]"
            style={{ pointerEvents: "auto" }}
          >
            <h3 className="font-semibold text-[22rem] leading-none">
              Artima Business & ...
            </h3>
            <Link
              href={
                "https://www.google.com/maps/place/Artima+Business+%26+Lifestyle/@47.03873,28.806866,17z/data=!4m6!3m5!1s0x40c97ddacb33684b:0xdf913e55bc66e66b!8m2!3d47.0387298!4d28.8068663!16s%2Fg%2F11vr1n8bmn?hl=ru&entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D"
              }
              className="text-[20rem] text-blue-500 leading-none"
            >
              Увеличить карту
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
