"use client";
import React from "react";
import styles from "./about.module.scss";

export default function Index({ handleTogglePopup }) {
  return (
    <div className={styles.about}>
      <div className={styles.about_wrapper}>
        <p className={styles.about_title}>
          Почему {""}
          {/* <br className="inline-block sm:hidden" /> */}
          <span className={styles.about_text__yellow}>этот офис {""}</span>
          <br className="inline-block" />
          <span className={styles.about_text}>
            идеальное место для {""}
            <br className="inline-block sm:hidden" />
            твоего бизнеса?
          </span>
        </p>
        <div className={styles.about_slide__1}>
          <p className={styles.slide_description}>
            <span>ремонт в подарок</span> – начинай{" "}
            <br className="inline-block sm:hidden" />
            работу с первого дня
            <br className="hidden sm:inline-block" />и не думай о необходимости
            обновить интерьер
          </p>
        </div>
        <div className={styles.about_slide__2}>
          <p className={styles.slide_description}>
            <span>качественная отделка</span> – каждая {""}
            <br className="inline-block sm:hidden" />
            деталь {""}
            <br className="hidden sm:inline-block" />
            выполнена на высшем уровне
          </p>
        </div>
        <div className={styles.about_slide__3}>
          <p className={styles.slide_description}>
            <span>современный оригинальный дизайн вестибюлей,</span>{" "}
            <br className="hidden sm:inline-block" />
            отражающий высокие стандарты и элегантность
          </p>
        </div>
        <div className={styles.about_slide__4}>
          <p className={styles.slide_description}>
            <span>
              просторные санитарные блоки{" "}
              <br className="inline-block sm:hidden" />с хорошо {""}
            </span>{" "}
            <br className="hidden sm:inline-block" />
            изолированными кабинами и <br className="inline-block sm:hidden" />
            премиальной сантехникой {""}
            <br className="hidden sm:inline-block" />
            {""}
            от <br className="inline-block sm:hidden" />
            итальянских и немецких {""}
            <br className="inline-block sm:hidden" />
            производителей
          </p>
        </div>
        <div className={styles.about_slide__5}>
          <p className={styles.slide_description}>
            <span>логотип на фасаде здания -</span> стратегическое {""}
            <br className="hidden sm:inline-block" />
            размещение для увеличения узнаваемости бренда
          </p>
        </div>
        <button
          type="button"
          className={styles.about_btn}
          onClick={handleTogglePopup}
        >
          Скачай PDF-презентацию и
          <br /> узнай о доступности офиса
        </button>
      </div>
    </div>
  );
}
