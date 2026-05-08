"use client";
import React from "react";
import styles from "../multy.module.scss";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";



const Page = ({ businessCollection, handlerItemToggle, isItemToggle }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  const options = {
    loop: true,
    align: "start",
  };

 const [isAutoScroll, setIsAutoScroll] = React.useState(true);
 const [emblaRef, emblaApi] = useEmblaCarousel(
   options,
   isAutoScroll ? [AutoScroll({ speed: 1, stopOnInteraction: false })] : []
 );

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;

    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();

     if (isItemToggle) {
       setIsAutoScroll(false);
     } else {
       setIsAutoScroll(true);
     }

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect, isItemToggle]);

  // React.useEffect(() => {
  //    const slider = document.querySelector(
  //      ".multy_business_slider__eVKoF"
  //    );

  //    const autoScroll = emblaApi?.plugins()?.autoScroll;
  //    if (!autoScroll) return;

  //    slider.addEventListener("mouseover", () => {
  //      const playOrStop = autoScroll.isPlaying()
  //        ? autoScroll.stop
  //        : autoScroll.play;
  //      playOrStop();
  //    });

  //    slider.addEventListener("mouseout", () => {
  //      const playOrStop = autoScroll.isPlaying()
  //        ? autoScroll.stop
  //        : autoScroll.play;
  //      playOrStop();
  //    });
  // }, [emblaApi]);

  return (
    <div className={`${styles.business_slider}`} ref={ref}>
      {inView && (
        <motion.div className={styles.embla__viewport} ref={emblaRef}>
          <div
            className={`${styles.embla__container} flex gap-[18rem] pb-[10rem]`}
          >
            {businessCollection.flatMap((slide) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3, delay: slide.id * 0.2 },
                      }
                    : {}
                }
                exit={{ opacity: 0, y: 30 }}
                onClick={() => handlerItemToggle(slide.id)}
                key={slide.id}
                className={`${styles.multi_carousel__slide} ${styles.embla__slide}`}
              >
                {slide.slideIcon}
                <p className={styles.slide_title}>{slide.slideTitle}</p>
                <p className={styles.slide_text}>{slide.slideText}</p>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-[-90rem] left-[1160rem] flex gap-[24rem]">
            <button
              type="button"
              className={`flex w-[36rem] h-[36rem] rounded-full ${
                prevBtnDisabled ? "bg-[#ececee]" : "bg-[#dfdfe2]"
              } justify-center items-center rotate-180`}
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
            >
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00003 7.01724C8.00003 7.26877 7.90399 7.52026 7.71232 7.71203L1.67776 13.7465C1.29389 14.1304 0.671505 14.1304 0.287788 13.7465C-0.0959293 13.3628 -0.0959293 12.7405 0.287788 12.3566L5.6275 7.01724L0.287975 1.67781C-0.0957427 1.29394 -0.0957427 0.671744 0.287975 0.288058C0.671692 -0.0960007 1.29408 -0.0960007 1.67795 0.288058L7.7125 6.32246C7.90421 6.51432 8.00003 6.76581 8.00003 7.01724Z"
                  fill={prevBtnDisabled ? "#B8B8B9" : "#626263"}
                />
              </svg>
            </button>
            <button
              type="button"
              className={`flex w-[36rem] h-[36rem] rounded-full ${
                nextBtnDisabled ? "bg-[#ececee]" : "bg-[#dfdfe2]"
              } justify-center items-center`}
              onClick={scrollNext}
              disabled={nextBtnDisabled}
            >
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00003 7.01724C8.00003 7.26877 7.90399 7.52026 7.71232 7.71203L1.67776 13.7465C1.29389 14.1304 0.671505 14.1304 0.287788 13.7465C-0.0959293 13.3628 -0.0959293 12.7405 0.287788 12.3566L5.6275 7.01724L0.287975 1.67781C-0.0957427 1.29394 -0.0957427 0.671744 0.287975 0.288058C0.671692 -0.0960007 1.29408 -0.0960007 1.67795 0.288058L7.7125 6.32246C7.90421 6.51432 8.00003 6.76581 8.00003 7.01724Z"
                  fill={nextBtnDisabled ? "#B8B8B9" : "#626263"}
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
