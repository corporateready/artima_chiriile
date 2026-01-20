"use client";
import React from "react";
import styles from "../multy.module.scss";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";


const Page = ({ businessCollection, handlerItemToggle, isItemToggle }) => {
  const options = {
    loop: true,
    align: "start",
  };
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    isAutoScroll ? [AutoScroll({ speed: 1.2, stopOnInteraction: false })] : []
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    if (isItemToggle) {
      setIsAutoScroll(false);
    } else {
      setIsAutoScroll(true);
    }
  }, [emblaApi, isItemToggle]);

  return (
    <div className={`${styles.embla} mt-[30rem]`} ref={emblaRef}>
      <div className={`${styles.embla__container} flex gap-[18rem] py-[20rem]`}>
        {businessCollection &&
          businessCollection.map((slide) => (
            <div
              onClick={() => handlerItemToggle(slide.id)}
              key={slide.id}
              className={`${styles.multi_carousel__slide} ${styles.embla__slide}`}
            >
              {slide.slideIcon}
              <p className={styles.slide_title}>{slide.slideTitle}</p>
              <p className={styles.slide_text}>{slide.slideText}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
