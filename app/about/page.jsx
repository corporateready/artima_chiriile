"use client";
import React from "react";
import Footer from "../oficiu-978/sections/footer/page";
import Header from "./header"
import AboutInner from "./about-inner"


const Page = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      {/* <Header /> */}
      <AboutInner />
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
