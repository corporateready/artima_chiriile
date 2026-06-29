"use client";
import React from "react";
import "./form.scss";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  CUSTOM_COUNTRY_FORMATS,
  DEFAULT_LOCAL_MASK,
  getCountryMask,
  phoneCountries,
  normalizeLocalDigits,
  buildPhoneValue,
  maskToPlaceholder,
} from "../../../../../lib/lib-validate";

const Page = ({
  formSubmitTrack,
  nameValue,
  emailValue,
  phoneValue,
  setNameValue,
  setEmailValue,
  setPhoneValue,
  userLocation,
  isMobile,
}) => {
  const [selectedCountry, setSelectedCountry] = React.useState({
    iso2: "md",
    dialCode: "373",
    format: CUSTOM_COUNTRY_FORMATS.md,
  });

  const currentMask = getCountryMask(selectedCountry);
  const currentPlaceholder = maskToPlaceholder(currentMask);

  return (
    <form
      method="POST"
      action="https://eu.customerioforms.com/forms/submit_action?site_id=4367d44fa648e87be6fe&form_id=03855c6653bc4ec&success_url=https://artima.md/"
      id="_form_1_"
      className=""
      noValidate
      data-styles-version="4"
    >
      <div className="w-[352rem] sm:w-[454rem] mx-auto pb-[32rem] sm:pb-[50rem]">
        <input
          type="text"
          id="fullname"
          className="inline-flex h-[45rem] sm:h-[56rem] w-full rounded-[23rem] sm:rounded-[28rem] border-[1rem] border-[#c4c4c4] mt-[23rem] sm:mt-[44rem] placeholder:text-[#979794] text-[14rem] sm:text-[18rem] text-black placeholder:text-[14rem] placeholder:sm:text-[18rem] pl-[16rem] sm:pl-[20rem] focus-within:outline-none"
          name="fullname"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          placeholder={"Nume, Prenume"}
          required
        />
        <input
          type="email"
          id="email"
          className="inline-flex h-[45rem] sm:h-[56rem] w-full rounded-[23rem] sm:rounded-[28rem] border-[1rem] border-[#c4c4c4] mt-[18rem] sm:mt-[24rem] placeholder:text-[#979794] text-[14rem] sm:text-[18rem] text-black placeholder:text-[14rem] placeholder:sm:text-[18rem] pl-[16rem] sm:pl-[20rem] focus-within:outline-none"
          name="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
          placeholder="E-mail"
        />
        <div className="flex items-center border-[1rem] border-[#c4c4c4] rounded-full mt-[18rem] sm:mt-[24rem]">
          <PhoneInput
            countries={phoneCountries}
            inputProps={{
              id: "phone",
              name: "phone",
              autoComplete: "tel-national",
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            inputStyle={{
              borderRadius: "30px",
              padding: "0px",
            }}
            value={phoneValue}
            onChange={(value, meta) => {
              const country = meta.country;

              setSelectedCountry(country);

              const localDigits = normalizeLocalDigits(
                meta.inputValue,
                country,
              );

              setPhoneValue(buildPhoneValue(country, localDigits));
            }}
            required
            defaultCountry="md"
            placeholder={currentPlaceholder}
            defaultMask={DEFAULT_LOCAL_MASK}
            allowMaskOverflow={false}
            disableCountryGuess
            disableDialCodeAndPrefix
            showDisabledDialCodeAndPrefix
            inputClassName="bg-white text-[16rem] placeholder:text-[16rem] placeholder:text-[#7d7f80]"
            style={{
              "--react-international-phone-background-color": "none",
              "--react-international-phone-text-color": "#7D7F80",
              "--react-international-phone-border-color": "transparent",
              "--react-international-phone-width": "100%",
              "--react-international-phone-height": isMobile
                ? "44rem"
                : "56rem",
              "--react-international-phone-dropdown-item-background-color":
                "#FAF9F8",
              "--react-international-phone-dropdown-top": "40px",
              "--react-international-phone-font-size": "16px",
              "--react-international-phone-flag-width": "20rem",
              "--react-international-phone-country-selector-background-color":
                "#F2F2F2",
              "--react-international-phone-country-selector-arrow-size": "0px",
            }}
          />
        </div>
        <input type="hidden" name="language" value={"ro"} />

        <button
          id="_form_1_submit"
          className="inline-flex justify-center items-center text-[20rem] sm:text-[22rem] font-bold leading-[24rem] sm:leading-[31rem] text-white bg-[url('/sales/button_bg.png')] bg-cover bg-no-repeat mt-[26rem] sm:mt-[34rem] w-[354rem] sm:w-[454rem] h-[70rem] sm:h-[85rem] rounded-[48rem]"
          type="submit"
          onClick={() => {
            formSubmitTrack();
          }}
          disabled={
            nameValue.length < 3 ||
            !emailValue.includes(`@`) ||
            phoneValue.length > 11 ||
            phoneValue.length < 11
          }
        >
          ACCESEAZĂ ACUM
          <br />
          PREZENTAREA PDF
        </button>
      </div>
    </form>
  );
};

export default Page;
