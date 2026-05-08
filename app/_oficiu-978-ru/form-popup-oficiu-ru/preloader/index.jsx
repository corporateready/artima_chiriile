"use client"
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

function Page({loading}) {
 

  return (
    <div className="sweet-loading">
        <PulseLoader 
        speedMultiplier={0.8}
        color="#ffffff"
        loading={loading}
        />
    </div>
  );
}

export default Page;