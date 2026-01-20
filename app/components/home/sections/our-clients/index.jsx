import React from "react";
import styles from "./our.clients.module.scss"
import ClientsLogoLine from "./clients-logos-line"
import ClientsLogoLineMobile from "./clients-logos-line-mobile";
import { useMediaQuery } from "react-responsive";

const Index = ({ ourClientsLogosCollectionForMobile,businessCollection }) => {
    const isMobile = useMediaQuery({
      query: "(max-width: 600px)",
    });
  return (
    <div className="">
      <p className={styles.clients__title}>Clienții care ne aleg</p>
      {isMobile ? (
        <ClientsLogoLineMobile
          ourClientsLogosCollectionForMobile={
            ourClientsLogosCollectionForMobile
          }
        />
      ) : (
        <ClientsLogoLine businessCollection={businessCollection} />
      )}
    </div>
  );
};

export default Index;