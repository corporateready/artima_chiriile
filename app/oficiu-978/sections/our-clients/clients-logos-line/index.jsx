"use client";

import React from "react";
import styles from "./clients.logo.module.scss"
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Page = ({ businessCollection }) => {
const { ref, inView } = useInView({
  threshold: 0.3,
});

  const options = {
    align: "start",
    loop: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ speed: 1, stopOnInteraction: false }),
  ]);

  return (
    <motion.div className={`${styles.embla} ${styles.slider}`} ref={ref}>
      <div className={`${styles.embla__viewport}`} ref={emblaRef}>
        <div className={`${styles.embla__container}`}>
          {inView && businessCollection.flatMap((slide) => (
            <motion.div
              key={slide.id}
              className={`${styles.carousel__slide} ${styles.embla__slide} last:mr-[60rem]`}
            >
              {slide.slideLogo}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
