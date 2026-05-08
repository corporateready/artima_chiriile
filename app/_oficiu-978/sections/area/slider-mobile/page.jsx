"use client";
import React from "react";
import styles from "../area.module.scss";
import useEmblaCarousel from "embla-carousel-react";

const Page = () => {
  const areaMobileCollection = [
    {
      id: 1,
      slide: styles.area_mobile__slide_2,
    },
    {
      id: 2,
      slide: styles.area_mobile__slide_1,
    },
    {
      id: 3,
      slide: styles.area_mobile__slide_3,
    },
    {
      id: 4,
      slide: styles.area_mobile__slide_4,
    },
  ];
  const options = {
    
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

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

     if (nextBtnDisabled) {
       setTimeout(() => {
         return emblaApi.scrollTo(0);
       }, [3000]);
     }

     return () => emblaApi.off("select", onSelect);
   }, [emblaApi, onSelect, nextBtnDisabled]);

  return (
    <div
      className={`${styles.embla} ${styles.area_slider__mobile}`}
      ref={emblaRef}
    >
      <div className={`${styles.embla__container} flex gap-[18rem]`}>
        {areaMobileCollection.flatMap((slide) => (
          <div
            key={slide.id}
            className={`${slide.slide} ${styles.embla__slide}`}
          ></div>
        ))}
      </div>

      <div className="flex gap-[18rem] mt-[58rem] ml-[302rem]">
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
            nextBtnDisabled
              ? "bg-[#ececee]"
              : "bg-[#dfdfe2]"
          } justify-center items-center`}
          onClick={
            scrollNext
          }
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
              fill={
                nextBtnDisabled
                  ? "#B8B8B9"
                  : "#626263"
              }
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Page;
