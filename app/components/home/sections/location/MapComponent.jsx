"use client";

import React from "react";
import ClickToLoadMap from "../../../click-to-load-map";

function MapComponent() {


  return (
    <div className="w-full sm:w-[1300rem] h-[580rem] sm:h-[640rem] mx-auto relative mt-[40rem] sm:mt-[120rem]">
      <ClickToLoadMap
        src="https://www.google.com/maps/embed?iwloc=near&pb=!1m18!1m12!1m3!1d2719.076307789317!2d28.804286012113554!3d47.03873342689825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97ddacb33684b%3A0xdf913e55bc66e66b!2sArtima%20Business%20%26%20Lifestyle!5e0!3m2!1sru!2s!4v1744781412925!5m2!1sru!2s"
        externalHref="https://www.google.com/maps/search/?api=1&query=47.03873342689825%2C28.804286012113554"
        lang="ro"
      />
    </div>
  );
}

export default MapComponent;