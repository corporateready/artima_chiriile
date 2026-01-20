"use client";
import React from "react";
// import styles from "./home.page.module.scss";
// import Header from "../../components/header";
// import HomeForm from "../form-popup/page";

type Props = {};

const Page = (props: Props) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  // const handleTogglePopup = () => {
  //   setIsOpen(!isOpen);
  // };
 
  return (
    <>
      {/* <span className={styles.home__section__bg}></span>
      <div className={styles.home__section__bg_shadow}></div>
      <div className={styles.container}>
        <Header />
       <div className={styles.home__content}>
         <h1 className={styles.home__title}>
          Lansarea
          <br />
          ofertei de 
          <br className='block sm:hidden'/> chirie
        </h1>
        <h4 className={styles.home__subtitle}>
          în cea mai solicitată clădire de 
          <br className='block sm:hidden'/>oficii din Chișinău în 2023
        </h4>
        <button
          type="button"
          className={styles.home__PDF_btn}
          onClick={() => handleTogglePopup()}
        >
          descarcă prezentarea pdf
        </button>
       </div>
      </div>
      {isOpen && <HomeForm handleTogglePopup={handleTogglePopup}/>} */}
    </>
  );
};

export default Page;
