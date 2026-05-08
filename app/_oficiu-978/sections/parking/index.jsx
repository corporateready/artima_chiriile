import React from "react";
import styles from "./parking.module.scss";

const Index = () => {
  return (
    <div className={styles.parking__wrapper}>
      <div className={styles.parking__inner}>
        <div className="w-1/2"></div>
        <div className={styles.parking__list}>
          <h6 className={styles.parking__title}>
            <span className={styles.parking__title_top}>
              Capacitatea locurilor de
            </span>{" "}
            {""}
            <br className="inline-block" />
            parcare fără precedent în țară
          </h6>

          <p className={styles.parking__text}>
            Parcare subterană cu acces direct {""}
            <br className="inline-block sm:hidden" /> în hol
          </p>
          <p className={styles.parking__text}>
            Securitate 24/7 cu operator care
            <br />
            monitorizează în timp real camerele din
            <br />
            parcarea subterană
          </p>
          <p className={styles.parking__text}>
            Locuri de parcare rezervate lunar sau
            <br />
            tarifate pe oră
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
