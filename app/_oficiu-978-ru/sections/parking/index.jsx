import React from "react";
import styles from "./parking.module.scss";

const Index = () => {
  return (
    <div className={styles.parking__wrapper}>
      <div className={styles.parking__inner}>
        <div className="w-0 sm:w-1/2"></div>
        <div className={styles.parking__list}>
          <h6 className={styles.parking__title}>
            <span className={styles.parking__title_top}>
              Беспрецедентное для страны
            </span>
            <br />
            количество парковочных мест
          </h6>
          <p className={styles.parking__text}>
            Подземная парковка c{""}
            <br className="inline-block sm:hidden" /> непосредственным {""}
            <br className="hidden sm:inline-block" /> доступом в вестибюль
          </p>
          <p className={styles.parking__text}>
            Круглосуточная безопасность автомобиля {""}
            <br className="hidden sm:inline-block" /> обеспечивается оператором, который в{""}
            <br className="hidden sm:inline-block" /> режиме реального {""}
            {/* <br className="inline-block sm:hidden" /> */}
            {""}
            времени наблюдает за {""}
            <br /> подземной парковкой с помощью камер
          </p>
          <p className={styles.parking__text}>
            Варианты оплаты парковочных {""}
            <br className="inline-block sm:hidden" />
            мест: {""}
            <br className="hidden sm:inline-block" /> месячный абонемент или {""}
            почасовая {""}
            <br className="hidden sm:inline-block" /> тарификация
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
