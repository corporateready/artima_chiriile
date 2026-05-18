"use client";
import Image from "next/image";
import styles from "./about.inner.module.scss";

const images = [
  "/avalon/Invest-propunere-investițională-1.webp",
  "/avalon/Invest-propunere-investițională-2.webp",
  "/avalon/Invest-propunere-investițională-3.webp",
  "/avalon/Invest-propunere-investițională-4.webp",
  "/avalon/Invest-propunere-investițională-5.webp",
  "/avalon/Invest-propunere-investițională-6.webp",
  "/avalon/Invest-propunere-investițională-7.webp",
  "/avalon/Invest-propunere-investițională-8.webp",
];

function AboutInner() {
  return (
    <div className={styles.about__inner_wrapper}>
      <div className={styles.about__inner_container}>
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            width={1200}
            height={800}
            priority
            className="w-full h-auto rounded-xl"
            alt={`Avalon presentation ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default AboutInner;
