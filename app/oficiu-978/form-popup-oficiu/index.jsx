"use client";
import React from "react";
import styles from "./home.form.module.scss";
import LineProgress from "../../components/assets/progress-line/page";
import ACForm from "./form-ac";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Page = ({
  handleTogglePopup,
  formSubmitTrack,
  nameValue,
  emailValue,
  phoneValue,
  setNameValue,
  setEmailValue,
  setPhoneValue,
  userLocation,
}) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });
  const [isSend, setIsSend] = React.useState(false);
  const [isActiveLine, setIsActiveLine] = React.useState(50);
  const [isVisibleElement, setIsVisibleElement] = React.useState(false)

  React.useEffect(() => {
    const lineElement = document.querySelector(".line_line_body__DoCRI");

if (lineElement) {
  setIsVisibleElement(true)
}
  },[isVisibleElement])

  React.useEffect(() => {
    if (isSend) {
      setNameValue("");
      setEmailValue("");
      setPhoneValue("");
      handleTogglePopup();
    }
  }, [isSend]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { ease: "easeInOut", duration: 0.3 } }}
      exit={{ opacity: 0 }}
      className={styles.form__overview}
      onClick={() => handleTogglePopup()}
    >
      <div
        className={styles.form__wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.form__close_btn}
          onClick={(e) => {
            handleTogglePopup();
          }}
        >
          <svg
            className="hidden sm:inline-block w-[16rem] h-[16rem]"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.32191 14.1276C-0.106452 14.556 -0.106386 15.2504 0.322042 15.6788C0.75047 16.1071 1.44502 16.1071 1.87337 15.6787L8.00014 9.55129L14.1274 15.6781C14.5558 16.1064 15.2504 16.1064 15.6787 15.6781C16.1071 15.2498 16.1071 14.5552 15.6787 14.1269L9.55135 7.99998L15.6783 1.87242C16.1065 1.44402 16.1065 0.749525 15.6781 0.321206C15.2497 -0.107123 14.5551 -0.107058 14.1268 0.321338L7.99992 6.44878L1.87262 0.321864C1.44424 -0.106487 0.74968 -0.106487 0.321296 0.321864C-0.107099 0.750227 -0.107099 1.44472 0.321296 1.87309L6.44882 8.00009L0.32191 14.1276Z"
              fill="#8D8D8D"
            />
          </svg>
          <svg
            className="inline-block w-[24rem] h-[24rem] sm:hidden"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.482865 21.1913C-0.159678 21.834 -0.159579 22.8757 0.483063 23.5182C1.1257 24.1606 2.16753 24.1606 2.81005 23.518L12.0002 14.3269L21.1911 23.5172C21.8337 24.1597 22.8756 24.1597 23.5181 23.5172C24.1606 22.8747 24.1606 21.8329 23.5181 21.1904L14.327 12L23.5174 2.80863C24.1598 2.16603 24.1598 1.12429 23.5171 0.48181C22.8746 -0.160685 21.8327 -0.160587 21.1901 0.482007L11.9999 9.67317L2.80894 0.482797C2.16636 -0.159731 1.12452 -0.159731 0.481944 0.482797C-0.160648 1.12534 -0.160648 2.16709 0.481944 2.80963L9.67323 12.0001L0.482865 21.1913Z"
              fill="white"
            />
          </svg>
        </button>
        <motion.span
          initial={{
            left: `${isActiveLine - (isMobile ? 3 : 3)}%`,
            transition: { duration: 0.5 },
          }}
          transition={{ easings: "in-out", duration: 1 }}
          className={styles.form__progress_count__wrap}
        >
          {isVisibleElement && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeIn" }}
            >
              <svg
                width="100%"
                height="100%"
                className={styles.form__progress_count__bg}
                viewBox="0 0 57 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52.5265 0H4.36491C2.35622 0 0.730469 1.62577 0.730469 3.63446V27.5104C0.730469 29.5191 2.35622 31.1448 4.36491 31.1448H21.6168C22.994 31.1448 24.257 31.9241 24.8684 33.1602L27.4481 38.3331C27.8579 39.1595 29.0403 39.1595 29.4501 38.3331L32.0298 33.1602C32.6479 31.9241 33.9041 31.1448 35.2813 31.1448H52.5333C54.542 31.1448 56.1677 29.5191 56.1677 27.5104V3.63446C56.1677 1.62577 54.542 0 52.5333 0H52.5265Z"
                  fill="url(#paint0_linear_955_127)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_955_127"
                    x1="-13.8514"
                    y1="38.9529"
                    x2="30.7432"
                    y2="7.80758"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#916527" />
                    <stop offset="1" stopColor="#DAA22E" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.form__progress_count__number}>
                {isActiveLine}%
              </span>
            </motion.span>
          )}
        </motion.span>
        <div className={styles.form__progress}>
          <span className={styles.form__progress_line}>
            <LineProgress isActiveLine={isActiveLine} />
          </span>
        </div>
        <h6 className={styles.form__title}>
          Introdu datele tale de contact
          <br />
          pentru a primi prezentarea PDF
        </h6>
        <ACForm
          isMobile={isMobile}
          formSubmitTrack={formSubmitTrack}
          nameValue={nameValue}
          emailValue={emailValue}
          phoneValue={phoneValue}
          setNameValue={setNameValue}
          setEmailValue={setEmailValue}
          setPhoneValue={setPhoneValue}
          userLocation={userLocation}
        />
      </div>
    </motion.div>
  );
};

export default Page;
