"use client";
import React from "react";
import styles from "./about.module.scss";

const Page = ({ handleTogglePopup }) => {
  return (
    <div className={styles.about}>
      <div className={styles.about_wrapper}>
        <p className={styles.about_title}>
          De ce {""}
          <br className="inline-block sm:hidden" />
          <span className={styles.about_text__yellow}>acest birou {""}</span>
          <br className="hidden sm:inline-block" />
          <span className={styles.about_text}>
            este spațiul {""}
            <br className="inline-block sm:hidden" />
            ideal pentru afacerea ta?
          </span>
        </p>
        <div className={styles.about_slide__1}>
          <p className={styles.slide_description}>
            <span>reparație inclusă cadou</span> – începe{" "}
            <br className="inline-block sm:hidden" />
            activitatea
            <br className="hidden sm:inline-block" /> din prima zi fără grija
            renovării
          </p>
        </div>
        <div className={styles.about_slide__2}>
          <p className={styles.slide_description}>
            <span>finisaje de calitate</span> – fiecare detaliu este
            <br className="hidden sm:inline-block" /> realizat la standarde de
            top
          </p>
        </div>
        <div className={styles.about_slide__3}>
          <p className={styles.slide_description}>
            <span>design modern și original al holurilor,</span>{" "}
            <br className="inline-block sm:hidden" /> creat pentru a {""}
            <br className="hidden sm:inline-block" />
            reflecta standarde înalte de calitate și eleganță
          </p>
        </div>
        <div className={styles.about_slide__4}>
          <p className={styles.slide_description}>
            <span>blocuri sanitare spațioase,</span> cu cabine {""}
            <br className="inline-block sm:hidden" />
            bine izolate și obiecte {""}
            <br className="hidden sm:inline-block" />
            sanitare premium {""}
            <br className="inline-block sm:hidden" />
            de la producători italieni și germani
          </p>
        </div>
        <div className={styles.about_slide__5}>
          <p className={styles.slide_description}>
            <span>logo pe fațada clădirii </span> – expunere {""}
            <br className="inline-block sm:hidden" />
            strategică {""}
            <br className="hidden sm:inline-block" />
            pentru creșterea notorietății brandului
          </p>
        </div>
        <button
          type="button"
          className={styles.about_btn}
          onClick={handleTogglePopup}
        >
          Descarcă prezentarea pdf și
          <br />
          verifică disponibilitatea oficiilor
        </button>
      </div>
    </div>
  );
};

export default Page;
