"use client";
import Link from "next/link";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { useState } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 47.0105,
//   lng: 28.8638,
// };

// export default function MyMap() {
//   const [showInfo, setShowInfo] = useState(false);

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyDBwXJ1SBcSfzRlZOr0NTi5xSHhCobzHs4">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
//         <Marker position={center} onClick={() => setShowInfo(true)} />
//         {showInfo && (
//           <InfoWindow position={center} onCloseClick={() => setShowInfo(false)}>
//             <div style={{ padding: "10px", maxWidth: "200px" }}>
//               <h3>Заголовок</h3>
//               <p>Это кастомное окно с React стилями.</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// }
import React from "react";

function MapComponent() {

//  React.useEffect(() => {

  //  const infoWindow = document.querySelector("iframe").contentDocument.document;
  //  const infoTitle = document.querySelector(".place-card .place-card-large");
  //  console.log("info ", infoTitle)
  //  console.log("info window ", infoWindow)
  //  if (infoWindow) {
  //  console.log("info title", infoTitle); 
  //  } else {
  //   console.log("Title weren`t found!")
  //  }
//  }, [])

  return (
    <div className="w-full sm:w-[1300rem] h-[640rem] sm:h-[680rem] mx-auto relative mt-[40rem] sm:mt-[64rem]">
      <iframe
        src="https://www.google.com/maps/embed?iwloc=near&pb=!1m18!1m12!1m3!1d2719.076307789317!2d28.804286012113554!3d47.03873342689825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97ddacb33684b%3A0xdf913e55bc66e66b!2sArtima%20Business%20%26%20Lifestyle!5e0!3m2!1sru!2s!4v1744781412925!5m2!1sru!2s"
        width="100%"
        height="100%"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      {/* <div
        className="flex flex-col justify-between gap-0 absolute top-[9rem] left-[10rem] sm:left-[-1000rem] w-[270rem] h-[114rem] bg-white py-[30rem] pl-[20rem] rounded-[2rem] shadow-lg z-[1000]"
        style={{ pointerEvents: "auto" }}
      >
        <h3 className="font-semibold text-[22rem] leading-none">
          Artima Business & ...
        </h3>
        <Link
          href={
            "https://www.google.com/maps/place/Artima+Business+%26+Lifestyle/@47.03873,28.806866,17z/data=!4m6!3m5!1s0x40c97ddacb33684b:0xdf913e55bc66e66b!8m2!3d47.0387298!4d28.8068663!16s%2Fg%2F11vr1n8bmn?hl=ru&entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D"
          }
          className="text-[20rem] text-blue-500 leading-none"
        >
          Увеличить карту
        </Link>
      </div> */}
    </div>
  );
}

export default MapComponent;