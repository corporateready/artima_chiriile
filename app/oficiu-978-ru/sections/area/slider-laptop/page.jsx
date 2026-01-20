"use client";
import React from "react";
import styles from "../area.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Page = () => {
  const areaLaptopCollection = [
    {
      id: 1,
      slide: styles.area_present__slide_1,
    },
    {
      id: 2,
      slide: styles.area_present__slide_2,
    },
  ];
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

  }, [api]);

   React.useEffect(() => {
     const element = document.querySelector(".multy_business_slider__066q5");

     if (element) {
       const child = element.querySelector(
         ".multy_business_slider__066q5 > div > div"
       );

       if (child) {
         child.classList.remove("overflow-hidden");
       }
     }
   }, []);

  return (
    <div className={styles.area_slider__laptop}>
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 5000, jump: false })]}
        opts={
          {
            loop: true,
            duration: 50,
          }
        }
      >
        <CarouselContent className="flex gap-[10rem]">
          {areaLaptopCollection.flatMap((slide) => (
            <CarouselItem
              key={slide.id}
              className={`${slide.slide}`}
            ></CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Page;
